import { ImageResponse } from "next/og";

export const alt = "Objectif 100 % : la checklist pour finir GTA 6 à 100 %";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(135deg, #0d0b14 0%, #241431 60%, #3a1630 100%)",
          color: "#f3eefc",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 36, color: "#a39cb5" }}>Objectif 100 %</div>
        <div style={{ display: "flex", fontSize: 84, fontWeight: 800, marginTop: 24, lineHeight: 1.05 }}>
          Visez le&nbsp;
          <span style={{ color: "#ff6f6a" }}>100 %</span>
        </div>
        <div style={{ display: "flex", fontSize: 84, fontWeight: 800, lineHeight: 1.05 }}>dans GTA 6</div>
        <div style={{ display: "flex", fontSize: 34, color: "#a39cb5", marginTop: 32 }}>
          Missions · Objets à collectionner · Activités · Trophées
        </div>
        <div style={{ display: "flex", marginTop: 48, height: 18, width: 900, borderRadius: 9, background: "#17131f" }}>
          <div style={{ display: "flex", width: 610, borderRadius: 9, background: "linear-gradient(90deg, #ff8a3d, #ff4f8b)" }} />
        </div>
      </div>
    ),
    size,
  );
}
