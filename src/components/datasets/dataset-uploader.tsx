"use client";

import { useState } from "react";
import Papa from "papaparse";
import { useDataset } from "@/providers/dataset-provider";
import { useRouter } from "next/navigation";
import { useAnalysis } from "@/providers/analysis-provider";

export default function DatasetUploader() {
  const [fileName, setFileName] = useState("");
  const [columns, setColumns] = useState<string[]>([]);
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [rowCount, setRowCount] = useState(0);

  const { setDataset } = useDataset();
  const router = useRouter();

  const { setSuggestedQuestion } =
  useAnalysis();

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setFileName(file.name);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,

      complete: (results) => {
        const data = results.data as any[];

        const extractedColumns =
          data.length > 0 ? Object.keys(data[0]) : [];

        const previewRows = data.slice(0, 5);

        setRowCount(data.length);
        setColumns(extractedColumns);
        setPreviewData(previewRows);

        setDataset(
          file.name,
          extractedColumns,
          data.length,
          previewRows
        );
      },

      error: (error) => {
        console.error("CSV Parse Error:", error);
      },
    });
  };

  return (
    <div className="rounded-2xl border border-purple-900/30 bg-black/20 p-8">
      <h2 className="mb-2 text-xl font-semibold text-white">
        Upload Dataset
      </h2>

      <p className="mb-4 text-zinc-400">
        CSV and Excel files supported.
      </p>

      <input
        type="file"
        accept=".csv,.xlsx,.xls"
        onChange={handleFileChange}
        className="text-white"
      />

      {fileName && (
        <div className="mt-6 rounded-xl border border-green-500/30 bg-green-500/10 p-4">
          <p className="text-green-400">
            ✓ {fileName}
          </p>
        </div>
      )}

      {/* Stats Cards */}
      {fileName && (
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-purple-900/30 bg-black/20 p-6">
            <p className="text-sm text-zinc-400">
              Dataset
            </p>

            <h3 className="mt-2 text-xl font-bold text-white break-all">
              {fileName}
            </h3>
          </div>

          <div className="rounded-xl border border-purple-900/30 bg-black/20 p-6">
            <p className="text-sm text-zinc-400">
              Rows
            </p>

            <h3 className="mt-2 text-3xl font-bold text-white">
              {rowCount}
            </h3>
          </div>

          <div className="rounded-xl border border-purple-900/30 bg-black/20 p-6">
            <p className="text-sm text-zinc-400">
              Columns
            </p>

            <h3 className="mt-2 text-3xl font-bold text-white">
              {columns.length}
            </h3>
          </div>
        </div>
      )}

      {/* AI Insights */}
      {fileName && (
        <div className="mt-6 rounded-xl border border-purple-900/30 bg-black/20 p-6">
          <h3 className="mb-4 text-lg font-semibold text-white">
            AI Insights
          </h3>

          <div className="space-y-3 text-zinc-300">
            <p>
              • Dataset contains {rowCount} records.
            </p>

            <p>
              • {columns.length} columns available for analysis.
            </p>

            <p>
              • Ready for trend, comparison and summary analysis.
            </p>

            <p>
              • AI can answer questions using uploaded data.
            </p>
          </div>
        </div>
      )}

      {/* Suggested Questions */}
      {fileName && (
        <div className="mt-6 rounded-xl border border-purple-900/30 bg-black/20 p-6">
          <h3 className="mb-4 text-lg font-semibold text-white">
            Suggested Questions
          </h3>

          <div className="flex flex-wrap gap-3">
            {[
              "Summarize this dataset",
              "Find key insights",
              "Identify trends",
              "Show unusual patterns",
              "Compare categories",
              "What should I investigate?",
            ].map((question) => (
              <button
                key={question}
                onClick={() => {
                  setSuggestedQuestion(question);
                  router.push("/chat");
                }}
                className="rounded-lg bg-purple-600 px-3 py-2 text-sm text-white transition hover:bg-purple-700"
>
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Dataset Summary */}
      {columns.length > 0 && (
        <div className="mt-6 rounded-xl border border-purple-900/30 p-4">
          <h3 className="mb-4 text-lg font-semibold text-white">
            Dataset Columns
          </h3>

          <div className="flex flex-wrap gap-2">
            {columns.map((column) => (
              <span
                key={column}
                className="rounded-lg bg-purple-600/20 px-3 py-1 text-sm text-purple-300"
              >
                {column}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Preview Table */}
      {previewData.length > 0 && (
        <div className="mt-6 overflow-x-auto rounded-xl border border-purple-900/30">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-purple-900/30">
                {columns.map((column) => (
                  <th
                    key={column}
                    className="p-3 text-white"
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {previewData.map((row, index) => (
                <tr
                  key={index}
                  className="border-b border-purple-900/10"
                >
                  {columns.map((column) => (
                    <td
                      key={column}
                      className="p-3 text-zinc-300"
                    >
                      {String(row[column] ?? "")}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}