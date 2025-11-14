import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Database, Play } from "lucide-react";

export function DatasetScreeningCard() {
  const integrityScore = 96.3;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Database className="h-4 w-4" />
          Dataset Screening
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Integrity Score</span>
            <span className="font-bold text-foreground">{integrityScore}%</span>
          </div>
          <Progress value={integrityScore} className="h-2" />
        </div>

        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Last Scan</span>
            <span className="font-medium">3 hours ago</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Items Checked</span>
            <span className="font-medium">12,487</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Flagged</span>
            <span className="font-medium text-warning-foreground">23</span>
          </div>
        </div>

        <Button size="sm" variant="outline" className="w-full">
          <Play className="h-4 w-4 mr-2" />
          Scan Dataset
        </Button>
      </CardContent>
    </Card>
  );
}
