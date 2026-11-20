import { OG_SIZE, ogAlt, ogImage } from "@/components/og";

export const alt = ogAlt("en");
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage("en");
}
