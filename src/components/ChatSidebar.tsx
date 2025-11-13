import { Shield, Plus, FileText, Settings, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface ChatSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  onNewChat: () => void;
}

export function ChatSidebar({ collapsed, onToggle, onNewChat }: ChatSidebarProps) {
  return (
    <aside
      className={cn(
        "relative h-screen bg-sidebar-background border-r border-sidebar-border/40 transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="p-3 border-b border-sidebar-border/40 flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <Shield className="w-4 h-4 text-primary" />
            </div>
            <span className="font-bold text-sm">DoctrineShield</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="h-8 w-8"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* New Analysis Button */}
      <div className="p-3">
        <Button
          onClick={onNewChat}
          className="w-full justify-start gap-2"
          variant="outline"
        >
          <Plus className="h-4 w-4" />
          {!collapsed && <span>New Analysis</span>}
        </Button>
      </div>

      {/* Recent Analyses */}
      {!collapsed && (
        <ScrollArea className="flex-1 px-3">
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground px-2 py-1">Recent</p>
            {/* Placeholder for recent analyses */}
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 text-xs"
              size="sm"
            >
              <FileText className="h-3 w-3" />
              <span className="truncate">Previous analysis...</span>
            </Button>
          </div>
        </ScrollArea>
      )}

      {/* Settings */}
      <div className="p-3 border-t border-sidebar-border/40">
        <Button
          variant="ghost"
          className="w-full justify-start gap-2"
          size="sm"
        >
          <Settings className="h-4 w-4" />
          {!collapsed && <span>Settings</span>}
        </Button>
      </div>
    </aside>
  );
}