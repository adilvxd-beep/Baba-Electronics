export interface ProductData {
  id: string;
  name: string;
  slug: string;
  sku: string;
  hsnCode: string;
  category: string;
  subCategory?: string;
  shortDesc: string;
  description: string;
  mrp: number;
  sellingPrice: number;
  costPrice: number; // admin/internal only
  gstRate: number; // 18% standard
  stockQuantity: number;
  lowStockThreshold: number;
  sourceType: "MANUFACTURED" | "TRADED";
  isCustomBuild: boolean;
  requiresCustomFreight?: boolean;
  brand: string;
  unit: string;
  moq: number;
  warrantyMonths: number;
  countryOfOrigin: string;
  images: string[];
  datasheetUrl?: string;
  specs: {
    chip?: string;
    voltage?: string;
    interface?: string[];
    memory?: string;
    pins?: string;
    clockSpeed?: string;
    operatingTemp?: string;
    [key: string]: any;
  };
  quantityDiscounts: {
    minQuantity: number;
    discountedPrice: number;
  }[];
  variants?: {
    id: string;
    name: string;
    sku: string;
    slug: string;
    price: number;
    stock: number;
    attributes: Record<string, string>;
  }[];
  reviews: {
    id: string;
    userName: string;
    rating: number;
    headline: string;
    comment: string;
    verifiedBuyer: boolean;
    date: string;
  }[];
}

