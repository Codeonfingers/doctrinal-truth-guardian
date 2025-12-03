import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { 
  Settings, 
  Cpu, 
  Zap, 
  History,
  Shield,
  BookOpen,
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Play,
  Pause,
  ArrowUpRight,
  GitBranch
} from "lucide-react";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { motion } from "framer-motion";

const models = [
  { id: 1, name: "DoctrineNet-1.0", version: "1.0.3", status: "active", accuracy: 94, updated: "2024-11-20" },
  { id: 2, name: "FaithToneNet", version: "2.1.0", status: "active", accuracy: 89, updated: "2024-11-18" },
  { id: 3, name: "HeresyDetect-v2", version: "2.0.1", status: "active", accuracy: 91, updated: "2024-11-15" },
  { id: 4, name: "TruthRanker", version: "1.2.0", status: "standby", accuracy: 87, updated: "2024-11-10" },
];

const modelLogs = [
  { id: 1, model: "DoctrineNet-1.0", event: "Inference completed", duration: "1.2s", time: "2 min ago" },
  { id: 2, model: "FaithToneNet", event: "Batch processing", duration: "4.5s", time: "5 min ago" },
  { id: 3, model: "HeresyDetect-v2", event: "Model loaded", duration: "0.8s", time: "10 min ago" },
  { id: 4, model: "DoctrineNet-1.0", event: "Cache refreshed", duration: "0.3s", time: "15 min ago" },
];

