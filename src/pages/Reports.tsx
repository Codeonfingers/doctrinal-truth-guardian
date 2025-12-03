import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { 
  FileText, 
  Download, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  BarChart3,
  PieChart,
  Filter,
  Calendar,
  Eye,
  Share2
} from "lucide-react";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { motion } from "framer-motion";

const mockReports = [
  { id: 1, name: "Sunday Sermon - Nov 24", date: "2024-11-24", score: 92, verdict: "safe", issues: 2 },
  { id: 2, name: "Prosperity Teaching Analysis", date: "2024-11-22", score: 45, verdict: "danger", issues: 12 },
  { id: 3, name: "Youth Group Session", date: "2024-11-20", score: 78, verdict: "caution", issues: 5 },
  { id: 4, name: "Marriage Counseling Audio", date: "2024-11-18", score: 88, verdict: "safe", issues: 1 },
  { id: 5, name: "Guest Speaker Review", date: "2024-11-15", score: 62, verdict: "caution", issues: 8 },
];

const heatmapData = [
  { section: "Introduction", risk: 15 },
  { section: "Main Point 1", risk: 45 },
  { section: "Scripture Reading", risk: 8 },
  { section: "Main Point 2", risk: 72 },
  { section: "Application", risk: 25 },
  { section: "Conclusion", risk: 12 },
];

export default function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState("week");

  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case "safe": return "bg-green-500/10 text-green-500 border-green-500/20";
      case "caution": return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "danger": return "bg-destructive/10 text-destructive border-destructive/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getRiskColor = (risk: number) => {
    if (risk < 30) return "bg-green-500";
    if (risk < 60) return "bg-amber-500";
    return "bg-destructive";
  };

  return (
    <Layout title="Reports">
      <div className="max-w-screen-xl mx-auto p-4 md:p-6 space-y-6">
        <FadeInUp>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Analysis Reports</h1>
              <p className="text-muted-foreground">Track doctrinal integrity across all analyzed content</p>
            </div>
            <div className="flex items-center gap-3">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-[140px]">
                  <Calendar className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Export All
              </Button>
            </div>
          </div>
        </FadeInUp>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StaggerItem>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Analyses</p>
                    <p className="text-3xl font-bold">156</p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </StaggerItem>
          <StaggerItem>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Safe Content</p>
                    <p className="text-3xl font-bold text-green-500">68%</p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  </div>
                </div>
                <Progress value={68} className="mt-3 h-1.5" />
              </CardContent>
            </Card>
          </StaggerItem>
          <StaggerItem>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Issues Found</p>
                    <p className="text-3xl font-bold text-amber-500">234</p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-amber-500/10 flex items-center justify-center">
                    <AlertTriangle className="h-6 w-6 text-amber-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </StaggerItem>
          <StaggerItem>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg. Score</p>
                    <p className="text-3xl font-bold">76</p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </StaggerItem>
        </StaggerContainer>

        <FadeInUp>
          <Tabs defaultValue="history" className="space-y-4">
            <TabsList>
              <TabsTrigger value="history" className="gap-2">
                <Clock className="h-4 w-4" />History
              </TabsTrigger>
              <TabsTrigger value="heatmap" className="gap-2">
                <BarChart3 className="h-4 w-4" />Risk Heatmap
              </TabsTrigger>
              <TabsTrigger value="trends" className="gap-2">
                <PieChart className="h-4 w-4" />Trends
              </TabsTrigger>
            </TabsList>

            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Reports</CardTitle>
                  <CardDescription>All doctrinal analyses with full details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockReports.map((report, index) => (
                      <motion.div key={report.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors cursor-pointer">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <FileText className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{report.name}</p>
                            <p className="text-sm text-muted-foreground">{report.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right hidden sm:block">
                            <p className="text-sm font-medium">Score: {report.score}</p>
                            <p className="text-xs text-muted-foreground">{report.issues} issues</p>
                          </div>
                          <Badge className={getVerdictColor(report.verdict)}>{report.verdict}</Badge>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="icon"><Share2 className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="icon"><Download className="h-4 w-4" /></Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="heatmap">
              <Card>
                <CardHeader>
                  <CardTitle>Doctrinal Risk Heatmap</CardTitle>
                  <CardDescription>Visual distribution of risk across document sections</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {heatmapData.map((item, index) => (
                      <motion.div key={item.section} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{item.section}</span>
                          <span className="text-muted-foreground">{item.risk}% risk</span>
                        </div>
                        <div className="h-8 w-full bg-muted rounded-lg overflow-hidden">
                          <motion.div initial={{ width: 0 }} animate={{ width: `${item.risk}%` }} transition={{ duration: 0.5, delay: index * 0.1 }} className={`h-full ${getRiskColor(item.risk)} rounded-lg`} />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="mt-6 flex items-center justify-center gap-6 text-sm flex-wrap">
                    <div className="flex items-center gap-2"><div className="h-3 w-3 rounded bg-green-500" /><span>Low Risk</span></div>
                    <div className="flex items-center gap-2"><div className="h-3 w-3 rounded bg-amber-500" /><span>Medium Risk</span></div>
                    <div className="flex items-center gap-2"><div className="h-3 w-3 rounded bg-destructive" /><span>High Risk</span></div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="trends">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader><CardTitle>Issue Categories</CardTitle></CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[{ name: "Scripture Misuse", count: 45, color: "bg-red-500" }, { name: "Prosperity Gospel", count: 32, color: "bg-amber-500" }, { name: "Context Errors", count: 28, color: "bg-yellow-500" }, { name: "Manipulation", count: 15, color: "bg-purple-500" }].map((item) => (
                        <div key={item.name} className="flex items-center gap-3">
                          <div className={`h-3 w-3 rounded ${item.color}`} />
                          <span className="flex-1 text-sm">{item.name}</span>
                          <span className="text-sm font-medium">{item.count}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader><CardTitle>Monthly Progress</CardTitle></CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[{ month: "September", score: 68 }, { month: "October", score: 72 }, { month: "November", score: 76 }].map((item) => (
                        <div key={item.month} className="space-y-2">
                          <div className="flex justify-between text-sm"><span>{item.month}</span><span className="font-medium">{item.score}%</span></div>
                          <Progress value={item.score} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </FadeInUp>
      </div>
    </Layout>
  );
}
