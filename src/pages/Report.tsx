import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, AlertCircle } from "lucide-react";
import { VerdictBadge, VerdictType } from "@/components/VerdictBadge";

export default function Report() {
  const navigate = useNavigate();
  const location = useLocation();
  const result = (location.state as { result?: { score: number; verdict: VerdictType; fileName: string } })?.result;

  if (!result) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <p>No analysis data found. Please analyze a document first.</p>
            <Button onClick={() => navigate("/")} className="mt-4">
              Go to Upload
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const mockIssues = result.verdict === "safe" ? [] : result.verdict === "caution" 
    ? [
        {
          section: "Page 2, Paragraph 3",
          flag: "Prosperity emphasis",
          severity: "medium",
          quote: "God wants you to be wealthy and successful in all your endeavors...",
        },
        {
          section: "Page 5, Paragraph 1",
          flag: "Scripture taken out of context",
          severity: "low",
          quote: "Philippians 4:13 cited without proper context of contentment...",
        },
      ]
    : [
        {
          section: "Page 1, Paragraph 2",
          flag: "Denial of Christ's divinity",
          severity: "high",
          quote: "Jesus was merely an enlightened teacher, not God incarnate...",
        },
        {
          section: "Page 3, Paragraph 4",
          flag: "Universalism teaching",
          severity: "high",
          quote: "All paths lead to the same divine truth...",
        },
        {
          section: "Page 6, Paragraph 2",
          flag: "New Age syncretism",
          severity: "high",
          quote: "Blending chakra alignment with Christian meditation...",
        },
      ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <Button variant="ghost" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Results
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download Report
          </Button>
        </div>

        <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Doctrinal Analysis Report</CardTitle>
              <p className="text-sm text-muted-foreground">{result.fileName}</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm text-muted-foreground">Overall Score</div>
                  <div className="text-4xl font-bold">{result.score}/100</div>
                </div>
                <VerdictBadge verdict={result.verdict} />
              </div>

              {mockIssues.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    Identified Issues ({mockIssues.length})
                  </h3>
                  <div className="space-y-4">
                    {mockIssues.map((issue, index) => (
                      <Card key={index} className="border-l-4" style={{
                        borderLeftColor: issue.severity === "high" ? "hsl(var(--destructive))" :
                                       issue.severity === "medium" ? "hsl(var(--warning))" :
                                       "hsl(var(--muted))"
                      }}>
                        <CardContent className="pt-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <div className="font-semibold">{issue.flag}</div>
                              <div className="text-sm text-muted-foreground">{issue.section}</div>
                            </div>
                            <Badge variant={
                              issue.severity === "high" ? "destructive" :
                              issue.severity === "medium" ? "outline" :
                              "secondary"
                            }>
                              {issue.severity}
                            </Badge>
                          </div>
                          <blockquote className="mt-3 pl-4 border-l-2 border-muted italic text-sm">
                            "{issue.quote}"
                          </blockquote>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {mockIssues.length === 0 && (
                <Card className="bg-success/10 border-success">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-success font-semibold mb-2">
                        No Doctrinal Issues Detected
                      </div>
                      <p className="text-sm text-muted-foreground">
                        This document demonstrates sound biblical teaching and theological integrity.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div>
                <h3 className="text-lg font-semibold mb-3">Scriptural Basis</h3>
                <Card className="bg-gradient-card">
                  <CardContent className="pt-4 text-sm">
                    <p className="mb-2 font-medium">Analysis grounded in:</p>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• 2 Timothy 3:16-17 - Scripture as the standard of truth</li>
                      <li>• 1 John 4:1 - Testing all teachings against God's Word</li>
                      <li>• Acts 17:11 - Noble Berean example of verification</li>
                      <li>• Galatians 1:8-9 - Guarding against false gospels</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
