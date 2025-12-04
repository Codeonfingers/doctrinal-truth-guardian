import { useState, useEffect, useRef } from "react";
import { ChatMessage, ChatMessageProps, AnalysisResult } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { ScrollArea } from "@/components/ui/scroll-area";
import { VerdictType } from "@/components/VerdictBadge";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Download, Share2, Radio, PanelLeftClose, PanelLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RecordButton } from "@/components/chat/RecordButton";
import { LiveSermonMode } from "@/components/chat/LiveSermonMode";
import { CounselingModeToggle } from "@/components/chat/CounselingModeToggle";
import { ConversationsSidebar } from "@/components/chat/ConversationsSidebar";
import { RecordingModal } from "@/components/chat/RecordingModal";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function Chat() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ChatMessageProps[]>([
    {
      role: "assistant",
      content: "Welcome to DoctrineShield™ — The Autonomous Spiritual Intelligence Engine. I can analyze Christian materials for theological soundness, detect doctrinal deviations, and provide comprehensive integrity scores. Upload a document, record audio, or ask me a question to get started.",
    },
  ]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [liveSermonOpen, setLiveSermonOpen] = useState(false);
  const [recordingModalOpen, setRecordingModalOpen] = useState(false);
  const [counselingMode, setCounselingMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
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
    setMessages((prev) => [...prev, { role: "user", content: message }]);

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

  const handleRecordingComplete = async (audioBlob: Blob) => {
    const audioUrl = URL.createObjectURL(audioBlob);
    
    setMessages((prev) => [
      ...prev,
      { role: "user", content: "🎤 Voice recording submitted for analysis" },
    ]);
    
    setIsAnalyzing(true);
    setMessages((prev) => [...prev, { role: "assistant", isTyping: true }]);

    setTimeout(() => {
      setMessages((prev) => prev.filter((msg) => !msg.isTyping));
      
      const mockScore = Math.floor(Math.random() * 30) + 70;
      const verdict: VerdictType = mockScore >= 85 ? "safe" : mockScore >= 65 ? "caution" : "danger";
      
      const mockIssues = mockScore < 85 ? [
        {
          section: "00:45 - 01:15",
          flag: counselingMode ? "Manipulative counsel detected" : "Prosperity emphasis",
          severity: "medium" as const,
          quote: "God promises to make you financially successful if you have enough faith...",
        },
      ] : [];

      const analysisResult: AnalysisResult = {
        score: mockScore,
        verdict,
        fileName: "Voice Recording",
        issues: mockIssues,
      };

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Audio Analysis Complete",
          analysisResult,
        },
      ]);
      
      setIsAnalyzing(false);
      toast.success("Audio transcription and analysis complete");
    }, 3500);
  };

  const handleFileUpload = (file: File) => {
    setMessages((prev) => [
      ...prev,
      { role: "user", content: `📎 Uploaded document: ${file.name}` },
    ]);

    setIsAnalyzing(true);
    setMessages((prev) => [...prev, { role: "assistant", isTyping: true }]);

    setTimeout(() => {
      setMessages((prev) => prev.filter((msg) => !msg.isTyping));

      const mockScore = Math.floor(Math.random() * 40) + 60;
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
    <div className="flex h-screen bg-background">
      {/* Left Sidebar */}
      <div
        className={cn(
          "hidden md:flex transition-all duration-300 border-r border-border",
          sidebarOpen ? "w-80" : "w-0 overflow-hidden"
        )}
      >
        <ConversationsSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Action Bar */}
        <div className="border-b border-border bg-card px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hidden md:flex"
            >
              {sidebarOpen ? (
                <PanelLeftClose className="h-4 w-4" />
              ) : (
                <PanelLeft className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/dashboard")}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </Button>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLiveSermonOpen(true)}
              className="gap-2"
            >
              <Radio className="h-4 w-4" />
              <span className="hidden sm:inline">Live Sermon</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="hidden sm:flex gap-2"
            >
              <Download className="h-4 w-4" />
              <span className="hidden md:inline">Download</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="hidden md:flex gap-2"
            >
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </Button>
          </div>
        </div>

        {/* Counseling Mode Toggle */}
        <div className="px-4 py-3 border-b border-border bg-card/50">
          <div className="max-w-4xl mx-auto">
            <CounselingModeToggle
              enabled={counselingMode}
              onToggle={setCounselingMode}
            />
          </div>
        </div>

        {/* Messages Area */}
        <ScrollArea ref={scrollAreaRef} className="flex-1">
          <div className="max-w-4xl mx-auto py-6 px-4 space-y-6">
            {messages.map((message, index) => (
              <div key={index} className="animate-fade-in">
                <ChatMessage {...message} />
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t border-border bg-card sticky bottom-0">
          <div className="max-w-4xl mx-auto p-4">
            <div className="flex gap-2 items-end">
              <RecordButton
                onRecordingComplete={handleRecordingComplete}
                disabled={isAnalyzing}
              />
              <div className="flex-1">
                <ChatInput
                  onSendMessage={handleSendMessage}
                  onFileUpload={handleFileUpload}
                  onMicClick={() => setRecordingModalOpen(true)}
                  disabled={isAnalyzing}
                  showMicButton={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <LiveSermonMode
        open={liveSermonOpen}
        onClose={() => setLiveSermonOpen(false)}
      />
      <RecordingModal
        open={recordingModalOpen}
        onClose={() => setRecordingModalOpen(false)}
        onRecordingComplete={handleRecordingComplete}
      />
    </div>
  );
}
