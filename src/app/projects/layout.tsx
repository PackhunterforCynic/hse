import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects & Portfolio | Havilah Pro",
  description: "Browse through Havilah Pro's portfolio of stunning cinematic productions, weddings, and commercial projects.",
  openGraph: {
    title: "Projects & Portfolio | Havilah Pro",
    description: "Browse through Havilah Pro's portfolio of stunning cinematic productions, weddings, and commercial projects.",
  }
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
