import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy");

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, error: "Email is required." },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      console.warn("RESEND_API_KEY is not set. Simulating success for newsletter subscription.");
      return NextResponse.json({ success: true, simulated: true });
    }

    // Send the email
    const data = await resend.emails.send({
      from: "Havilah Pro <onboarding@resend.dev>", // Replace with verified domain
      to: "praiseayodejiofficial@gmail.com", // Replace with your receiving email
      subject: `New Newsletter Subscription: ${email}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>New Newsletter Subscriber!</h2>
          <p>You have a new subscriber to the Havilah Pro newsletter.</p>
          <p><strong>Email:</strong> ${email}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error processing newsletter subscription:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process subscription." },
      { status: 500 }
    );
  }
}
