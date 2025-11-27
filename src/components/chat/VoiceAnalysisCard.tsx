import { AlertTriangle, CheckCircle2, BookOpen } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface DoctrinalIssue {
  category: string;
  severity: "low" | "medium" | "high";
  description: string;
  correction: string;
  scriptureRefs: string[];
}

interface VoiceAnalysisCardProps {
  issues: DoctrinalIssue[];
  overallScore: number;
  strengths?: string[];
}

export function VoiceAnalysisCard({
  issues,
  overallScore,
  strengths = [],
}: VoiceAnalysisCardProps) {
  const severityConfig = {
    low: { color: "bg-warning", label: "Low" },
    medium: { color: "bg-warning", label: "Medium" },
    high: { color: "bg-destructive", label: "High" },
  };

  return (
    <Card className="p-6 space-y-4">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Doctrinal Analysis</h3>
          <Badge
            variant="outline"
            className={
              overallScore >= 80
                ? "bg-success text-success-foreground"
                : overallScore >= 60
                  ? "bg-warning text-warning-foreground"
                  : "bg-destructive text-destructive-foreground"
            }
          >
            Score: {overallScore}%
          </Badge>
        </div>

        {strengths.length > 0 && (
          <>
            <div className="space-y-2 mb-4">
              <h4 className="text-sm font-medium flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-success" />
                Strengths
              </h4>
              <ul className="space-y-1">
                {strengths.map((strength, index) => (
                  <li key={index} className="text-sm text-muted-foreground pl-6">
                    • {strength}
                  </li>
                ))}
              </ul>
            </div>
            <Separator className="my-4" />
          </>
        )}

        <div className="space-y-4">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-warning" />
            Issues Detected ({issues.length})
          </h4>

          {issues.map((issue, index) => (
            <div key={index} className="rounded-lg border p-4 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={severityConfig[issue.severity].color}>
                      {severityConfig[issue.severity].label}
                    </Badge>
                    <span className="font-medium text-sm">{issue.category}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{issue.description}</p>
                </div>
              </div>

              <div className="rounded bg-muted p-3 space-y-2">
                <p className="text-sm font-medium">Correction:</p>
                <p className="text-sm">{issue.correction}</p>
              </div>

              {issue.scriptureRefs.length > 0 && (
                <div className="flex items-start gap-2">
                  <BookOpen className="h-4 w-4 text-primary mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-xs font-medium">Scripture References:</p>
                    <div className="flex flex-wrap gap-1">
                      {issue.scriptureRefs.map((ref, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {ref}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
