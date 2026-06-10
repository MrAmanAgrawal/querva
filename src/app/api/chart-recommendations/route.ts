import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
    try {
        const { columns, fileName } =
            await req.json();

        const completion =
            await openai.chat.completions.create({
                model: "gpt-4.1-mini",

                messages: [
                    {
                        role: "system",
                        content: `
You are a senior data analyst.

Analyze the dataset columns.

Return ONLY valid JSON.

Supported chart types:
- bar
- line
- scatter

Rules:
- Use only the provided columns.
- xColumn must exist.
- yColumn must exist.
- Do not use histograms.
- Do not use pie charts.
- Do not use box plots.
- Do not use aggregations such as COUNT, AVG, SUM.
- Recommend relationships directly available in the dataset.

Return format:

[
  {
    "title": "Revenue vs Budget",
    "chartType": "scatter",
    "xColumn": "budget",
    "yColumn": "revenue"
  }
]

Return only JSON.

`,
                    },

                    {
                        role: "user",
                        content: `
Dataset: ${fileName}

Columns:
${columns.join(", ")}
`,
                    },
                ],
            });

        const content =
            completion.choices[0]?.message
                ?.content;

        let recommendations = [];

        try {
            recommendations = JSON.parse(
                content || "[]"
            );
        } catch (parseError) {
            console.error(
                "JSON Parse Error:",
                parseError
            );

            recommendations = [];
        }

        return NextResponse.json({
            recommendations,
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                error:
                    "Failed to generate recommendations",
            },
            {
                status: 500,
            }
        );
    }
}