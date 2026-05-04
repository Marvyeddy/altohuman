import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import { NextResponse, type NextRequest } from "next/server";

const WORD_LIMIT = 300;
const MODEL = process.env.OPENAI_MODEL ?? "gpt-4o-mini";

type HumanizeAction = "humanize" | "score";

const prompts: Record<HumanizeAction, string> = {
  humanize:
    "Rewrite the user's text so it sounds natural, specific, and human-written while preserving the original meaning, facts, tone, and approximate length. Return only the rewritten text.",
  score:
    "Evaluate how likely the user's text is to read as AI-generated. Return a concise score from 0 to 100, then 2-3 short reasons and one practical improvement.",
};

const getWordCount = (text: string) =>
  text.trim() ? text.trim().split(/\s+/).length : 0;

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      text?: unknown;
      action?: unknown;
    };

    const text = typeof body.text === "string" ? body.text.trim() : "";
    const action = body.action === "score" ? "score" : "humanize";

    if (!text) {
      return NextResponse.json({ error: "Text is required." }, { status: 400 });
    }

    if (getWordCount(text) > WORD_LIMIT) {
      return NextResponse.json(
        { error: `Text must be ${WORD_LIMIT} words or fewer.` },
        { status: 400 },
      );
    }

    const result = await generateText({
      model: openai(MODEL),
      system: prompts[action],
      prompt: text,
      temperature: action === "humanize" ? 0.7 : 0.2,
    });

    return NextResponse.json({ text: result.text });
  } catch (error) {
    console.error("AI SDK request failed", error);

    return NextResponse.json(
      { error: "Could not process the text. Please try again." },
      { status: 500 },
    );
  }
}
