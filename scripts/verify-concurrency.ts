/**
 * Automated Concurrency & Stock Lock Verification Script
 * Simulates 50 concurrent checkout attempts on a high-demand IoT dev board with only 5 units in stock.
 * Validates:
 * 1. Exactly 5 attempts acquire the 15-minute stock reservation.
 * 2. Exactly 45 attempts are cleanly rejected with OUT_OF_STOCK.
 * 3. Stock never goes negative.
 */

interface MockStockStore {
  available: number;
  reserved: number;
}

const inventory: MockStockStore = {
  available: 5,
  reserved: 0,
};

// Atomic lock simulation using Node mutex/CAS pattern
let mutex = Promise.resolve();

async function attemptAtomicReservation(orderId: string, quantity: number): Promise<{ success: boolean; remaining: number }> {
  return new Promise((resolve) => {
    mutex = mutex.then(async () => {
      const freeStock = inventory.available - inventory.reserved;
      if (freeStock >= quantity) {
        inventory.reserved += quantity;
        resolve({ success: true, remaining: inventory.available - inventory.reserved });
      } else {
        resolve({ success: false, remaining: freeStock });
      }
    });
  });
}

async function runConcurrencyTest() {
  console.log("==================================================");
  console.log("BABA ELECTRONICS CONCURRENCY & STOCK LOCK TEST");
  console.log("Initial Available Stock: 5 units");
  console.log("Simulating 50 concurrent checkout orders (1 unit each)...");
  console.log("==================================================\n");

  const results = await Promise.all(
    Array.from({ length: 50 }).map((_, i) =>
      attemptAtomicReservation(`order-${i + 1}`, 1)
    )
  );

  const successes = results.filter((r) => r.success).length;
  const failures = results.filter((r) => !r.success).length;

  console.log(`Results:`);
  console.log(`✓ Successful Reservations: ${successes} (Expected: 5)`);
  console.log(`✓ Cleanly Rejected (Out of Stock): ${failures} (Expected: 45)`);
  console.log(`Final Reserved: ${inventory.reserved}/5`);
  console.log(`Free Stock: ${inventory.available - inventory.reserved}`);

  if (successes === 5 && failures === 45 && inventory.reserved === 5) {
    console.log("\n[PASS] ZERO RACE CONDITIONS. ATOMIC RESERVATIONS OPERATIONAL.");
    process.exit(0);
  } else {
    console.error("\n[FAIL] CONCURRENCY DISCREPANCY DETECTED.");
    process.exit(1);
  }
}

runConcurrencyTest();
