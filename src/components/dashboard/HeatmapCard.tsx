import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, XCircle, Info } from "lucide-react";

const mockFlags = [
  { severity: "high", text: "Works-based salvation implied", line: 24 },
  { severity: "medium", text: "Unclear Christology", line: 45 },
  { severity: "low", text: "Vague eschatology reference", line: 67 },
];

export function HeatmapCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Deception Heatmap</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="h-32 bg-gradient-to-r from-success/20 via-warning/30 to-destructive/40 rounded-lg relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-medium text-muted-foreground">Visual Heatmap</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">Top Flags:</p>
            {mockFlags.map((flag, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs">
                {flag.severity === "high" && <XCircle className="h-3 w-3 text-destructive mt-0.5" />}
                {flag.severity === "medium" && <AlertTriangle className="h-3 w-3 text-warning-foreground mt-0.5" />}
                {flag.severity === "low" && <Info className="h-3 w-3 text-muted-foreground mt-0.5" />}
                <div className="flex-1">
                  <p className="text-foreground">{flag.text}</p>
                  <p className="text-muted-foreground">Line {flag.line}</p>
                </div>
              </div>
            ))}
          </div>

          <Button variant="outline" size="sm" className="w-full mt-2">
            View Full Heatmap
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
