import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { message, dataset } = await req.json();

    const datasetContext = dataset
      ? `
Dataset Information

File Name: ${dataset.fileName}

Rows: ${dataset.rowCount}

Columns:
${dataset.columns?.join(", ")}

Sample Data:
${JSON.stringify(dataset.previewData, null, 2)}
`
      : "No dataset uploaded.";

    const completion =
      await openai.chat.completions.create({
        model: "gpt-4.1-mini",

        messages: [
          {
            role: "system",
            content: `
You are Querva, an AI Data Analyst.

Your job is to help users analyze uploaded datasets.

Always use the dataset information provided when answering.

If a user asks about columns, rows, trends, patterns, or summaries,
base your answer on the uploaded dataset rather than general knowledge.

Dataset Context:

${datasetContext}
`,
          },

          {
            role: "user",
            content: message,
          },
        ],
      });

    const reply =
      completion.choices[0]?.message?.content ||
      "No response generated.";

    return NextResponse.json({
      reply,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to generate response",
      },
      {
        status: 500,
      }
    );
  }
}