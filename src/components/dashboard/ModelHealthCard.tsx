import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Activity } from "lucide-react";

export function ModelHealthCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Model Health</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Model</span>
            <Badge variant="outline" className="bg-success/10 text-success border-success/20">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              Active
            </Badge>
          </div>
          <p className="text-sm font-medium">DoctrineGuard v2.5</p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Dataset Purity</span>
            <span className="font-medium text-foreground">98.7%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-success" style={{ width: '98.7%' }} />
          </div>
        </div>

        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Version</span>
            <span className="font-medium">2.5.1</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Last Retrain</span>
            <span className="font-medium">2 days ago</span>
          </div>
        </div>

        <Button size="sm" className="w-full">
          <Activity className="h-4 w-4 mr-2" />
          Deploy Update
        </Button>
      </CardContent>
    </Card>
  );
}
