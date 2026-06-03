"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

export default function ChatInput({
  onSendMessage,
}: ChatInputProps) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    onSendMessage(input);

    setInput("");
  };

  return (
    <div className="flex gap-3">
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask Querva anything..."
        className="h-12"
      />

      <Button onClick={handleSend}>
        Send
      </Button>
    </div>
  );
}