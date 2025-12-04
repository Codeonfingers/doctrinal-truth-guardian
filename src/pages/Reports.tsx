import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  FileText, 
  Download, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Eye,
  Share2,
  ChevronRight,
  BookOpen,
  AlertCircle,
  XCircle,
  Lightbulb
} from "lucide-react";
import { FadeInUp } from "@/components/ui/motion";
import { motion } from "framer-motion";

interface Report {
  id: number;
  name: string;
  date: string;
  score: number;
  verdict: "safe" | "caution" | "danger";
  issues: number;
  type: string;
}

interface Issue {
  id: number;
  severity: "high" | "medium" | "low";
  category: string;
  excerpt: string;
  line: number;
  suggestion: string;
  scripture: string;
}

const mockReports: Report[] = [
  { id: 1, name: "Sunday Sermon - Nov 24", date: "2024-11-24", score: 92, verdict: "safe", issues: 2, type: "Audio" },
  { id: 2, name: "Prosperity Teaching Analysis", date: "2024-11-22", score: 45, verdict: "danger", issues: 12, type: "PDF" },
  { id: 3, name: "Youth Group Session", date: "2024-11-20", score: 78, verdict: "caution", issues: 5, type: "Text" },
  { id: 4, name: "Marriage Counseling Audio", date: "2024-11-18", score: 88, verdict: "safe", issues: 1, type: "Audio" },
  { id: 5, name: "Guest Speaker Review", date: "2024-11-15", score: 62, verdict: "caution", issues: 8, type: "Video" },
  { id: 6, name: "Bible Study Notes", date: "2024-11-12", score: 95, verdict: "safe", issues: 0, type: "PDF" },
];

const mockIssues: Issue[] = [
  {
    id: 1,
    severity: "high",
    category: "Prosperity Gospel",
    excerpt: "God wants you to be wealthy and successful in all your earthly endeavors...",
    line: 45,
    suggestion: "This statement promotes prosperity gospel teachings which contradict biblical principles of contentment and spiritual wealth.",
    scripture: "1 Timothy 6:6-10 - But godliness with contentment is great gain..."
  },
  {
    id: 2,
    severity: "medium",
    category: "Scripture Misuse",
    excerpt: "As Jeremiah 29:11 promises, you will always prosper financially...",
    line: 78,
    suggestion: "Jeremiah 29:11 is taken out of context. This was a specific promise to Israel in exile, not a guarantee of financial prosperity.",
    scripture: "Jeremiah 29:11 (in context) - This verse speaks to Israel's return from Babylonian captivity."
  },
  {
    id: 3,
    severity: "low",
    category: "Unclear Teaching",
    excerpt: "The Holy Spirit will guide you to make profitable investments...",
    line: 112,
    suggestion: "While the Holy Spirit guides believers, this teaching conflates spiritual guidance with financial decision-making in a potentially misleading way.",
    scripture: "John 16:13 - The Spirit guides into all truth, primarily spiritual truth."
  },
];

