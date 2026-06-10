import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const {
      chartTitle,
      chartType,
      xColumn,
      yColumn,
      previewData,
    } = await req.json();

    const completion =
      await openai.chat.completions.create({
        model: "gpt-4.1-mini",

        messages: [
          {
            role: "system",
            content: `
You are a senior data analyst.

Analyze the chart metadata and sample dataset.

Return ONLY one short business insight.

Maximum 2 sentences.
`,
          },

          {
            role: "user",
            content: `
Chart Title: ${chartTitle}

Chart Type: ${chartType}

X Column: ${xColumn}

Y Column: ${yColumn}

Sample Data:
${JSON.stringify(previewData.slice(0, 10))}
`,
          },
        ],
      });

    return NextResponse.json({
      insight:
        completion.choices[0]?.message
          ?.content || "",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to generate insight",
      },
      {
        status: 500,
      }
    );
  }
}