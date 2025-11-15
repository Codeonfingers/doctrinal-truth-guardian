import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Send } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onFileUpload: (file: File) => void;
  disabled?: boolean;
}

export function ChatInput({ onSendMessage, onFileUpload, disabled }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileUpload(file);
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="bg-background w-full">
      <form onSubmit={handleSubmit} className="container mx-auto max-w-4xl p-3 md:p-4">
        <div className="flex gap-2 items-end">
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx,.txt,.epub"
            onChange={handleFileChange}
            className="hidden"
            disabled={disabled}
          />
          
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => fileInputRef.current?.click()}
            disabled={disabled}
            className="flex-shrink-0 h-10 w-10"
          >
            <Upload className="h-4 w-4" />
          </Button>

          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask about doctrinal concerns or upload a document..."
            className="min-h-[40px] md:min-h-[60px] max-h-[200px] resize-none flex-1"
            disabled={disabled}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />

          <Button
            type="submit"
            size="icon"
            disabled={!message.trim() || disabled}
            className="flex-shrink-0 h-10 w-10"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Press Enter to send, Shift + Enter for new line
        </p>
      </form>
    </div>
  );
}