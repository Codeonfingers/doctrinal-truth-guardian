import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Database, 
  Upload, 
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Eye,
  Trash2,
  RefreshCw,
  Filter,
  Search,
  FileAudio,
  FileVideo,
  MoreHorizontal
} from "lucide-react";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";

const mockQueue = [
  { id: 1, name: "Sunday Sermon.mp3", type: "audio", size: "45 MB", status: "processing", progress: 65, uploaded: "2 min ago" },
  { id: 2, name: "Teaching Notes.pdf", type: "document", size: "2.3 MB", status: "pending", progress: 0, uploaded: "5 min ago" },
  { id: 3, name: "Counseling Session.mp3", type: "audio", size: "28 MB", status: "queued", progress: 0, uploaded: "10 min ago" },
  { id: 4, name: "Guest Speaker.docx", type: "document", size: "156 KB", status: "completed", progress: 100, uploaded: "1 hour ago" },
  { id: 5, name: "Youth Meeting.mp4", type: "video", size: "120 MB", status: "failed", progress: 0, uploaded: "2 hours ago" },
];

const preScanChecks = [
  { name: "Virus Scan", status: "passed", icon: CheckCircle },
  { name: "File Integrity", status: "passed", icon: CheckCircle },
  { name: "Format Validation", status: "passed", icon: CheckCircle },
  { name: "Silence Detection", status: "warning", icon: AlertTriangle },
  { name: "Structure Analysis", status: "passed", icon: CheckCircle },
];

export default function DatasetScreening() {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-500/10 text-green-500 border-green-500/20";
      case "processing": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "pending": return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "queued": return "bg-muted text-muted-foreground border-border";
      case "failed": return "bg-destructive/10 text-destructive border-destructive/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case "audio": return <FileAudio className="h-5 w-5 text-purple-500" />;
      case "video": return <FileVideo className="h-5 w-5 text-blue-500" />;
      default: return <FileText className="h-5 w-5 text-amber-500" />;
    }
  };

  const toggleSelectItem = (id: number) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === mockQueue.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(mockQueue.map(item => item.id));
    }
  };

  return (
    <Layout title="Dataset Screening">
      <div className="max-w-screen-xl mx-auto p-4 md:p-6 space-y-6">
        {/* Header */}
        <FadeInUp>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Dataset Screening</h1>
              <p className="text-muted-foreground">Pre-scan, validate, and queue content for analysis</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                Upload Files
              </Button>
            </div>
          </div>
        </FadeInUp>

        {/* Stats */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <StaggerItem>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Database className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Total Files</p>
                    <p className="text-xl font-bold">156</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </StaggerItem>
          <StaggerItem>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <RefreshCw className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Processing</p>
                    <p className="text-xl font-bold">3</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </StaggerItem>
          <StaggerItem>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Queued</p>
                    <p className="text-xl font-bold">12</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </StaggerItem>
          <StaggerItem>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Completed</p>
                    <p className="text-xl font-bold">138</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </StaggerItem>
          <StaggerItem>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                    <XCircle className="h-5 w-5 text-destructive" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Failed</p>
                    <p className="text-xl font-bold">3</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </StaggerItem>
        </StaggerContainer>

        {/* Main Tabs */}
        <FadeInUp>
          <Tabs defaultValue="queue" className="space-y-4">
            <TabsList>
              <TabsTrigger value="queue" className="gap-2">
                <Database className="h-4 w-4" />
                Intake Queue
              </TabsTrigger>
              <TabsTrigger value="prescan" className="gap-2">
                <CheckCircle className="h-4 w-4" />
                Pre-Scan Checks
              </TabsTrigger>
              <TabsTrigger value="review" className="gap-2">
                <Eye className="h-4 w-4" />
                Review Panel
              </TabsTrigger>
            </TabsList>

            {/* Queue Tab */}
            <TabsContent value="queue" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <CardTitle>File Queue</CardTitle>
                      <CardDescription>Manage incoming files for doctrinal screening</CardDescription>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="relative w-full md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                          placeholder="Search files..." 
                          className="pl-9"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      {selectedItems.length > 0 && (
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Approve ({selectedItems.length})
                          </Button>
                          <Button variant="outline" size="sm" className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {/* Header Row */}
                    <div className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg text-sm font-medium">
                      <Checkbox 
                        checked={selectedItems.length === mockQueue.length}
                        onCheckedChange={toggleSelectAll}
                      />
                      <span className="w-12">Type</span>
                      <span className="flex-1">File Name</span>
                      <span className="w-20 hidden sm:block">Size</span>
                      <span className="w-32">Status</span>
                      <span className="w-24 hidden md:block">Uploaded</span>
                      <span className="w-20">Actions</span>
                    </div>

                    {mockQueue.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center gap-4 p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors"
                      >
                        <Checkbox 
                          checked={selectedItems.includes(item.id)}
                          onCheckedChange={() => toggleSelectItem(item.id)}
                        />
                        <div className="w-12 flex justify-center">
                          {getFileIcon(item.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{item.name}</p>
                          {item.status === "processing" && (
                            <Progress value={item.progress} className="h-1 mt-1 w-32" />
                          )}
                        </div>
                        <span className="w-20 text-sm text-muted-foreground hidden sm:block">{item.size}</span>
                        <div className="w-32">
                          <Badge className={getStatusBadge(item.status)}>{item.status}</Badge>
                        </div>
                        <span className="w-24 text-sm text-muted-foreground hidden md:block">{item.uploaded}</span>
                        <div className="w-20 flex gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Pre-Scan Checks Tab */}
            <TabsContent value="prescan" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Automated Pre-Scan Checks</CardTitle>
                    <CardDescription>Validation steps before doctrinal analysis</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {preScanChecks.map((check, index) => (
                        <motion.div
                          key={check.name}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center justify-between p-3 rounded-lg border border-border"
                        >
                          <div className="flex items-center gap-3">
                            <check.icon className={`h-5 w-5 ${check.status === "passed" ? "text-green-500" : "text-amber-500"}`} />
                            <span>{check.name}</span>
                          </div>
                          <Badge className={check.status === "passed" ? "bg-green-500/10 text-green-500" : "bg-amber-500/10 text-amber-500"}>
                            {check.status}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Processing Rules</CardTitle>
                    <CardDescription>Configure automated screening behavior</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { rule: "Auto-reject files with viruses", enabled: true },
                        { rule: "Skip files with >50% silence", enabled: true },
                        { rule: "Require manual review for large files", enabled: false },
                        { rule: "Auto-approve known formats", enabled: true },
                        { rule: "Notify on failed uploads", enabled: true },
                      ].map((item, index) => (
                        <div key={item.rule} className="flex items-center justify-between p-3 rounded-lg border border-border">
                          <span className="text-sm">{item.rule}</span>
                          <Checkbox defaultChecked={item.enabled} />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Review Panel Tab */}
            <TabsContent value="review" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Manual Review Panel</CardTitle>
                  <CardDescription>Files flagged for human review before processing</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
                      <CheckCircle className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">All Clear</h3>
                    <p className="text-muted-foreground max-w-md">
                      No files currently require manual review. Files flagged by automated checks will appear here.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </FadeInUp>
      </div>
    </Layout>
  );
}
