import { Shield, User } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ScoreGauge } from "@/components/ScoreGauge";
import { VerdictBadge, VerdictType } from "@/components/VerdictBadge";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

export interface AnalysisResult {
  score: number;
  verdict: VerdictType;
  fileName?: string;
  issues?: Array<{
    section: string;
    flag: string;
    severity: "high" | "medium" | "low";
    quote: string;
  }>;
}

export interface ChatMessageProps {
  role: "user" | "assistant";
  content?: string;
  analysisResult?: AnalysisResult;
  isTyping?: boolean;
}

export function ChatMessage({ role, content, analysisResult, isTyping }: ChatMessageProps) {
  if (isTyping) {
    return (
      <div className="flex gap-3 items-start mb-6">
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
          <Shield className="w-4 h-4 text-primary-foreground" />
        </div>
        <div className="flex-1 max-w-3xl">
          <div className="bg-muted rounded-lg px-4 py-3">
            <div className="flex gap-1">
              <span className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (role === "user") {
    return (
      <div className="flex gap-3 items-start mb-6 justify-end">
        <div className="flex-1 max-w-3xl">
          <div className="bg-primary text-primary-foreground rounded-lg px-4 py-3 ml-auto">
            {content}
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
          <User className="w-4 h-4" />
        </div>
      </div>
    );
  }

  // Assistant message
  return (
    <div className="flex gap-3 items-start mb-6">
      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
        <Shield className="w-4 h-4 text-primary-foreground" />
      </div>
      <div className="flex-1 max-w-3xl">
        {content && (
          <div className="bg-muted rounded-lg px-4 py-3 mb-4">
            <p className="text-sm leading-relaxed">{content}</p>
          </div>
        )}
        
        {analysisResult && (
          <Card className="p-6 space-y-6 shadow-lg">
            {/* Score and Verdict */}
            <div className="flex flex-col items-center gap-4">
              <ScoreGauge score={analysisResult.score} />
              <VerdictBadge verdict={analysisResult.verdict} />
              {analysisResult.fileName && (
                <p className="text-sm text-muted-foreground">
                  Analysis: {analysisResult.fileName}
                </p>
              )}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-xs text-muted-foreground mb-1">Integrity Score</div>
                <div className="text-2xl font-bold">{analysisResult.score}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-muted-foreground mb-1">Issues Found</div>
                <div className="text-2xl font-bold">{analysisResult.issues?.length || 0}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-muted-foreground mb-1">Fidelity</div>
                <div className="text-lg font-bold">
                  {analysisResult.score >= 80 ? "High" : analysisResult.score >= 50 ? "Med" : "Low"}
                </div>
              </div>
            </div>

            {/* Explanation */}
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Why this verdict?</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {analysisResult.verdict === "safe"
                  ? "This document demonstrates sound biblical teaching and theological integrity. No concerning doctrinal deviations were detected."
                  : analysisResult.verdict === "caution"
                  ? "This document contains some theological concerns that warrant careful discernment. While not fundamentally heretical, certain teachings may need contextual understanding."
                  : "This document contains significant doctrinal errors that contradict orthodox Christian teaching. Exercise extreme caution and compare all claims against Scripture."}
              </p>
            </div>

            {/* Collapsible Details */}
            {analysisResult.issues && analysisResult.issues.length > 0 && (
              <Collapsible>
                <CollapsibleTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    <span>View Detailed Findings ({analysisResult.issues.length})</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-4 space-y-3">
                  {analysisResult.issues.map((issue, index) => (
                    <Card
                      key={index}
                      className="p-4 border-l-4"
                      style={{
                        borderLeftColor:
                          issue.severity === "high"
                            ? "hsl(var(--destructive))"
                            : issue.severity === "medium"
                            ? "hsl(var(--warning))"
                            : "hsl(var(--muted))",
                      }}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="font-semibold text-sm">{issue.flag}</div>
                          <div className="text-xs text-muted-foreground">{issue.section}</div>
                        </div>
                        <Badge
                          variant={
                            issue.severity === "high"
                              ? "destructive"
                              : issue.severity === "medium"
                              ? "outline"
                              : "secondary"
                          }
                        >
                          {issue.severity}
                        </Badge>
                      </div>
                      <blockquote className="mt-2 pl-3 border-l-2 border-muted italic text-xs text-muted-foreground">
                        "{issue.quote}"
                      </blockquote>
                    </Card>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            )}

            {/* Download Report */}
            <Button className="w-full" variant="outline">
              Download Full Report (PDF)
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}