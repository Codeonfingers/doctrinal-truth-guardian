import { Badge } from "@/components/ui/badge";
import { Shield, AlertTriangle, XCircle } from "lucide-react";

export type VerdictType = "safe" | "caution" | "danger";

interface VerdictBadgeProps {
  verdict: VerdictType;
  size?: "sm" | "lg";
}

export const VerdictBadge = ({ verdict, size = "lg" }: VerdictBadgeProps) => {
  const config = {
    safe: {
      label: "Safe to Read",
      icon: Shield,
      className: "bg-success text-success-foreground border-success",
    },
    caution: {
      label: "Read with Caution",
      icon: AlertTriangle,
      className: "bg-warning text-warning-foreground border-warning",
    },
    danger: {
      label: "Do Not Read",
      icon: XCircle,
      className: "bg-destructive text-destructive-foreground border-destructive",
    },
  };

  const { label, icon: Icon, className } = config[verdict];
  const isLarge = size === "lg";

  return (
    <Badge
      variant="outline"
      className={`${className} ${
        isLarge ? "text-lg px-6 py-3" : "text-sm px-3 py-1"
      } font-semibold shadow-md`}
    >
      <Icon className={isLarge ? "mr-2 h-5 w-5" : "mr-1.5 h-4 w-4"} />
      {label}
    </Badge>
  );
};
