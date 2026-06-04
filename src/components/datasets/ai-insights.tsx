"use client";

import { useDataset } from "@/providers/dataset-provider";

export default function AIInsights() {
  const {
    fileName,
    rowCount,
    columns,
    previewData,
  } = useDataset();

  if (!fileName) {
    return null;
  }

  const hasRevenue =
    columns.some((c) =>
      c.toLowerCase().includes("revenue")
    );

  const hasBudget =
    columns.some((c) =>
      c.toLowerCase().includes("budget")
    );

  const hasRating =
    columns.some((c) =>
      c.toLowerCase().includes("rating")
    );

  return (
    <div className="rounded-xl border border-purple-900/30 bg-black/20 p-6">
      <h3 className="mb-4 text-lg font-semibold text-white">
        AI Generated Insights
      </h3>

      <div className="space-y-3 text-zinc-300">
        <p>
          🤖 Dataset <strong>{fileName}</strong> contains{" "}
          <strong>{rowCount}</strong> records.
        </p>

        <p>
          📊 Dataset includes{" "}
          <strong>{columns.length}</strong> columns.
        </p>

        <p>
          🔍 Preview analysis is based on the first{" "}
          <strong>{previewData.length}</strong> records.
        </p>

        {hasRevenue && (
          <p>
            💰 Revenue-related metrics detected.
          </p>
        )}

        {hasBudget && (
          <p>
            💵 Budget-related metrics detected.
          </p>
        )}

        {hasRating && (
          <p>
            ⭐ Rating-related metrics detected.
          </p>
        )}

        <p>
          🚀 Ready for trend, comparison and
          performance analysis.
        </p>
      </div>
    </div>
  );
}