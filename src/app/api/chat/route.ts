import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function POST(request: Request) {
  try {
    const { message, history } = await request.json();

    const apiKey = process.env.GEMINI_API_KEY;
    const model = process.env.GEMINI_MODEL || "gemini-3.6-flash";

    if (!apiKey) {
      return NextResponse.json(
        { error: "Gemini API key is not configured inside .env" },
        { status: 500 }
      );
    }

    const systemPrompt = `You are the Havilah Cinematic Studio AI Assistant. You help users learn about Havilah:
1. Core Services: Cinematic Production, Creative Branding, Professional Education Academy, Immersive Events.
2. Projects Catalog: Indo Korean (Documentary), Real Estate (Commercial), Young Indians (Doc), Naveen Sharlien (Wedding Film), Srusti Pratik Haldi, Medtourin (Medical Spot), Popnosh (Hospitality Spot).
3. Creative Team: Praise (Creative Director), Vineeth (Lead Cinematographer), Reshma (Creative Strategist), Robinson J (Director & Master of Light/Motion - contact: robinson30122000@gmail.com).
4. Academy Programs: Cinematography Masterclass, Brand Narrative Strategy, Resolve Color Grading. We also offer 3-month Internship tracks.

Keep your tone premium, cinematic, helpful, and concise. Make references to files or pages if helpful (e.g. recommend booking pages /contact, /requests, or /appointments).`;

    // Map conversation history
    const contents = [];
    if (history && Array.isArray(history)) {
      for (const turn of history) {
        contents.push({
          role: turn.role === "user" ? "user" : "model",
          parts: [{ text: turn.text }],
        });
      }
    }
    contents.push({
      role: "user",
      parts: [{ text: message }],
    });

    const payload = {
      contents,
      systemInstruction: {
        parts: [{ text: systemPrompt }],
      },
    };

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      return NextResponse.json(
        { error: `Gemini API error: ${errText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text || "I apologize, I couldn't formulate a response. Please try again.";

    return NextResponse.json({ reply: replyText });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
