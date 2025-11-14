import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, FileText, Gauge, AlertCircle } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    positive: boolean;
  };
  onClick?: () => void;
}

function KPICard({ title, value, icon, trend, onClick }: KPICardProps) {
  return (
    <Card 
      className="cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-2">
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            {icon}
          </div>
          {trend && (
            <span className={`text-xs font-medium ${trend.positive ? 'text-success' : 'text-destructive'}`}>
              {trend.positive ? '+' : ''}{trend.value}%
            </span>
          )}
        </div>
        <div className="mt-3">
          <p className="text-2xl font-bold text-foreground">{value}</p>
          <p className="text-sm text-muted-foreground mt-1">{title}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export function KPIStrip() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <KPICard
        title="Doctrinal Integrity (7d avg)"
        value="87.3"
        icon={<Gauge className="h-5 w-5" />}
        trend={{ value: 5.2, positive: true }}
      />
      <KPICard
        title="Analyses (Today)"
        value="24"
        icon={<FileText className="h-5 w-5" />}
        trend={{ value: 12, positive: true }}
      />
      <KPICard
        title="Avg Doctrinal Score"
        value="82/100"
        icon={<TrendingUp className="h-5 w-5" />}
      />
      <KPICard
        title="Pending Reviews"
        value="3"
        icon={<AlertCircle className="h-5 w-5" />}
      />
    </div>
  );
}
