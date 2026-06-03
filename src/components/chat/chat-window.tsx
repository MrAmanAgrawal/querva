interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatWindowProps {
  messages: Message[];
}

import ChatMessage from "./chat-message";

export default function ChatWindow({
  messages,
}: ChatWindowProps) {
  return (
    <div className="mb-6">
      {messages.map((message, index) => (
        <ChatMessage
          key={index}
          role={message.role}
          content={message.content}
        />
      ))}
    </div>
  );
}