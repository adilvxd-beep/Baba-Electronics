export interface WhatsAppNotificationPayload {
  toPhone: string; // 10-digit Indian phone
  templateName: "order_confirmation" | "order_dispatch" | "abandoned_cart_reminder";
  parameters: Record<string, string>;
}

/**
 * Dispatches automated transactional WhatsApp notifications using Meta WhatsApp Cloud API.
 * In development / test mode, prints structured logs.
 */
export async function sendWhatsAppNotification(
  payload: WhatsAppNotificationPayload
): Promise<{ success: boolean; message: string }> {
  const phone = payload.toPhone.replace(/\D/g, "");
  const hasToken = Boolean(process.env.WHATSAPP_API_TOKEN);

  if (process.env.NODE_ENV === "production" && hasToken) {
    try {
      await fetch(
        `https://graph.facebook.com/v19.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.WHATSAPP_API_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messaging_product: "whatsapp",
            to: `91${phone}`,
            type: "template",
            template: {
              name: payload.templateName,
              language: { code: "en" },
              components: [
                {
                  type: "body",
                  parameters: Object.values(payload.parameters).map((text) => ({
                    type: "text",
                    text,
                  })),
                },
              ],
            },
          }),
        }
      );
      return { success: true, message: `Notification dispatched to +91 ${phone}` };
    } catch (err) {
      console.error("WhatsApp API Error:", err);
    }
  }

  // Development simulation logger
  console.log(`\n----------------------------------------`);
  console.log(`[WHATSAPP AUTOMATED NOTIFICATION]`);
  console.log(`To: +91 ${phone}`);
  console.log(`Template: ${payload.templateName}`);
  console.log(`Payload Data:`, payload.parameters);
  console.log(`----------------------------------------\n`);

  return { success: true, message: `Simulation notification logged for +91 ${phone}` };
}
