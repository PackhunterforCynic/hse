import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Internships | Havilah Pro",
  description: "Join the Havilah Pro team. Apply for our internship programs to learn and grow in the media industry.",
  openGraph: {
    title: "Internships | Havilah Pro",
    description: "Join the Havilah Pro team. Apply for our internship programs to learn and grow in the media industry.",
  }
};

export default function InternshipsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
