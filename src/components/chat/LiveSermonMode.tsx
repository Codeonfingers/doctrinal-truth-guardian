import { useState, useEffect } from "react";
import { X, Circle, Square, Download } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface LiveSermonModeProps {
  open: boolean;
  onClose: () => void;
}

export function LiveSermonMode({ open, onClose }: LiveSermonModeProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const [alignmentScore, setAlignmentScore] = useState(85);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setDuration((prev) => prev + 1);
        // Simulate alignment fluctuation
        setAlignmentScore((prev) => Math.max(70, Math.min(95, prev + (Math.random() - 0.5) * 5)));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStartStop = () => {
    if (isRecording) {
      toast.success("Recording stopped. Generating full analysis...");
      setIsRecording(false);
    } else {
      setIsRecording(true);
      setDuration(0);
      toast.success("Live sermon recording started");
    }
  };

  const handleDownload = () => {
    toast.success("Sermon report downloaded");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Live Sermon Analysis
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 space-y-6 overflow-auto">
          {/* Timer and Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-3xl font-mono font-bold">{formatTime(duration)}</div>
              {isRecording && (
                <Badge variant="destructive" className="animate-pulse">
                  <Circle className="mr-1 h-2 w-2 fill-current" />
                  Recording
                </Badge>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                variant={isRecording ? "destructive" : "default"}
                size="lg"
                onClick={handleStartStop}
              >
                {isRecording ? (
                  <>
                    <Square className="mr-2 h-4 w-4" />
                    Stop & Analyze
                  </>
                ) : (
                  <>
                    <Circle className="mr-2 h-4 w-4" />
                    Start Recording
                  </>
                )}
              </Button>
              {!isRecording && duration > 0 && (
                <Button variant="outline" size="lg" onClick={handleDownload}>
                  <Download className="mr-2 h-4 w-4" />
                  Download Report
                </Button>
              )}
            </div>
          </div>

          {/* Live Alignment Meter */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Doctrinal Alignment</span>
              <span className="text-2xl font-bold">{Math.round(alignmentScore)}%</span>
            </div>
            <Progress
              value={alignmentScore}
              className="h-3"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>High Risk</span>
              <span>Moderate</span>
              <span>Safe</span>
            </div>
          </div>

          {/* Waveform Visualization */}
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-sm font-medium mb-4">Live Audio Waveform</h3>
            <div className="h-32 flex items-center justify-center gap-1">
              {Array.from({ length: 60 }).map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-primary rounded-full transition-all duration-150"
                  style={{
                    height: isRecording
                      ? `${30 + Math.random() * 70}%`
                      : "20%",
                    opacity: isRecording ? 0.8 : 0.3,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Live Flags */}
          {isRecording && (
            <div className="rounded-lg border bg-card p-4 space-y-2">
              <h3 className="text-sm font-medium">Live Monitoring</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-success text-success-foreground">
                    Clear
                  </Badge>
                  <span className="text-muted-foreground">Scripture references accurate</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-success text-success-foreground">
                    Clear
                  </Badge>
                  <span className="text-muted-foreground">Theological soundness maintained</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
