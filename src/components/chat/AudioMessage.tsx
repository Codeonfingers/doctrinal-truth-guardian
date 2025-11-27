import { useState, useRef, useEffect } from "react";
import { Play, Pause, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface AudioMessageProps {
  audioUrl: string;
  transcript?: string;
  riskLevel?: "safe" | "moderate" | "high";
  duration?: number;
}

export function AudioMessage({
  audioUrl,
  transcript,
  riskLevel = "safe",
  duration = 0,
}: AudioMessageProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const riskConfig = {
    safe: { label: "Safe", className: "bg-success text-success-foreground" },
    moderate: { label: "Moderate Risk", className: "bg-warning text-warning-foreground" },
    high: { label: "High Risk", className: "bg-destructive text-destructive-foreground" },
  };

  return (
    <div className="rounded-lg border bg-card p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={togglePlayPause}
            className="h-10 w-10 rounded-full"
          >
            {isPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4 ml-0.5" />
            )}
          </Button>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-medium">Audio Recording</span>
              <Badge className={riskConfig[riskLevel].className}>
                {riskConfig[riskLevel].label}
              </Badge>
            </div>
            <div className="text-xs text-muted-foreground">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>
        </div>
        <Button variant="ghost" size="icon">
          <Download className="h-4 w-4" />
        </Button>
      </div>

      {/* Waveform placeholder */}
      <div className="h-12 rounded bg-muted flex items-center justify-center overflow-hidden">
        <div className="flex items-center gap-1 h-full">
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "w-1 bg-primary/30 rounded-full transition-all",
                currentTime > (i / 40) * duration && "bg-primary"
              )}
              style={{
                height: `${20 + Math.random() * 60}%`,
              }}
            />
          ))}
        </div>
      </div>

      {transcript && (
        <div className="pt-3 border-t">
          <p className="text-sm text-muted-foreground mb-2 font-medium">
            Transcript:
          </p>
          <p className="text-sm">{transcript}</p>
        </div>
      )}

      <audio ref={audioRef} src={audioUrl} className="hidden" />
    </div>
  );
}
