import { useState, useEffect, useRef } from "react";
import { Layout } from "@/components/Layout";
import { ChatMessage, ChatMessageProps, AnalysisResult } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { ScrollArea } from "@/components/ui/scroll-area";
import { VerdictType } from "@/components/VerdictBadge";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Chat() {
  const navigate = useNavigate();
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
              {
                section: "Page 6, Paragraph 1",
                flag: "Salvation through works",
                severity: "high" as const,
                quote: "Through your good deeds and moral living, you can earn your way to heaven...",
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
    <Layout title="Analyzer" hideFooter>
      <div className="flex flex-col h-full">
        {/* Top Action Bar */}
        <div className="border-b border-border bg-card px-4 sm:px-6 py-3">
          <div className="flex justify-between items-center max-w-5xl mx-auto">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/dashboard")}
              className="gap-2 hover:bg-accent"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back to Dashboard</span>
              <span className="sm:hidden">Back</span>
            </Button>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="hidden sm:flex hover:bg-accent"
              >
                Download Report
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="hidden sm:flex hover:bg-accent"
              >
                Share Result
              </Button>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <ScrollArea ref={scrollAreaRef} className="flex-1">
          <div className="container mx-auto max-w-4xl py-6 px-4 space-y-6">
            {messages.map((message, index) => (
              <div key={index} className="animate-fade-in">
                <ChatMessage {...message} />
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Input Area - Fixed at bottom */}
        <div className="border-t border-border bg-card sticky bottom-0">
          <div className="container mx-auto max-w-4xl">
            <ChatInput
              onSendMessage={handleSendMessage}
              onFileUpload={handleFileUpload}
              disabled={isAnalyzing}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
