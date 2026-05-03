import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Jardín Amazónico — Plantas vivas, alma amazónica";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 80,
          background:
            "linear-gradient(135deg, #1B4332 0%, #40916C 60%, #C1440E 100%)",
          color: "#FBF9F5",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ fontSize: 24, opacity: 0.8, letterSpacing: 8 }}>
          JARDÍN AMAZÓNICO
        </div>
        <div style={{ fontSize: 80, lineHeight: 1.05, marginTop: 24 }}>
          Traemos un pedacito de selva a tu hogar.
        </div>
        <div style={{ fontSize: 28, opacity: 0.85, marginTop: 24 }}>
          Plantas vivas y artesanías amazónicas. Desde Lima.
        </div>
      </div>
    ),
    size,
  );
}
