import { NextResponse } from "next/server";
import { Resend } from "resend";
import ContactEmail from "@/emails/ContactEmail";

// Initialize Resend
// Note: You must add RESEND_API_KEY to your .env.local file
const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy");

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, service, subService, budget, message } = body;

    // Validate minimum required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      console.warn("RESEND_API_KEY is not set. Simulating success.");
      return NextResponse.json({ success: true, simulated: true });
    }

    // Send the email
    const data = await resend.emails.send({
      from: "Havilah Pro <onboarding@resend.dev>", // Replace with your verified domain
      to: "praiseayodejiofficial@gmail.com", // Replace with your receiving email
      subject: `New Havilah Inquiry: ${service} - ${name}`,
      react: ContactEmail({
        name,
        email,
        phone,
        service,
        subService,
        budget,
        message,
      }),
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error sending contact email:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send email." },
      { status: 500 }
    );
  }
}
