import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Havilah Pro",
  description: "Learn more about Havilah Pro's journey, our team, and our commitment to cinematic storytelling.",
  openGraph: {
    title: "About Us | Havilah Pro",
    description: "Learn more about Havilah Pro's journey, our team, and our commitment to cinematic storytelling.",
  }
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
