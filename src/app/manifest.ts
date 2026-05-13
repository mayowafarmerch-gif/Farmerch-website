import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name:             "Farmerch Global Limited",
    short_name:       "Farmerch",
    description:      "Professional Farm Mechanization at Scale",
    start_url:        "/",
    display:          "standalone",
    background_color: "#ffffff",
    theme_color:      "#059669",
    icons: [
      {
        src:   "/icon.svg",
        sizes: "any",
        type:  "image/svg+xml",
      },
    ],
  };
}
