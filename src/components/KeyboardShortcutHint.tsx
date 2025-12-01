import { Command } from "lucide-react";
import { cn } from "@/lib/utils";

interface KeyboardShortcutHintProps {
  keys: string[];
  action: string;
  className?: string;
}

export function KeyboardShortcutHint({
  keys,
  action,
  className,
}: KeyboardShortcutHintProps) {
  const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;

  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 bg-card/90 backdrop-blur-lg border border-border rounded-lg p-3 shadow-lg z-50 animate-fade-in",
        className
      )}
    >
      <div className="flex items-center gap-2 text-sm">
        <span className="text-muted-foreground">{action}:</span>
        <div className="flex items-center gap-1">
          {keys.map((key, index) => (
            <span key={index} className="flex items-center gap-1">
              <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono font-semibold">
                {key === "cmd" ? (
                  isMac ? (
                    <Command className="h-3 w-3" />
                  ) : (
                    "Ctrl"
                  )
                ) : (
                  key.toUpperCase()
                )}
              </kbd>
              {index < keys.length - 1 && <span className="text-muted-foreground">+</span>}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
