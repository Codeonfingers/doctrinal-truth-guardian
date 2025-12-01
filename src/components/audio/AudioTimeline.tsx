import { useState, useRef, useEffect } from "react";
import { Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TimelineAnnotation {
  timestamp: number; // in seconds
  severity: "high" | "medium" | "low";
  label: string;
  description?: string;
}

interface AudioTimelineProps {
  audioUrl: string;
  duration: number;
  annotations?: TimelineAnnotation[];
}

export function AudioTimeline({
  audioUrl,
  duration,
  annotations = [],
}: AudioTimelineProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

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

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    const timeline = timelineRef.current;
    if (!audio || !timeline) return;

    const rect = timeline.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    audio.currentTime = percentage * duration;
  };

  const jumpToAnnotation = (timestamp: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = timestamp;
    if (!isPlaying) {
      audio.play();
      setIsPlaying(true);
    }
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getSeverityColor = (severity: "high" | "medium" | "low") => {
    switch (severity) {
      case "high":
        return "bg-destructive";
      case "medium":
        return "bg-warning";
      case "low":
        return "bg-accent";
    }
  };

  return (
    <div className="space-y-4">
      {/* Playback Controls */}
      <div className="flex items-center gap-4">
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
          <div className="text-sm text-muted-foreground mb-1">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>
      </div>

      {/* Timeline with Annotations */}
      <div
        ref={timelineRef}
        className="relative h-16 bg-muted rounded-lg cursor-pointer overflow-hidden"
        onClick={handleTimelineClick}
      >
        {/* Progress Bar */}
        <div
          className="absolute top-0 left-0 h-full bg-primary/30 transition-all duration-100"
          style={{ width: `${(currentTime / duration) * 100}%` }}
        />

        {/* Current Time Indicator */}
        <div
          className="absolute top-0 h-full w-1 bg-primary"
          style={{ left: `${(currentTime / duration) * 100}%` }}
        />

        {/* Annotations */}
        {annotations.map((annotation, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              jumpToAnnotation(annotation.timestamp);
            }}
            className={cn(
              "absolute top-1 h-14 w-2 rounded-full transition-all hover:scale-110",
              getSeverityColor(annotation.severity)
            )}
            style={{ left: `${(annotation.timestamp / duration) * 100}%` }}
            title={`${annotation.label} at ${formatTime(annotation.timestamp)}`}
          />
        ))}
      </div>

      {/* Annotations List */}
      {annotations.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-foreground">
            Doctrinal Flags ({annotations.length})
          </h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {annotations.map((annotation, index) => (
              <button
                key={index}
                onClick={() => jumpToAnnotation(annotation.timestamp)}
                className="w-full text-left p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={cn(
                          "inline-block w-2 h-2 rounded-full",
                          getSeverityColor(annotation.severity)
                        )}
                      />
                      <span className="text-sm font-medium">
                        {annotation.label}
                      </span>
                    </div>
                    {annotation.description && (
                      <p className="text-xs text-muted-foreground">
                        {annotation.description}
                      </p>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {formatTime(annotation.timestamp)}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      <audio ref={audioRef} src={audioUrl} className="hidden" />
    </div>
  );
}
