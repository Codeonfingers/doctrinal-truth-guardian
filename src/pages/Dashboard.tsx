import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScoreGauge } from "@/components/ScoreGauge";
import { VerdictBadge, VerdictType } from "@/components/VerdictBadge";
import { Button } from "@/components/ui/button";
import { FileText, ArrowLeft } from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const [analyzing, setAnalyzing] = useState(true);
  const [result, setResult] = useState<{
    score: number;
    verdict: VerdictType;
    fileName: string;
  } | null>(null);

  const fileName = (location.state as { fileName?: string })?.fileName || "document.pdf";

  useEffect(() => {
    // Simulate analysis progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            // Simulate analysis result
            const mockScore = Math.floor(Math.random() * 40) + 60; // 60-100
            const verdict: VerdictType =
              mockScore >= 80 ? "safe" : mockScore >= 50 ? "caution" : "danger";
            
            setResult({ score: mockScore, verdict, fileName });
            setAnalyzing(false);
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(progressInterval);
  }, [fileName]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Upload
        </Button>

        <div className="max-w-4xl mx-auto space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                {fileName}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {analyzing ? (
                <div className="space-y-4 py-8">
                  <h3 className="text-lg font-semibold text-center">
                    Analyzing Document...
                  </h3>
                  <Progress value={progress} className="h-3" />
                  <div className="text-center text-sm text-muted-foreground">
                    Running doctrinal analysis • Detecting heresy patterns • Validating scripture
                  </div>
                </div>
              ) : result ? (
                <div className="space-y-8 py-8 animate-fade-in">
                  <div className="flex flex-col items-center gap-6">
                    <ScoreGauge score={result.score} />
                    <VerdictBadge verdict={result.verdict} />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <Card className="bg-gradient-card">
                      <CardContent className="pt-6">
                        <div className="text-sm text-muted-foreground mb-1">
                          Heresy Patterns
                        </div>
                        <div className="text-2xl font-bold">
                          {result.verdict === "safe" ? 0 : result.verdict === "caution" ? 2 : 5}
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-gradient-card">
                      <CardContent className="pt-6">
                        <div className="text-sm text-muted-foreground mb-1">
                          Scripture Fidelity
                        </div>
                        <div className="text-2xl font-bold">
                          {result.score >= 80 ? "High" : result.score >= 50 ? "Medium" : "Low"}
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-gradient-card">
                      <CardContent className="pt-6">
                        <div className="text-sm text-muted-foreground mb-1">
                          Tone Analysis
                        </div>
                        <div className="text-2xl font-bold">
                          {result.verdict === "safe" ? "Sound" : result.verdict === "caution" ? "Mixed" : "Concerning"}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="flex justify-center gap-4">
                    <Button
                      onClick={() => navigate("/report", { state: { result } })}
                      size="lg"
                    >
                      View Detailed Report
                    </Button>
                    <Button
                      onClick={() => navigate("/")}
                      variant="outline"
                      size="lg"
                    >
                      Analyze Another
                    </Button>
                  </div>
                </div>
              ) : null}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
