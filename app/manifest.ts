import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Louvando ao Senhor",
    short_name: "Hinário",
    description: "Hinário digital Louvando ao Senhor",
    start_url: "/",
    display: "standalone",
    background_color: "#f3f4f6",
    theme_color: "#1e3a8a",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}