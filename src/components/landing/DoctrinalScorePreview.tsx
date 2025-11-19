import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export function DoctrinalScorePreview() {
  const score = 87;
  const riskLevel = "low";
  
  const getRiskColor = () => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const getRiskBadge = () => {
    if (score >= 80) return { label: "Low Risk", variant: "default" as const, color: "bg-success" };
    if (score >= 60) return { label: "Moderate Risk", variant: "secondary" as const, color: "bg-warning" };
    return { label: "High Risk", variant: "destructive" as const, color: "bg-destructive" };
  };

  const flags = [
    "Prosperity gospel tendency detected",
    "Unbiblical marriage counsel found",
  ];

  const strengths = [
    "Strong scriptural foundation",
    "Accurate Christology",
    "Sound soteriology",
  ];

  return (
    <Card className="max-w-2xl mx-auto shadow-lg border-2">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl font-bold text-foreground mb-2">
          Doctrinal Integrity Score
        </CardTitle>
        <div className={`text-6xl font-bold ${getRiskColor()}`}>
          {score}%
        </div>
        <Badge className={`mt-3 ${getRiskBadge().color} text-white`}>
          {getRiskBadge().label}
        </Badge>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Doctrinal Accuracy</span>
            <span>{score}%</span>
          </div>
          <Progress value={score} className="h-3" />
        </div>

        {/* Flags */}
        {flags.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              <XCircle className="h-5 w-5 text-destructive" />
              Issues Detected ({flags.length})
            </h4>
            <ul className="space-y-1">
              {flags.map((flag, i) => (
                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-warning flex-shrink-0 mt-0.5" />
                  <span>{flag}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Strengths */}
        <div className="space-y-2">
          <h4 className="font-semibold text-foreground flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-success" />
            Theological Strengths ({strengths.length})
          </h4>
          <ul className="space-y-1">
            {strengths.map((strength, i) => (
              <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                <span>{strength}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
