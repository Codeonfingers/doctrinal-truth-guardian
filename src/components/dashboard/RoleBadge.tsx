import { Badge } from "@/components/ui/badge";
import { Shield, UserCheck, Edit3, Eye } from "lucide-react";

interface RoleBadgeProps {
  role: "admin" | "editor" | "viewer" | "owner";
}

const roleConfig = {
  owner: {
    label: "Owner",
    icon: Shield,
    className: "bg-primary text-primary-foreground",
  },
  admin: {
    label: "Admin",
    icon: UserCheck,
    className: "bg-accent text-accent-foreground",
  },
  editor: {
    label: "Editor",
    icon: Edit3,
    className: "bg-secondary text-secondary-foreground",
  },
  viewer: {
    label: "Viewer",
    icon: Eye,
    className: "bg-muted text-muted-foreground",
  },
};

export function RoleBadge({ role }: RoleBadgeProps) {
  const config = roleConfig[role];
  const Icon = config.icon;

  return (
    <Badge variant="outline" className={config.className}>
      <Icon className="mr-1 h-3 w-3" />
      {config.label}
    </Badge>
  );
}
