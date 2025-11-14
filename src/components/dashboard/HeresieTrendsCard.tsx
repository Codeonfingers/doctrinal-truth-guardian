import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

const mockTrends = [
  { pattern: "Works-based Salvation", count: 12, trend: "up" },
  { pattern: "Prosperity Gospel", count: 8, trend: "down" },
  { pattern: "Universalism", count: 5, trend: "up" },
  { pattern: "Modalism", count: 3, trend: "stable" },
  { pattern: "Pelagianism", count: 2, trend: "down" },
];

export function HeresieTrendsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <TrendingUp className="h-4 w-4" />
          Heresy Pattern Trends
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {mockTrends.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{item.pattern}</p>
                <p className="text-xs text-muted-foreground">{item.count} detections</p>
              </div>
              <div className="flex items-center gap-2">
                <div className={`text-xs font-medium ${
                  item.trend === 'up' ? 'text-destructive' : 
                  item.trend === 'down' ? 'text-success' : 
                  'text-muted-foreground'
                }`}>
                  {item.trend === 'up' ? '↑' : item.trend === 'down' ? '↓' : '→'}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 h-24 bg-muted/30 rounded-lg flex items-center justify-center">
          <span className="text-xs text-muted-foreground">Trend Chart</span>
        </div>
      </CardContent>
    </Card>
  );
}
