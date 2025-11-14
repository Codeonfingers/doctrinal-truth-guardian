import { X, Download, Copy, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { VerdictBadge, VerdictType } from "@/components/VerdictBadge";
import { cn } from "@/lib/utils";

interface ReportSlideOverProps {
  isOpen: boolean;
  onClose: () => void;
  analysis: {
    fileName: string;
    score: number;
    verdict: VerdictType;
    uploadedBy: string;
    date: string;
  } | null;
}

const mockIssues = [
  {
    severity: "high",
    category: "Soteriology",
    excerpt: "Salvation is achieved through our good works and faithful adherence to religious law.",
    line: 24,
    suggestion: "Clarify that salvation is by grace through faith alone (Ephesians 2:8-9), not by works.",
  },
  {
    severity: "medium",
    category: "Christology",
    excerpt: "Jesus was a great teacher and prophet who showed us the way to God.",
    line: 45,
    suggestion: "Emphasize Christ's full deity and unique role as the only mediator (1 Timothy 2:5).",
  },
  {
    severity: "low",
    category: "Eschatology",
    excerpt: "The details of end times are uncertain and open to interpretation.",
    line: 67,
    suggestion: "While interpretation varies, maintain clarity on core eschatological truths.",
  },
];

export function ReportSlideOver({ isOpen, onClose, analysis }: ReportSlideOverProps) {
  if (!isOpen || !analysis) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Slide-over Panel */}
      <div
        className={cn(
          "fixed right-0 top-0 h-full w-full md:w-[70%] bg-card border-l border-border z-50 shadow-lg transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <ScrollArea className="h-full">
          <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  {analysis.fileName}
                </h2>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>Uploaded by {analysis.uploadedBy}</span>
                  <span>•</span>
                  <span>{new Date(analysis.date).toLocaleDateString()}</span>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Score and Verdict */}
            <Card className="bg-gradient-card">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Doctrinal Integrity Score</p>
                    <p className="text-5xl font-bold text-foreground">{analysis.score}</p>
                    <p className="text-sm text-muted-foreground mt-1">out of 100</p>
                  </div>
                  <div className="flex justify-center">
                    <VerdictBadge verdict={analysis.verdict} size="lg" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Summary */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Summary</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                This document presents {analysis.score >= 80 ? "strong doctrinal alignment" : analysis.score >= 60 ? "mixed doctrinal content" : "significant doctrinal concerns"} with orthodox Christian teaching. {mockIssues.length} potential issues were identified across various theological categories, with primary concerns in soteriology and Christology.
              </p>
            </div>

            {/* Heatmap */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Deception Heatmap</h3>
              <div className="h-40 bg-gradient-to-r from-success/20 via-warning/30 to-destructive/40 rounded-lg relative overflow-hidden border border-border">
                <div className="absolute inset-0 grid grid-rows-4 gap-px">
                  {mockIssues.map((issue, idx) => (
                    <div
                      key={idx}
                      className="relative"
                      style={{ marginTop: `${(issue.line / 100) * 100}%` }}
                    >
                      <div className={`h-1 ${
                        issue.severity === 'high' ? 'bg-destructive' :
                        issue.severity === 'medium' ? 'bg-warning' :
                        'bg-muted-foreground'
                      } opacity-70`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Flagged Issues */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Flagged Issues</h3>
              <div className="space-y-4">
                {mockIssues.map((issue, idx) => (
                  <Card key={idx}>
                    <CardContent className="pt-4">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className={`h-5 w-5 mt-0.5 ${
                          issue.severity === 'high' ? 'text-destructive' :
                          issue.severity === 'medium' ? 'text-warning-foreground' :
                          'text-muted-foreground'
                        }`} />
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className={
                              issue.severity === 'high' ? 'border-destructive text-destructive' :
                              issue.severity === 'medium' ? 'border-warning text-warning-foreground' :
                              'border-muted-foreground text-muted-foreground'
                            }>
                              {issue.severity.toUpperCase()}
                            </Badge>
                            <span className="text-sm font-medium text-foreground">{issue.category}</span>
                            <span className="text-xs text-muted-foreground">Line {issue.line}</span>
                          </div>
                          <div className="bg-muted/50 p-3 rounded-md border-l-2 border-warning">
                            <p className="text-sm italic text-foreground">"{issue.excerpt}"</p>
                          </div>
                          <div className="bg-success/5 p-3 rounded-md border-l-2 border-success">
                            <p className="text-xs font-medium text-success mb-1">Suggested Correction:</p>
                            <p className="text-sm text-foreground">{issue.suggestion}</p>
                            <Button variant="ghost" size="sm" className="mt-2 h-7">
                              <Copy className="h-3 w-3 mr-1" />
                              Copy
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t border-border">
              <Button className="flex-1">
                <Download className="h-4 w-4 mr-2" />
                Download Report (PDF)
              </Button>
              <Button variant="outline">
                Share
              </Button>
            </div>
          </div>
        </ScrollArea>
      </div>
    </>
  );
}