export const SAMPLE_PRODUCTS: ProductData[] = [
  {
    id: "prod-esp32-001",
    name: "ESP32-WROOM-32D Development Board (Dual-Core Wi-Fi + Bluetooth)",
    slug: "esp32-wroom-32d-dev-board-BE-ESP32-001",
    sku: "BE-ESP32-001",
    hsnCode: "85423100",
    category: "IoT & Dev Boards",
    subCategory: "ESP32 Boards",
    shortDesc: "High-performance dual-core IoT dev board with integrated 2.4GHz Wi-Fi, BLE, and CP2102 USB-to-UART bridge.",
    description: "The ESP32-WROOM-32D is Baba Electronics' flagship IoT microcontroller board designed for industrial automation, smart agriculture, and IoT makers. Features 38 GPIO pins, ultra-low power consumption, integrated hall sensors, and hardware encryption acceleration.",
    mrp: 499,
    sellingPrice: 389,
    costPrice: 260,
    gstRate: 18,
    stockQuantity: 450,
    lowStockThreshold: 30,
    sourceType: "MANUFACTURED",
    isCustomBuild: false,
    brand: "Baba Electronics",
    unit: "Piece",
    moq: 1,
    warrantyMonths: 6,
    countryOfOrigin: "India",
    images: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800&auto=format&fit=crop&q=80",
    ],
    datasheetUrl: "/datasheets/BE-ESP32-001-datasheet.pdf",
    specs: {
      chip: "ESP32-D0WDQ6",
      voltage: "3.3V (5V USB)",
      interface: ["Wi-Fi", "BLE", "UART", "SPI", "I2C", "PWM"],
      memory: "4MB Flash / 520KB SRAM",
      pins: "38 Pins",
      clockSpeed: "240 MHz",
      operatingTemp: "-40°C to +85°C",
    },
    quantityDiscounts: [
      { minQuantity: 10, discountedPrice: 349 },
      { minQuantity: 50, discountedPrice: 319 },
    ],
    variants: [
      {
        id: "var-esp32-4mb-soldered",
        name: "4MB Flash / Pre-Soldered Headers",
        sku: "BE-ESP32-001-4M-S",
        slug: "esp32-wroom-32d-4mb-soldered",
        price: 389,
        stock: 250,
        attributes: { Memory: "4MB", Headers: "Pre-Soldered" },
      },
      {
        id: "var-esp32-4mb-unsoldered",
        name: "4MB Flash / Loose Headers",
        sku: "BE-ESP32-001-4M-U",
        slug: "esp32-wroom-32d-4mb-unsoldered",
        price: 369,
        stock: 120,
        attributes: { Memory: "4MB", Headers: "Loose Headers" },
      },
      {
        id: "var-esp32-8mb-soldered",
        name: "8MB Flash / Pre-Soldered Headers",
        sku: "BE-ESP32-001-8M-S",
        slug: "esp32-wroom-32d-8mb-soldered",
        price: 439,
        stock: 80,
        attributes: { Memory: "8MB", Headers: "Pre-Soldered" },
      },
    ],
    reviews: [
      {
        id: "rev-1",
        userName: "Vikas Sharma (B2B Lead)",
        rating: 5,
        headline: "Rock solid stability on factory floor",
        comment: "Used in 50+ smart monitoring nodes across our Gujarat plant. CP2102 chip has zero flashing issues unlike cheap CH340 clones.",
        verifiedBuyer: true,
        date: "12 Oct 2026",
      },
      {
        id: "rev-2",
        userName: "Arjun Patil (Maker)",
        rating: 5,
        headline: "Best pricing for genuine ESP32",
        comment: "Fast shipping via Shiprocket within 48 hours to Pune. GST invoice generated immediately.",
        verifiedBuyer: true,
        date: "28 Oct 2026",
      },
    ],
  },
  {
    id: "prod-cust-lsb01",
    name: "Logo Sync Controller Board v2.1 (Bespoke Signage Firmware)",
    slug: "logo-sync-controller-board-v2-BE-CUST-LSB01",
    sku: "BE-CUST-LSB01",
    hsnCode: "85371000",
    category: "Custom Engineering",
    subCategory: "Logo Sync Boards",
    shortDesc: "Industrial grade synchronous multi-panel LED logo controller with RS485 and Wi-Fi sync.",
    description: "Designed and manufactured in-house by Baba Electronics for high-end retail storefronts and architectural signage. Features master-slave synchronization across multiple signage panels with zero visual flicker and remote smartphone configuration.",
    mrp: 3200,
    sellingPrice: 2650,
    costPrice: 1450,
    gstRate: 18,
    stockQuantity: 15,
    lowStockThreshold: 5,
    sourceType: "MANUFACTURED",
    isCustomBuild: true,
    brand: "Baba Electronics",
    unit: "Piece",
    moq: 1,
    warrantyMonths: 12,
    countryOfOrigin: "India",
    images: [
      "https://images.unsplash.com/photo-1608555895051-bf552f6ea60e?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80",
    ],
    datasheetUrl: "/datasheets/BE-CUST-LSB01-spec.pdf",
    specs: {
      chip: "STM32F401 + ESP32",
      voltage: "12V / 24V DC Industrial",
      interface: ["RS485 Isolated", "Wi-Fi AP/STA", "DMX512"],
      memory: "16MB SPI Flash",
      pins: "Screw Terminals",
      clockSpeed: "84 MHz",
      operatingTemp: "-20°C to +70°C",
    },
    quantityDiscounts: [
      { minQuantity: 5, discountedPrice: 2450 },
      { minQuantity: 20, discountedPrice: 2200 },
    ],
    reviews: [
      {
        id: "rev-3",
        userName: "Signage Dynamics Ltd",
        rating: 5,
        headline: "Flawless sync across 8 outdoor signs",
        comment: "Custom programmed by Baba Electronics team. 50% advance quote process was transparent and delivered 3 days ahead of lead time.",
        verifiedBuyer: true,
        date: "04 Nov 2026",
      },
    ],
  },
  {
    id: "prod-sen-dht22",
    name: "DHT22 / AM2302 Digital Temperature & Humidity Sensor Module",
    slug: "dht22-digital-temp-humidity-sensor-BE-SEN-DHT22",
    sku: "BE-SEN-DHT22",
    hsnCode: "90251990",
    category: "Sensors",
    subCategory: "Temperature & Environmental",
    shortDesc: "Capacitive humidity and thermistor sensor module with digital single-bus signal output.",
    description: "Standard industrial grade temperature and humidity sensor module with calibrated digital signal output. Suitable for HVAC, weather stations, home automation, and server room monitoring.",
    mrp: 350,
    sellingPrice: 249,
    costPrice: 165,
    gstRate: 18,
    stockQuantity: 320,
    lowStockThreshold: 20,
    sourceType: "TRADED",
    isCustomBuild: false,
    brand: "Aosong / Traded",
    unit: "Piece",
    moq: 1,
    warrantyMonths: 3,
    countryOfOrigin: "Imported / Certified",
    images: [
      "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800&auto=format&fit=crop&q=80",
    ],
    datasheetUrl: "/datasheets/BE-SEN-DHT22.pdf",
    specs: {
      voltage: "3.3V - 5.5V DC",
      interface: ["1-Wire Digital"],
      operatingTemp: "-40°C to +80°C (±0.5°C)",
      memory: "N/A",
      pins: "3 Pins (VCC, DATA, GND)",
    },
    quantityDiscounts: [
      { minQuantity: 10, discountedPrice: 219 },
      { minQuantity: 50, discountedPrice: 195 },
    ],
    reviews: [],
  },
  {
    id: "prod-billboard-p10",
    name: "P10 Outdoor Red LED Matrix Billboard Panel (32x16 Hub12)",
    slug: "p10-outdoor-led-billboard-panel-BE-BILL-P10R",
    sku: "BE-BILL-P10R",
    hsnCode: "85285900",
    category: "Custom Engineering",
    subCategory: "Commercial Billboards",
    shortDesc: "High-brightness outdoor LED display module for scrolling text and advertising billboards.",
    description: "Weather-resistant IP65 outdoor LED panel featuring 512 high-lumen red LEDs. Excluded from standard courier shipments due to bulk freight dimensions; ships via dedicated logistics.",
    mrp: 950,
    sellingPrice: 780,
    costPrice: 520,
    gstRate: 18,
    stockQuantity: 180,
    lowStockThreshold: 25,
    sourceType: "TRADED",
    isCustomBuild: false,
    requiresCustomFreight: true,
    brand: "Qiangli / Traded",
    unit: "Panel (32x16cm)",
    moq: 2,
    warrantyMonths: 6,
    countryOfOrigin: "Imported",
    images: [
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80",
    ],
    specs: {
      voltage: "5V DC @ 4A Max",
      interface: ["HUB12"],
      pins: "16-Pin Ribbon Cable",
      operatingTemp: "-20°C to +65°C",
    },
    quantityDiscounts: [
      { minQuantity: 10, discountedPrice: 720 },
      { minQuantity: 50, discountedPrice: 660 },
    ],
    reviews: [],
  },
  {
    id: "prod-ard-nano3",
    name: "Arduino Nano V3 Compatible Board (ATmega328P CH340 USB)",
    slug: "arduino-nano-v3-atmega328p-ch340-BE-ARD-NANO3",
    sku: "BE-ARD-NANO3",
    hsnCode: "85423100",
    category: "IoT & Dev Boards",
    subCategory: "Arduino Compatible",
    shortDesc: "Compact breadboard-friendly microcontroller with 14 digital I/O and 8 analog inputs.",
    description: "Classic maker workhorse powered by the ATmega328P with CH340 USB-to-Serial converter. Ideal for robotics, sensor acquisition, and student engineering projects.",
    mrp: 299,
    sellingPrice: 219,
    costPrice: 140,
    gstRate: 18,
    stockQuantity: 210,
    lowStockThreshold: 40,
    sourceType: "TRADED",
    isCustomBuild: false,
    brand: "Traded / QC Passed",
    unit: "Piece",
    moq: 1,
    warrantyMonths: 3,
    countryOfOrigin: "Imported",
    images: [
      "https://images.unsplash.com/photo-1553406830-ef2513450d76?w=800&auto=format&fit=crop&q=80",
    ],
    specs: {
      chip: "ATmega328P + CH340",
      voltage: "5V Operating / 7-12V Input",
      interface: ["UART", "SPI", "I2C"],
      memory: "32KB Flash / 2KB SRAM",
      pins: "30 Pins",
      clockSpeed: "16 MHz",
    },
    quantityDiscounts: [
      { minQuantity: 10, discountedPrice: 199 },
      { minQuantity: 50, discountedPrice: 179 },
    ],
    reviews: [],
  },
  {
    id: "prod-kit-37in1",
    name: "37-in-1 Sensor Starter Learning Kit for Arduino & ESP32",
    slug: "37-in-1-sensor-starter-kit-arduino-esp32-BE-KIT-37S",
    sku: "BE-KIT-37S",
    hsnCode: "90230000",
    category: "Starter Component Kits",
    subCategory: "Educational Kits",
    shortDesc: "Comprehensive sensor module suite with temperature, sound, infrared, flame, and touch modules.",
    description: "Curated learning kit featuring 37 essential modules with tutorial schematics. Stock is derived dynamically from constituent component inventory in Baba Electronics' workshop.",
    mrp: 1499,
    sellingPrice: 1199,
    costPrice: 780,
    gstRate: 18,
    stockQuantity: 65,
    lowStockThreshold: 10,
    sourceType: "MANUFACTURED",
    isCustomBuild: false,
    brand: "Baba Electronics",
    unit: "Kit Box",
    moq: 1,
    warrantyMonths: 6,
    countryOfOrigin: "India",
    images: [
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80",
    ],
    datasheetUrl: "/datasheets/BE-KIT-37S-guide.pdf",
    specs: {
      voltage: "3.3V - 5V Compatible",
      interface: ["Digital & Analog Mix"],
      operatingTemp: "Standard Lab",
    },
    quantityDiscounts: [
      { minQuantity: 5, discountedPrice: 1120 },
      { minQuantity: 20, discountedPrice: 1040 },
    ],
    reviews: [],
  },
];
