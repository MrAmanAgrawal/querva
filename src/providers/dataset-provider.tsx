"use client";

import { createContext, useContext, useState } from "react";

interface DatasetContextType {
  fileName: string;
  columns: string[];
  rowCount: number;
  previewData: any[];

  setDataset: (
    fileName: string,
    columns: string[],
    rowCount: number,
    previewData: any[]
  ) => void;
}

const DatasetContext = createContext<DatasetContextType | null>(null);

export function DatasetProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [fileName, setFileName] = useState("");
  const [columns, setColumns] = useState<string[]>([]);
  const [rowCount, setRowCount] = useState(0);
  const [previewData, setPreviewData] = useState<any[]>([]);

  const setDataset = (
    newFileName: string,
    newColumns: string[],
    newRowCount: number,
    newPreviewData: any[]
  ) => {
    setFileName(newFileName);
    setColumns(newColumns);
    setRowCount(newRowCount);
    setPreviewData(newPreviewData);
  };

  return (
    <DatasetContext.Provider
      value={{
        fileName,
        columns,
        rowCount,
        previewData,
        setDataset,
      }}
    >
      {children}
    </DatasetContext.Provider>
  );
}

export function useDataset() {
  const context = useContext(DatasetContext);

  if (!context) {
    throw new Error(
      "useDataset must be used inside DatasetProvider"
    );
  }

  return context;
}