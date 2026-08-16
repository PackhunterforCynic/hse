import { NextResponse } from "next/server";
import { Resend } from "resend";
import AppointmentEmail from "@/emails/AppointmentEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, mobile, service, date, time, notes } = body;

    // Validate minimum required fields
    if (!name || !email || !service || !date || !time) {
      return NextResponse.json(
        { success: false, error: "Missing required booking details." },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      console.warn("RESEND_API_KEY is not set. Simulating success.");
      return NextResponse.json({ success: true, simulated: true });
    }

    // Send the email
    const data = await resend.emails.send({
      from: "Havilah Pro <onboarding@resend.dev>", // Replace with verified domain
      to: "praiseayodejiofficial@gmail.com", // Replace with your receiving email
      subject: `New Booking Request: ${service} - ${name}`,
      react: AppointmentEmail({
        name,
        email,
        mobile,
        service,
        date,
        time,
        notes,
      }),
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error sending appointment email:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send email." },
      { status: 500 }
    );
  }
}