export default function Reports() {
  const [selectedReport, setSelectedReport] = useState<Report | null>(mockReports[1]);

  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case "safe": return "bg-success/10 text-success border-success/20";
      case "caution": return "bg-warning/10 text-warning-foreground border-warning/20";
      case "danger": return "bg-destructive/10 text-destructive border-destructive/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getVerdictIcon = (verdict: string) => {
    switch (verdict) {
      case "safe": return <CheckCircle className="h-4 w-4" />;
      case "caution": return <AlertCircle className="h-4 w-4" />;
      case "danger": return <XCircle className="h-4 w-4" />;
      default: return null;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "bg-destructive text-destructive-foreground";
      case "medium": return "bg-warning text-warning-foreground";
      case "low": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning-foreground";
    return "text-destructive";
  };

  return (
    <Layout title="Reports" hideFooter>
      <div className="h-[calc(100vh-8rem)] flex gap-6">
        {/* Left Panel - Report List */}
        <FadeInUp className="w-full md:w-96 flex-shrink-0">
          <Card className="h-full flex flex-col">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Past Reports</CardTitle>
                  <CardDescription>{mockReports.length} analyses</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export All
                </Button>
              </div>
            </CardHeader>
            <CardContent className="flex-1 p-0">
              <ScrollArea className="h-full">
                <div className="px-4 pb-4 space-y-2">
                  {mockReports.map((report) => (
                    <motion.div
                      key={report.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: report.id * 0.05 }}
                      onClick={() => setSelectedReport(report)}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        selectedReport?.id === report.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:bg-accent/50"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                            <p className="font-medium text-sm truncate">{report.name}</p>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs h-5">
                              {report.type}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{report.date}</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span className={`text-lg font-bold ${getScoreColor(report.score)}`}>
                            {report.score}
                          </span>
                          <Badge className={`${getVerdictColor(report.verdict)} text-xs`}>
                            {report.verdict}
                          </Badge>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </FadeInUp>

        {/* Right Panel - Report Details */}
        <FadeInUp className="flex-1 hidden md:block">
          {selectedReport ? (
            <Card className="h-full flex flex-col">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{selectedReport.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <Clock className="h-3 w-3" />
                      Analyzed on {selectedReport.date}
                      <span className="mx-1">•</span>
                      <Badge variant="outline" className="text-xs">
                        {selectedReport.type}
                      </Badge>
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                    <Button size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export PDF
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex-1 overflow-hidden">
                <ScrollArea className="h-full pr-4">
                  {/* Score & Verdict Card */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-secondary/30 rounded-xl p-6 text-center">
                      <p className="text-sm text-muted-foreground mb-2">Doctrinal Score</p>
                      <p className={`text-5xl font-bold ${getScoreColor(selectedReport.score)}`}>
                        {selectedReport.score}
                      </p>
                      <Progress 
                        value={selectedReport.score} 
                        className="mt-4 h-2"
                      />
                    </div>
                    <div className="bg-secondary/30 rounded-xl p-6 text-center">
                      <p className="text-sm text-muted-foreground mb-2">Verdict</p>
                      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-lg font-semibold capitalize ${getVerdictColor(selectedReport.verdict)}`}>
                        {getVerdictIcon(selectedReport.verdict)}
                        {selectedReport.verdict === "safe" && "Safe to Read"}
                        {selectedReport.verdict === "caution" && "Read with Caution"}
                        {selectedReport.verdict === "danger" && "Do Not Read"}
                      </div>
                      <p className="text-sm text-muted-foreground mt-3">
                        {selectedReport.issues} issue{selectedReport.issues !== 1 ? 's' : ''} detected
                      </p>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <Eye className="h-4 w-4 text-primary" />
                      Analysis Summary
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed bg-secondary/20 p-4 rounded-lg">
                      This content contains {selectedReport.issues} doctrinal concern{selectedReport.issues !== 1 ? 's' : ''} 
                      that require{selectedReport.issues === 1 ? 's' : ''} attention. The analysis identified 
                      potential issues related to prosperity gospel teachings, scripture interpretation, 
                      and theological accuracy. Review the flagged sections below for detailed corrections.
                    </p>
                  </div>

                  <Separator className="my-6" />

                  {/* Flagged Issues */}
                  <div>
                    <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-warning" />
                      Flagged Issues ({mockIssues.length})
                    </h3>
                    <div className="space-y-4">
                      {mockIssues.map((issue, index) => (
                        <motion.div
                          key={issue.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="border border-border rounded-lg overflow-hidden"
                        >
                          <div className="p-4">
                            <div className="flex items-start justify-between gap-3 mb-3">
                              <div className="flex items-center gap-2">
                                <Badge className={getSeverityColor(issue.severity)}>
                                  {issue.severity}
                                </Badge>
                                <span className="font-medium text-foreground">{issue.category}</span>
                              </div>
                              <span className="text-xs text-muted-foreground">Line {issue.line}</span>
                            </div>
                            
                            {/* Excerpt */}
                            <div className="bg-destructive/5 border-l-4 border-destructive p-3 rounded-r-lg mb-3">
                              <p className="text-sm text-foreground italic">"{issue.excerpt}"</p>
                            </div>

                            {/* Suggestion */}
                            <div className="flex items-start gap-2 mb-3">
                              <Lightbulb className="h-4 w-4 text-warning shrink-0 mt-0.5" />
                              <p className="text-sm text-muted-foreground">{issue.suggestion}</p>
                            </div>

                            {/* Scripture Reference */}
                            <div className="flex items-start gap-2 bg-primary/5 p-3 rounded-lg">
                              <BookOpen className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                              <p className="text-sm text-foreground">{issue.scripture}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          ) : (
            <Card className="h-full flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Select a report to view details</p>
              </div>
            </Card>
          )}
        </FadeInUp>
      </div>
    </Layout>
  );
}
