import { Shield, ShieldAlert } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CounselingModeToggleProps {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
}

export function CounselingModeToggle({
  enabled,
  onToggle,
}: CounselingModeToggleProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border bg-card p-4">
      <div className="flex items-center gap-3">
        {enabled ? (
          <ShieldAlert className="h-5 w-5 text-warning" />
        ) : (
          <Shield className="h-5 w-5 text-muted-foreground" />
        )}
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <Label htmlFor="counseling-mode" className="cursor-pointer">
              Counseling Mode
            </Label>
            {enabled && (
              <Badge variant="outline" className="bg-warning text-warning-foreground">
                Active
              </Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            Enhanced monitoring for counseling sessions
          </p>
        </div>
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <Switch
                id="counseling-mode"
                checked={enabled}
                onCheckedChange={onToggle}
              />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p className="max-w-xs text-xs">
              When enabled, AI monitors for manipulative statements, unsound advice,
              emotional abuse, and ungodly counsel
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
