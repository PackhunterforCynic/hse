import { NextResponse } from "next/server";
import { Resend } from "resend";
import AppointmentEmail from "@/emails/AppointmentEmail";
import { render } from "@react-email/components";

const resend = new Resend(process.env.RESEND_API_KEY as string);

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

    const html = await render(AppointmentEmail({
      name,
      email,
      mobile,
      service,
      date,
      time,
      notes,
    }));

    const data = await resend.emails.send({
      from: process.env.FROM_EMAIL as string,
      to: process.env.CONTACT_EMAIL as string,
      subject: `New Booking Request: ${service} - ${name}`,
      html: html,
    });

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error("Error sending appointment email:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send email.", details: error.message },
      { status: 500 }
    );
  }
}
