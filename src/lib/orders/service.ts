export interface OrderLineItem {
  id: string;
  sku: string;
  name: string;
  quantity: number;
  unitPrice: number;
  gstRate: number;
  totalAmount: number;
  shippedQuantity: number;
}

export interface Consignment {
  id: string;
  awbCode: string;
  courierName: string;
  status: "MANIFESTED" | "DISPATCHED" | "IN_TRANSIT" | "OUT_FOR_DELIVERY" | "DELIVERED";
  labelUrl: string;
  trackingUrl: string;
  items: { sku: string; name: string; quantity: number }[];
  dispatchedAt: string;
}

export interface OrderRecord {
  id: string;
  orderNumber: string;
  orderDate: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  gstin?: string;
  businessName?: string;
  status: 
    | "PLACED" 
    | "CONFIRMED" 
    | "IN_PRODUCTION" 
    | "PACKED" 
    | "PARTIALLY_SHIPPED" 
    | "SHIPPED" 
    | "DELIVERED" 
    | "CANCELLED" 
    | "RETURNED";
  paymentStatus: "PENDING" | "PAID" | "REFUNDED";
  paymentMethod: string;
  subtotal: number;
  taxAmount: number;
  shippingAmount: number;
  grandTotal: number;
  items: OrderLineItem[];
  shipments: Consignment[];
  returnRequested?: boolean;
  returnReason?: string;
}

// Master in-memory Order Store representing Baba Electronics fulfillment hub
export const MASTER_ORDERS: OrderRecord[] = [
  {
    id: "ord-101",
    orderNumber: "BE-2026-27-000101",
    orderDate: "18 Nov 2026, 04:30 PM",
    customerName: "Rohan Kulkarni",
    customerPhone: "9823012345",
    customerEmail: "rohan.maker@gmail.com",
    shippingAddress: {
      street: "Flat 402, Shivajinagar",
      city: "Pune",
      state: "Maharashtra",
      pincode: "411005",
    },
    gstin: "27AAECK1234H1Z1",
    businessName: "Kulkarni Robotics",
    status: "CONFIRMED",
    paymentStatus: "PAID",
    paymentMethod: "Razorpay (UPI / GPay)",
    subtotal: 1540,
    taxAmount: 277.2,
    shippingAmount: 0,
    grandTotal: 1817.2,
    items: [
      {
        id: "item-1",
        sku: "BE-ESP32-001",
        name: "ESP32-WROOM-32D Development Board (Dual-Core)",
        quantity: 3,
        unitPrice: 389,
        gstRate: 18,
        totalAmount: 1167,
        shippedQuantity: 0,
      },
      {
        id: "item-2",
        sku: "BE-SEN-DHT22",
        name: "DHT22 Digital Temperature & Humidity Sensor",
        quantity: 2,
        unitPrice: 249,
        gstRate: 18,
        totalAmount: 498,
        shippedQuantity: 0,
      },
    ],
    shipments: [],
  },
  {
    id: "ord-102",
    orderNumber: "BE-2026-27-000102",
    orderDate: "17 Nov 2026, 11:15 AM",
    customerName: "Gujarat Embedded Systems",
    customerPhone: "9879555123",
    customerEmail: "procurement@gujaratec.in",
    shippingAddress: {
      street: "GIDC Industrial Estate, Phase 3",
      city: "Ahmedabad",
      state: "Gujarat",
      pincode: "382445",
    },
    gstin: "24AAACG9876K1ZP",
    businessName: "Gujarat Embedded Systems Pvt Ltd",
    status: "PARTIALLY_SHIPPED",
    paymentStatus: "PAID",
    paymentMethod: "Bank Transfer (NEFT/RTGS)",
    subtotal: 7850,
    taxAmount: 1413,
    shippingAmount: 0,
    grandTotal: 9263,
    items: [
      {
        id: "item-3",
        sku: "BE-ESP32-001",
        name: "ESP32-WROOM-32D Development Board",
        quantity: 20,
        unitPrice: 319, // bulk slab 50+ applied
        gstRate: 18,
        totalAmount: 6380,
        shippedQuantity: 20,
      },
      {
        id: "item-4",
        sku: "BE-CUST-LSB01",
        name: "Logo Sync Controller Board v2.1 (Custom)",
        quantity: 1,
        unitPrice: 2650,
        gstRate: 18,
        totalAmount: 2650,
        shippedQuantity: 0, // Still in production
      },
    ],
    shipments: [
      {
        id: "cns-01",
        awbCode: "AWB8849201948",
        courierName: "Delhivery Surface Express",
        status: "IN_TRANSIT",
        labelUrl: "/api/admin/shipping-label/AWB8849201948",
        trackingUrl: "https://shiprocket.co/tracking/AWB8849201948",
        items: [
          { sku: "BE-ESP32-001", name: "ESP32-WROOM-32D Dev Board", quantity: 20 },
        ],
        dispatchedAt: "18 Nov 2026, 10:00 AM",
      },
    ],
  },
  {
    id: "ord-103",
    orderNumber: "BE-2026-27-000103",
    orderDate: "15 Nov 2026, 02:40 PM",
    customerName: "Sunil Mehta",
    customerPhone: "9820011223",
    customerEmail: "sunil.mehta@techlabs.com",
    shippingAddress: {
      street: "Andheri East Corporate Park",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400069",
    },
    status: "DELIVERED",
    paymentStatus: "PAID",
    paymentMethod: "Razorpay (Credit Card)",
    subtotal: 1199,
    taxAmount: 215.82,
    shippingAmount: 0,
    grandTotal: 1414.82,
    items: [
      {
        id: "item-5",
        sku: "BE-KIT-37S",
        name: "37-in-1 Sensor Starter Learning Kit",
        quantity: 1,
        unitPrice: 1199,
        gstRate: 18,
        totalAmount: 1199,
        shippedQuantity: 1,
      },
    ],
    shipments: [
      {
        id: "cns-02",
        awbCode: "AWB9912003841",
        courierName: "Blue Dart Express",
        status: "DELIVERED",
        labelUrl: "/api/admin/shipping-label/AWB9912003841",
        trackingUrl: "https://shiprocket.co/tracking/AWB9912003841",
        items: [
          { sku: "BE-KIT-37S", name: "37-in-1 Sensor Starter Kit", quantity: 1 },
        ],
        dispatchedAt: "16 Nov 2026, 09:30 AM",
      },
    ],
  },
];

