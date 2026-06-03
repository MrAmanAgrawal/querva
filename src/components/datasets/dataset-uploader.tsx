"use client";

import { useState } from "react";
import Papa from "papaparse";
import { useDataset } from "@/providers/dataset-provider";

export default function DatasetUploader() {
  const [fileName, setFileName] = useState("");
  const [columns, setColumns] = useState<string[]>([]);
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [rowCount, setRowCount] = useState(0);

  const { setDataset } = useDataset();

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

        setRowCount(data.length);

        const extractedColumns =
          data.length > 0 ? Object.keys(data[0]) : [];

        setColumns(extractedColumns);

        const previewRows = data.slice(0, 5);

        setPreviewData(previewRows);

        // Save dataset globally
        setDataset(
          file.name,
          extractedColumns,
          data.length,
          previewRows
        );
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

      {columns.length > 0 && (
        <div className="mt-6 rounded-xl border border-purple-900/30 p-4">
          <h3 className="mb-4 text-lg font-semibold text-white">
            Dataset Summary
          </h3>

          <p className="text-zinc-300">
            Rows: {rowCount}
          </p>

          <p className="mb-4 text-zinc-300">
            Columns: {columns.length}
          </p>

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