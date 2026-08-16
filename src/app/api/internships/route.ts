import { NextResponse } from "next/server";
import { Resend } from "resend";
import InternshipEmail from "@/emails/InternshipEmail";

const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy");

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const track = formData.get("track") as string;
    const fieldOfStudy = formData.get("fieldOfStudy") as string;
    const experience = formData.get("experience") as string;
    const pitch = formData.get("pitch") as string;
    const portfolioUrl = formData.get("portfolioUrl") as string;
    const resumeFile = formData.get("resumeFile") as File | null;

    // Validate minimum required fields
    if (!fullName || !email || !track || !resumeFile) {
      return NextResponse.json(
        { success: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      console.warn("RESEND_API_KEY is not set. Simulating success.");
      return NextResponse.json({ success: true, simulated: true });
    }

    // Convert File to Buffer for Resend attachment
    const arrayBuffer = await resumeFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Send the email
    const data = await resend.emails.send({
      from: "Havilah Pro <onboarding@resend.dev>", // Replace with verified domain
      to: "praiseayodejiofficial@gmail.com", // Replace with your receiving email
      subject: `New Internship Application: ${track} - ${fullName}`,
      react: InternshipEmail({
        fullName,
        email,
        phone,
        track,
        fieldOfStudy,
        experience,
        pitch,
        portfolioUrl,
      }),
      attachments: [
        {
          filename: resumeFile.name || "resume.pdf",
          content: buffer,
        },
      ],
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error sending internship email:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send email." },
      { status: 500 }
    );
  }
}
