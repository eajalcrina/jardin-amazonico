import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Source images are at most ~2400px wide. Asking the optimizer to
    // upscale to 3840 caused intermittent timeouts in dev with sharp.
    // Cap deviceSizes at 2048 — covers all reasonable retina viewports
    // without forcing pointless upscale work.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 640],
  },
};

export default nextConfig;
