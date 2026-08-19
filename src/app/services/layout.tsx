import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services | Havilah Pro",
  description: "Explore our premium photography, videography, and digital marketing services at Havilah Pro.",
  openGraph: {
    title: "Our Services | Havilah Pro",
    description: "Explore our premium photography, videography, and digital marketing services at Havilah Pro.",
  }
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
