import { useNavigate, useLocation } from "react-router-dom";
import { 
  Shield, LayoutDashboard, MessageSquare, Database, FileText, Settings, 
  ChevronLeft, ChevronRight, UserCog, Plus, MessageCircle, Mic, Star, 
  AlertTriangle, Filter, Home
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

interface NavItem {
  label: string;
  icon: React.ElementType;
  path: string;
  adminOnly?: boolean;
}

interface SidebarCategory {
  label: string;
  icon: React.ElementType;
  items?: { label: string; count?: number }[];
}

const navItems: NavItem[] = [
  { label: "Home", icon: Home, path: "/" },
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { label: "Chat / Analyzer", icon: MessageSquare, path: "/chat" },
  { label: "Reports", icon: FileText, path: "/reports" },
  { label: "Dataset Screening", icon: Database, path: "/dataset-screening" },
  { label: "Model Management", icon: Settings, path: "/model-management" },
  { label: "Admin", icon: UserCog, path: "/admin", adminOnly: true },
];

const categories: SidebarCategory[] = [
  { label: "Conversations", icon: MessageCircle, items: [{ label: "Recent Chats", count: 5 }] },
  { label: "Saved Recordings", icon: Mic, items: [{ label: "Audio Files", count: 3 }] },
  { label: "Starred", icon: Star, items: [{ label: "Bookmarked", count: 2 }] },
];

const filterItems = [
  { label: "Audio", icon: Mic },
  { label: "Text", icon: FileText },
  { label: "High-Risk", icon: AlertTriangle },
];

interface DashboardSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function DashboardSidebar({ collapsed, onToggle }: DashboardSidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside
      className={cn(
        "h-screen bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo Section */}
      <div className="h-16 border-b border-sidebar-border flex items-center px-4">
        {!collapsed ? (
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Shield className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-sm font-semibold text-sidebar-foreground">DoctrineShield</span>
          </div>
        ) : (
          <div 
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary mx-auto cursor-pointer"
            onClick={() => navigate("/")}
          >
            <Shield className="h-4 w-4 text-primary-foreground" />
          </div>
        )}
      </div>

      {/* New Chat Button */}
      {!collapsed && (
        <div className="p-3">
          <Button
            onClick={() => navigate("/chat")}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Chat
          </Button>
        </div>
      )}
      {collapsed && (
        <div className="p-2 flex justify-center">
          <Button
            size="icon"
            onClick={() => navigate("/chat")}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Main Navigation */}
      <nav className="flex-1 overflow-y-auto py-2 px-2">
        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Button
                key={item.path}
                variant="ghost"
                onClick={() => navigate(item.path)}
                className={cn(
                  "w-full justify-start transition-colors h-9",
                  collapsed ? "px-0 justify-center" : "px-3",
                  isActive 
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" 
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                )}
              >
                <Icon className={cn("h-4 w-4 shrink-0", !collapsed && "mr-2")} />
                {!collapsed && <span className="text-sm truncate">{item.label}</span>}
              </Button>
            );
          })}
        </div>

        {/* Categories Section */}
        {!collapsed && (
          <>
            <Separator className="my-4" />
            <div className="space-y-4">
              {categories.map((category) => {
                const CategoryIcon = category.icon;
                return (
                  <div key={category.label}>
                    <div className="flex items-center gap-2 px-3 py-1 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      <CategoryIcon className="h-3 w-3" />
                      {category.label}
                    </div>
                    {category.items?.map((item) => (
                      <Button
                        key={item.label}
                        variant="ghost"
                        className="w-full justify-between h-8 px-3 text-sidebar-foreground hover:bg-sidebar-accent/50"
                      >
                        <span className="text-sm">{item.label}</span>
                        {item.count && (
                          <span className="text-xs bg-muted px-1.5 py-0.5 rounded-full">
                            {item.count}
                          </span>
                        )}
                      </Button>
                    ))}
                  </div>
                );
              })}
            </div>

            {/* Filters */}
            <Separator className="my-4" />
            <div>
              <div className="flex items-center gap-2 px-3 py-1 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                <Filter className="h-3 w-3" />
                Filters
              </div>
              <div className="flex flex-wrap gap-1 px-3 py-2">
                {filterItems.map((filter) => {
                  const FilterIcon = filter.icon;
                  return (
                    <Button
                      key={filter.label}
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs"
                    >
                      <FilterIcon className="h-3 w-3 mr-1" />
                      {filter.label}
                    </Button>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </nav>

      {/* Collapse Toggle */}
      <div className="border-t border-sidebar-border p-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="w-full justify-center text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>
    </aside>
  );
}
