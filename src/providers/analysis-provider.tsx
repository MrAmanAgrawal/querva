"use client";

import {
  createContext,
  useContext,
  useState,
} from "react";

interface AnalysisContextType {
  suggestedQuestion: string;

  setSuggestedQuestion: (
    question: string
  ) => void;

  clearSuggestedQuestion: () => void;
}

const AnalysisContext =
  createContext<AnalysisContextType | null>(
    null
  );

export function AnalysisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [
    suggestedQuestion,
    setSuggestedQuestionState,
  ] = useState("");

  const setSuggestedQuestion = (
    question: string
  ) => {
    setSuggestedQuestionState(question);
  };

  const clearSuggestedQuestion = () => {
    setSuggestedQuestionState("");
  };

  return (
    <AnalysisContext.Provider
      value={{
        suggestedQuestion,
        setSuggestedQuestion,
        clearSuggestedQuestion,
      }}
    >
      {children}
    </AnalysisContext.Provider>
  );
}

export function useAnalysis() {
  const context =
    useContext(AnalysisContext);

  if (!context) {
    throw new Error(
      "useAnalysis must be used inside AnalysisProvider"
    );
  }

  return context;
}