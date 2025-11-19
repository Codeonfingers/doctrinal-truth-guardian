import { LucideIcon } from "lucide-react";

interface TrustBadgeProps {
  icon: LucideIcon;
  text: string;
}

export function TrustBadge({ icon: Icon, text }: TrustBadgeProps) {
  return (
    <div className="flex items-center gap-2 px-4 py-3 bg-card border border-border rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <Icon className="h-5 w-5 text-success" />
      <span className="text-sm font-medium text-foreground">{text}</span>
    </div>
  );
}
