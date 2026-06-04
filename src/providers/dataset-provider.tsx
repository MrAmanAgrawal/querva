"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

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

const DatasetContext =
  createContext<DatasetContextType | null>(null);

export function DatasetProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [fileName, setFileName] = useState("");
  const [columns, setColumns] = useState<string[]>([]);
  const [rowCount, setRowCount] = useState(0);
  const [previewData, setPreviewData] = useState<any[]>([]);

  useEffect(() => {
    const savedDataset =
      localStorage.getItem("querva_dataset");

    if (savedDataset) {
      const dataset = JSON.parse(savedDataset);

      setFileName(dataset.fileName);
      setColumns(dataset.columns);
      setRowCount(dataset.rowCount);
      setPreviewData(dataset.previewData);
    }
  }, []);

  const setDataset = (
    newFileName: string,
    newColumns: string[],
    newRowCount: number,
    newPreviewData: any[]
  ) => {
    const dataset = {
      fileName: newFileName,
      columns: newColumns,
      rowCount: newRowCount,
      previewData: newPreviewData,
    };

    localStorage.setItem(
      "querva_dataset",
      JSON.stringify(dataset)
    );

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