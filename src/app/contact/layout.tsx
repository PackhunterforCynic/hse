import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Havilah Pro",
  description: "Get in touch with Havilah Pro for inquiries, bookings, and collaborations. Let's create something beautiful together.",
  openGraph: {
    title: "Contact Us | Havilah Pro",
    description: "Get in touch with Havilah Pro for inquiries, bookings, and collaborations. Let's create something beautiful together.",
  }
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