/**
 * Creates a partial or full shipment consignment for an order.
 */
export function dispatchOrderConsignment(
  orderNumber: string,
  consignmentItems: { sku: string; quantity: number }[],
  courierName: string = "Delhivery Air"
): { success: boolean; order?: OrderRecord; message: string } {
  const order = MASTER_ORDERS.find((o) => o.orderNumber === orderNumber);
  if (!order) {
    return { success: false, message: `Order ${orderNumber} not found.` };
  }

  const awbCode = `AWB${Math.floor(1000000000 + Math.random() * 9000000000)}`;
  const shipmentItems: { sku: string; name: string; quantity: number }[] = [];

  consignmentItems.forEach((ci) => {
    const orderItem = order.items.find((i) => i.sku === ci.sku);
    if (orderItem) {
      orderItem.shippedQuantity += ci.quantity;
      shipmentItems.push({
        sku: ci.sku,
        name: orderItem.name,
        quantity: ci.quantity,
      });
    }
  });

  const newConsignment: Consignment = {
    id: `cns-${Date.now()}`,
    awbCode,
    courierName,
    status: "MANIFESTED",
    labelUrl: `/api/admin/shipping-label/${awbCode}`,
    trackingUrl: `https://shiprocket.co/tracking/${awbCode}`,
    items: shipmentItems,
    dispatchedAt: new Date().toLocaleString("en-IN"),
  };

  order.shipments.push(newConsignment);

  // Derive new overall status
  const allShipped = order.items.every((i) => i.shippedQuantity >= i.quantity);
  const anyShipped = order.items.some((i) => i.shippedQuantity > 0);

  if (allShipped) {
    order.status = "SHIPPED";
  } else if (anyShipped) {
    order.status = "PARTIALLY_SHIPPED";
  }

  return {
    success: true,
    order,
    message: `Shipment booked with ${courierName}. AWB: ${awbCode}`,
  };
}

/**
 * Self-serve cancellation validation (Free until packed).
 */
export function cancelOrder(orderNumber: string): { success: boolean; message: string } {
  const order = MASTER_ORDERS.find((o) => o.orderNumber === orderNumber);
  if (!order) {
    return { success: false, message: "Order not found." };
  }

  if (order.status !== "PLACED" && order.status !== "CONFIRMED") {
    return {
      success: false,
      message: `Cancellation not permitted. Order is already in status '${order.status}'. Please contact customer care.`,
    };
  }

  order.status = "CANCELLED";
  return { success: true, message: "Order cancelled successfully. Refund initiated via Razorpay." };
}

/**
 * Submits a 7-day return claim.
 */
export function submitReturnRequest(
  orderNumber: string,
  reason: string
): { success: boolean; message: string } {
  const order = MASTER_ORDERS.find((o) => o.orderNumber === orderNumber);
  if (!order) {
    return { success: false, message: "Order not found." };
  }

  if (order.status !== "DELIVERED") {
    return { success: false, message: "Return can only be requested for delivered orders." };
  }

  order.returnRequested = true;
  order.returnReason = reason;
  return {
    success: true,
    message: "Return request submitted. Shiprocket reverse pickup will be booked within 24 hours.",
  };
}
