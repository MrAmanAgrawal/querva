import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
    try {
        const {
            fileName,
            columns,
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

Analyze the dataset schema and sample data.

Return ONLY valid JSON.

Identify the 4 most important KPIs for this dataset.

Supported operations:
- sum
- avg
- count
- max
- min

Rules:
- Use only columns that exist in the dataset.
- Numeric columns should usually use sum, avg, max, or min.
- Categorical columns should usually use count.
- Return exactly 4 KPIs.

Format:

[
  {
    "title": "Total Revenue",
    "column": "revenue",
    "operation": "sum"
  },
  {
    "title": "Average Rating",
    "column": "imdb_rating",
    "operation": "avg"
  }
]

No markdown.
No explanations.
Only JSON.
`,
                    },
          

                {
                    role: "user",
                    content: `
Dataset: ${fileName}

Columns:
${columns.join(", ")}

Sample Data:
${JSON.stringify(
                        previewData.slice(0, 3)
                    )}
`,
                },
        ],
    });

    const content =
        completion.choices[0]?.message
            ?.content;

    let kpis = [];

    try {
        kpis = JSON.parse(
            content || "[]"
        );
    } catch {
        kpis = [];
    }

    return NextResponse.json({
        kpis,
    });
} catch (error) {
    console.error(error);

    return NextResponse.json(
        {
            error:
                "Failed to generate KPIs",
        },
        {
            status: 500,
        }
    );
}
}