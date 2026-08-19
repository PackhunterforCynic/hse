import { NextResponse } from "next/server";
import { Resend } from "resend";
import ContactEmail from "@/emails/ContactEmail";
import { render } from "@react-email/components";

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
    const html = await render(ContactEmail({
      name,
      email,
      phone,
      service,
      subService,
      budget,
      message,
    }));

    const resendApiKey = process.env.RESEND_API_KEY as string;
    const emailPayload = {
      from: process.env.FROM_EMAIL as string,
      to: process.env.CONTACT_EMAIL as string,
      subject: `New Havilah Inquiry: ${service} - ${name}`,
      html: html,
    };

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify(emailPayload),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Resend fetch error text:", errorText);
      throw new Error(`Resend API error (${res.status}): ${errorText}`);
    }

    const response = await res.json();
    console.log("Resend response:", response);

    return NextResponse.json({ success: true, data: response });
  } catch (error: any) {
    console.error("Error sending contact email:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send email.", details: error.message },
      { status: 500 }
    );
  }
}
