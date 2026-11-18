// In-memory atomic stock reservation engine (Redis mock fallback)
interface ReservationEntry {
  orderId: string;
  items: { sku: string; quantity: number }[];
  expiresAt: number; // 15-minute TTL
  paymentRecoveryUntil: number; // 30-minute grace period
}

const activeReservations = new Map<string, ReservationEntry>();

export function createStockReservation(
  orderId: string,
  items: { sku: string; quantity: number }[]
): { success: boolean; expiresAt: number; remainingSeconds: number } {
  const now = Date.now();
  const ttlMs = 15 * 60 * 1000; // 15 minutes
  const recoveryTtlMs = 30 * 60 * 1000; // 30 minutes

  const expiresAt = now + ttlMs;
  const paymentRecoveryUntil = now + recoveryTtlMs;

  activeReservations.set(orderId, {
    orderId,
    items,
    expiresAt,
    paymentRecoveryUntil,
  });

  return {
    success: true,
    expiresAt,
    remainingSeconds: 900,
  };
}

export function getReservationStatus(orderId: string): {
  active: boolean;
  expired: boolean;
  remainingSeconds: number;
} {
  const record = activeReservations.get(orderId);
  if (!record) {
    return { active: false, expired: true, remainingSeconds: 0 };
  }

  const now = Date.now();
  if (now > record.expiresAt) {
    // Check if within 30-min recovery window
    if (now > record.paymentRecoveryUntil) {
      activeReservations.delete(orderId);
      return { active: false, expired: true, remainingSeconds: 0 };
    }
  }

  const remainingSeconds = Math.max(0, Math.ceil((record.expiresAt - now) / 1000));
  return {
    active: true,
    expired: remainingSeconds === 0,
    remainingSeconds,
  };
}

export function releaseStockReservation(orderId: string): boolean {
  return activeReservations.delete(orderId);
}
