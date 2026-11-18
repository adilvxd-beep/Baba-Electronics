import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Baba Electronics - IoT Boards & Custom Signage",
    short_name: "Baba Electronics",
    description:
      "India's premier store for IoT development boards, sensors, and custom electronic billboards. Fast pan-India delivery & verified GST invoices.",
    start_url: "/",
    display: "standalone",
    background_color: "#0f172a",
    theme_color: "#2563eb",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
