import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery | Havilah Pro",
  description: "View behind-the-scenes photography, reels, and drone clips from our latest productions.",
  openGraph: {
    title: "Gallery | Havilah Pro",
    description: "View behind-the-scenes photography, reels, and drone clips from our latest productions.",
  }
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
