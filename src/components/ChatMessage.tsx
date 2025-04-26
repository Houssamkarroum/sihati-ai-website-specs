
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
}

const ChatMessage = ({ message, isUser }: ChatMessageProps) => {
  return (
    <div className={cn(
      "message-bubble", 
      isUser ? "user-message mr-auto" : "bot-message ml-auto"
    )}>
      {message}
    </div>
  );
};

export default ChatMessage;