export default function ModelManagement() {
  const [strictMode, setStrictMode] = useState(true);
  const [pastoralMode, setPastoralMode] = useState(false);
  const [verbosity, setVerbosity] = useState([50]);

  return (
    <Layout title="Model Management">
      <div className="max-w-screen-xl mx-auto p-4 md:p-6 space-y-6">
        {/* Header */}
        <FadeInUp>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">AI Model Management</h1>
              <p className="text-muted-foreground">Configure and monitor doctrinal analysis models</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Sync Models
              </Button>
              <Button>
                <GitBranch className="h-4 w-4 mr-2" />
                Deploy Update
              </Button>
            </div>
          </div>
        </FadeInUp>

        {/* Model Stats */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StaggerItem>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Cpu className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Active Models</p>
                    <p className="text-2xl font-bold">4</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </StaggerItem>
          <StaggerItem>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                    <Zap className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Avg. Latency</p>
                    <p className="text-2xl font-bold">1.4s</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </StaggerItem>
          <StaggerItem>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Avg. Accuracy</p>
                    <p className="text-2xl font-bold">90.2%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </StaggerItem>
          <StaggerItem>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-amber-500/10 flex items-center justify-center">
                    <History className="h-6 w-6 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Inferences Today</p>
                    <p className="text-2xl font-bold">1,247</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </StaggerItem>
        </StaggerContainer>

        {/* Main Tabs */}
        <FadeInUp>
          <Tabs defaultValue="models" className="space-y-4">
            <TabsList>
              <TabsTrigger value="models" className="gap-2">
                <Cpu className="h-4 w-4" />
                Models
              </TabsTrigger>
              <TabsTrigger value="behavior" className="gap-2">
                <Settings className="h-4 w-4" />
                Behavior
              </TabsTrigger>
              <TabsTrigger value="safety" className="gap-2">
                <Shield className="h-4 w-4" />
                Safety
              </TabsTrigger>
              <TabsTrigger value="logs" className="gap-2">
                <History className="h-4 w-4" />
                Logs
              </TabsTrigger>
            </TabsList>

            {/* Models Tab */}
            <TabsContent value="models" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Active Models</CardTitle>
                  <CardDescription>Manage deployed AI models for doctrinal analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {models.map((model, index) => (
                      <motion.div
                        key={model.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors gap-4"
                      >
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Cpu className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium">{model.name}</p>
                              <Badge variant="outline">v{model.version}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">Updated {model.updated}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground">Accuracy</p>
                            <p className="text-lg font-bold text-green-500">{model.accuracy}%</p>
                          </div>
                          <Badge className={model.status === "active" ? "bg-green-500/10 text-green-500" : "bg-muted text-muted-foreground"}>
                            {model.status}
                          </Badge>
                          <Button variant="ghost" size="icon">
                            {model.status === "active" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Version Comparison */}
              <Card>
                <CardHeader>
                  <CardTitle>Version History</CardTitle>
                  <CardDescription>Compare model versions and rollback if needed</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { version: "1.0.3", date: "Nov 20, 2024", changes: "Improved scripture detection", status: "current" },
                      { version: "1.0.2", date: "Nov 10, 2024", changes: "Fixed false positive rate", status: "stable" },
                      { version: "1.0.1", date: "Oct 28, 2024", changes: "Added prosperity gospel patterns", status: "stable" },
                    ].map((v, index) => (
                      <div key={v.version} className="flex items-center justify-between p-3 rounded-lg border border-border">
                        <div className="flex items-center gap-3">
                          <GitBranch className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="font-medium">v{v.version}</p>
                            <p className="text-sm text-muted-foreground">{v.changes}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-muted-foreground">{v.date}</span>
                          {v.status === "current" ? (
                            <Badge className="bg-green-500/10 text-green-500">Current</Badge>
                          ) : (
                            <Button variant="outline" size="sm">Rollback</Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Behavior Tab */}
            <TabsContent value="behavior" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Scripture Mode
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Strict Scripture Validation</Label>
                        <p className="text-sm text-muted-foreground">Flag any verse used out of context</p>
                      </div>
                      <Switch checked={strictMode} onCheckedChange={setStrictMode} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Cross-Reference Check</Label>
                        <p className="text-sm text-muted-foreground">Verify supporting passages</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Original Language Analysis</Label>
                        <p className="text-sm text-muted-foreground">Include Hebrew/Greek roots</p>
                      </div>
                      <Switch />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      Output Style
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Pastoral Tone</Label>
                        <p className="text-sm text-muted-foreground">Gentler correction language</p>
                      </div>
                      <Switch checked={pastoralMode} onCheckedChange={setPastoralMode} />
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <Label>Verbosity Level</Label>
                        <span className="text-sm text-muted-foreground">{verbosity[0]}%</span>
                      </div>
                      <Slider value={verbosity} onValueChange={setVerbosity} max={100} step={10} />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Concise</span>
                        <span>Detailed</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Safety Tab */}
            <TabsContent value="safety" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Safety Controls
                  </CardTitle>
                  <CardDescription>Prevent model hallucinations and ensure citation accuracy</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Hallucination Prevention</Label>
                          <p className="text-sm text-muted-foreground">Verify all scripture citations</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Citation Verification</Label>
                          <p className="text-sm text-muted-foreground">Cross-check quoted verses</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Confidence Threshold</Label>
                          <p className="text-sm text-muted-foreground">Min 85% confidence for flags</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50 space-y-3">
                      <h4 className="font-medium">Safety Metrics (Last 7 days)</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>False positive rate</span>
                          <span className="text-green-500">2.1%</span>
                        </div>
                        <Progress value={2.1} className="h-1.5" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Citation accuracy</span>
                          <span className="text-green-500">98.7%</span>
                        </div>
                        <Progress value={98.7} className="h-1.5" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Hallucination detected</span>
                          <span className="text-green-500">0.3%</span>
                        </div>
                        <Progress value={0.3} className="h-1.5" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Logs Tab */}
            <TabsContent value="logs" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Model Activity Logs</CardTitle>
                  <CardDescription>Real-time model inference and processing logs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {modelLogs.map((log, index) => (
                      <motion.div
                        key={log.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center gap-4 p-3 rounded-lg border border-border font-mono text-sm"
                      >
                        <span className="text-muted-foreground">{log.time}</span>
                        <Badge variant="outline">{log.model}</Badge>
                        <span className="flex-1">{log.event}</span>
                        <span className="text-green-500">{log.duration}</span>
                      </motion.div>
                    ))}
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
