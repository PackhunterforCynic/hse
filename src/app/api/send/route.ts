import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, service, message, subject } = body;

    const resendApiKey = process.env.RESEND_API_KEY;
    const contactEmail = process.env.CONTACT_EMAIL || "robinson30122000@gmail.com";
    const fromEmail = process.env.FROM_EMAIL || "onboarding@resend.dev";

    if (!resendApiKey) {
      return NextResponse.json(
        { error: "Resend API key is not configured inside .env" },
        { status: 500 }
      );
    }

    const htmlContent = `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #080808; color: #f8f5f0; padding: 40px; border-radius: 8px; border: 1px solid #333;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #c9a84c; font-size: 24px; text-transform: uppercase; letter-spacing: 2px; margin: 0;">Havilah Pro</h1>
          <p style="color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-top: 5px;">New Inquiry Received</p>
        </div>
        
        <div style="background-color: #111; padding: 25px; border-radius: 6px; border: 1px solid #222; margin-bottom: 25px;">
          <h2 style="font-size: 16px; border-bottom: 1px solid #333; padding-bottom: 10px; margin-top: 0; color: #c9a84c;">Client Details</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #888; width: 100px;">Name:</td>
              <td style="padding: 8px 0; font-weight: bold;">${name || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #888;">Email:</td>
              <td style="padding: 8px 0;">
                <a href="mailto:${email}" style="color: #c9a84c; text-decoration: none;">${email || 'N/A'}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #888;">Phone:</td>
              <td style="padding: 8px 0;">${phone || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #888;">Service:</td>
              <td style="padding: 8px 0;">${service || 'N/A'}</td>
            </tr>
          </table>
        </div>

        <div style="background-color: #111; padding: 25px; border-radius: 6px; border: 1px solid #222;">
          <h2 style="font-size: 16px; border-bottom: 1px solid #333; padding-bottom: 10px; margin-top: 0; color: #c9a84c;">Message</h2>
          <p style="line-height: 1.6; color: #ddd; white-space: pre-wrap; font-size: 14px; margin: 0;">${message || "No message provided."}</p>
        </div>
        
        <div style="text-align: center; margin-top: 40px; border-top: 1px solid #333; padding-top: 20px;">
          <p style="color: #555; font-size: 11px;">This is an automated message from your website contact form.</p>
        </div>
      </div>
    `;

    const emailPayload = {
      from: `Havilah Web <${fromEmail}>`,
      to: contactEmail,
      subject: subject || `New Inquiry: ${service || 'Contact'} from ${name}`,
      html: htmlContent,
    };

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify(emailPayload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `Resend API error: ${errorText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
