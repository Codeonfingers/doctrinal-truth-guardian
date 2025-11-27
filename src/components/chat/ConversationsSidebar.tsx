import { useState } from "react";
import { MessageSquare, Mic, Star, Plus, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface Conversation {
  id: string;
  title: string;
  type: "text" | "audio";
  timestamp: string;
  starred: boolean;
  riskLevel?: "high" | "moderate" | "safe";
}

const mockConversations: Conversation[] = [
  {
    id: "1",
    title: "Prosperity Gospel Analysis",
    type: "text",
    timestamp: "2 hours ago",
    starred: true,
    riskLevel: "high",
  },
  {
    id: "2",
    title: "Sunday Sermon Recording",
    type: "audio",
    timestamp: "Yesterday",
    starred: false,
    riskLevel: "safe",
  },
  {
    id: "3",
    title: "Counseling Session 3/15",
    type: "audio",
    timestamp: "2 days ago",
    starred: true,
    riskLevel: "moderate",
  },
  {
    id: "4",
    title: "Scripture Interpretation Q&A",
    type: "text",
    timestamp: "1 week ago",
    starred: false,
    riskLevel: "safe",
  },
];

export function ConversationsSidebar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "text" | "audio" | "starred">("all");
  const [selectedId, setSelectedId] = useState("1");

  const filteredConversations = mockConversations.filter((conv) => {
    if (activeFilter === "starred") return conv.starred;
    if (activeFilter === "text" || activeFilter === "audio") return conv.type === activeFilter;
    return true;
  }).filter((conv) => 
    conv.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const riskColors = {
    high: "bg-destructive text-destructive-foreground",
    moderate: "bg-warning text-warning-foreground",
    safe: "bg-success text-success-foreground",
  };

  return (
    <div className="flex h-full flex-col border-r bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">Conversations</h2>
        <Button size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          New Chat
        </Button>
      </div>

      {/* Search */}
      <div className="p-4 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          <Button
            variant={activeFilter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveFilter("all")}
          >
            All
          </Button>
          <Button
            variant={activeFilter === "text" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveFilter("text")}
          >
            <MessageSquare className="h-3 w-3 mr-1" />
            Text
          </Button>
          <Button
            variant={activeFilter === "audio" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveFilter("audio")}
          >
            <Mic className="h-3 w-3 mr-1" />
            Audio
          </Button>
          <Button
            variant={activeFilter === "starred" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveFilter("starred")}
          >
            <Star className="h-3 w-3 mr-1" />
          </Button>
        </div>
      </div>

      <Separator />

      {/* Conversations List */}
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {filteredConversations.map((conversation) => (
            <button
              key={conversation.id}
              onClick={() => setSelectedId(conversation.id)}
              className={cn(
                "w-full text-left rounded-lg p-3 transition-colors hover:bg-accent",
                selectedId === conversation.id && "bg-accent"
              )}
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  {conversation.type === "audio" ? (
                    <Mic className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                  ) : (
                    <MessageSquare className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                  )}
                  <span className="font-medium text-sm truncate">{conversation.title}</span>
                </div>
                {conversation.starred && (
                  <Star className="h-4 w-4 fill-warning text-warning flex-shrink-0" />
                )}
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                {conversation.riskLevel && (
                  <Badge variant="outline" className={cn("text-xs", riskColors[conversation.riskLevel])}>
                    {conversation.riskLevel}
                  </Badge>
                )}
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
