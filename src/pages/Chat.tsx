import { useState, useEffect, useRef } from "react";
import { ChatSidebar } from "@/components/ChatSidebar";
import { ChatMessage, ChatMessageProps, AnalysisResult } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { ScrollArea } from "@/components/ui/scroll-area";
import { VerdictType } from "@/components/VerdictBadge";
import { Shield } from "lucide-react";

export default function Chat() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [messages, setMessages] = useState<ChatMessageProps[]>([
    {
      role: "assistant",
      content: "Welcome to DoctrineShield™ — The Autonomous Spiritual Intelligence Engine. I can analyze Christian materials for theological soundness, detect doctrinal deviations, and provide comprehensive integrity scores. Upload a document or ask me a question to get started.",
    },
  ]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  const handleNewChat = () => {
    setMessages([
      {
        role: "assistant",
        content: "Starting a new analysis session. How can I help you discern theological truth today?",
      },
    ]);
  };

  const handleSendMessage = (message: string) => {
    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: message }]);

    // Simulate assistant response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I understand your question. For the most accurate analysis, please upload a document or provide more context about the specific teaching you'd like me to evaluate.",
        },
      ]);
    }, 1000);
  };

  const handleFileUpload = (file: File) => {
    // Add user message about file upload
    setMessages((prev) => [
      ...prev,
      { role: "user", content: `Uploaded document: ${file.name}` },
    ]);

    // Show typing indicator
    setIsAnalyzing(true);
    setMessages((prev) => [...prev, { role: "assistant", isTyping: true }]);

    // Simulate analysis
    setTimeout(() => {
      // Remove typing indicator
      setMessages((prev) => prev.filter((msg) => !msg.isTyping));

      // Generate mock analysis result
      const mockScore = Math.floor(Math.random() * 40) + 60; // 60-100
      const verdict: VerdictType =
        mockScore >= 80 ? "safe" : mockScore >= 50 ? "caution" : "danger";

      const mockIssues =
        verdict === "safe"
          ? []
          : verdict === "caution"
          ? [
              {
                section: "Page 2, Paragraph 3",
                flag: "Prosperity emphasis",
                severity: "medium" as const,
                quote: "God wants you to be wealthy and successful in all your endeavors...",
              },
              {
                section: "Page 5, Paragraph 1",
                flag: "Scripture taken out of context",
                severity: "low" as const,
                quote: "Philippians 4:13 cited without proper context of contentment...",
              },
            ]
          : [
              {
                section: "Page 1, Paragraph 2",
                flag: "Denial of Christ's divinity",
                severity: "high" as const,
                quote: "Jesus was merely an enlightened teacher, not God incarnate...",
              },
              {
                section: "Page 3, Paragraph 4",
                flag: "Universalism teaching",
                severity: "high" as const,
                quote: "All paths lead to the same divine truth...",
              },
            ];

      const analysisResult: AnalysisResult = {
        score: mockScore,
        verdict,
        fileName: file.name,
        issues: mockIssues,
      };

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Analysis complete. Here are the results:",
          analysisResult,
        },
      ]);
      setIsAnalyzing(false);
    }, 3000);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <ChatSidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        onNewChat={handleNewChat}
      />

      <div className="flex-1 flex flex-col h-screen">
        {/* Header */}
        <header className="border-b bg-card px-4 py-3 flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          <h1 className="font-semibold">DoctrineShield™</h1>
          <span className="text-xs text-muted-foreground">Beta</span>
        </header>

        {/* Messages */}
        <ScrollArea ref={scrollAreaRef} className="flex-1">
          <div className="container mx-auto max-w-4xl py-8 px-4">
            {messages.map((message, index) => (
              <ChatMessage key={index} {...message} />
            ))}
          </div>
        </ScrollArea>

        {/* Input */}
        <ChatInput
          onSendMessage={handleSendMessage}
          onFileUpload={handleFileUpload}
          disabled={isAnalyzing}
        />
      </div>
    </div>
  );
}