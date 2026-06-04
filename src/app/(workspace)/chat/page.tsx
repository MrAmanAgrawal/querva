"use client";

import { useState } from "react";
import { useDataset } from "@/providers/dataset-provider";

import WorkspaceLayout from "@/components/workspace/workspace-layout";
import ChatWindow from "@/components/chat/chat-window";
import ChatInput from "@/components/chat/chat-input";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isThinking, setIsThinking] = useState(false);

  const { fileName, rowCount } = useDataset();
  console.log("Chat Reading Dataset", {
  fileName,
  rowCount,
});

  const handleSendMessage = async (message: string) => {
    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: message,
      },
    ]);

    setIsThinking(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
        }),
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            data.reply || "No response received.",
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, something went wrong while contacting the AI.",
        },
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <WorkspaceLayout>
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-3xl font-bold text-white">
          New Analysis
        </h1>

        <p className="mb-4 text-green-400">
          Dataset: {fileName || "None"} ({rowCount} rows)
        </p>

        <ChatWindow messages={messages} />

        {isThinking && (
          <p className="mb-4 text-zinc-400">
            Querva is thinking...
          </p>
        )}

        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </WorkspaceLayout>
  );
}