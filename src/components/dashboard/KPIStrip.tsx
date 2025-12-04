import { Card, CardContent } from "@/components/ui/card";
import { FileText, AlertTriangle, ClipboardList, Mic } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    positive: boolean;
  };
  iconBgClass?: string;
  iconTextClass?: string;
}

function KPICard({ title, value, icon, trend, iconBgClass = "bg-primary/10", iconTextClass = "text-primary" }: KPICardProps) {
  return (
    <Card className="hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-3">
          <div className={`h-12 w-12 rounded-xl ${iconBgClass} flex items-center justify-center ${iconTextClass}`}>
            {icon}
          </div>
          {trend && (
            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
              trend.positive 
                ? 'bg-success/10 text-success' 
                : 'bg-destructive/10 text-destructive'
            }`}>
              {trend.positive ? '+' : ''}{trend.value}%
            </span>
          )}
        </div>
        <div className="space-y-1">
          <p className="text-3xl font-bold text-foreground tracking-tight">{value}</p>
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export function KPIStrip() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <KPICard
        title="Total Scans"
        value="1,248"
        icon={<FileText className="h-6 w-6" />}
        trend={{ value: 12, positive: true }}
        iconBgClass="bg-primary/10"
        iconTextClass="text-primary"
      />
      <KPICard
        title="High-Risk Findings"
        value="47"
        icon={<AlertTriangle className="h-6 w-6" />}
        trend={{ value: 8, positive: false }}
        iconBgClass="bg-destructive/10"
        iconTextClass="text-destructive"
      />
      <KPICard
        title="Reports Generated"
        value="326"
        icon={<ClipboardList className="h-6 w-6" />}
        trend={{ value: 24, positive: true }}
        iconBgClass="bg-success/10"
        iconTextClass="text-success"
      />
      <KPICard
        title="Audio Uploads"
        value="89"
        icon={<Mic className="h-6 w-6" />}
        trend={{ value: 15, positive: true }}
        iconBgClass="bg-warning/10"
        iconTextClass="text-warning-foreground"
      />
    </div>
  );
}
