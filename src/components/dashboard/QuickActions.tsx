import { Button } from "@/components/ui/button";
import { Upload, Scan, Plus } from "lucide-react";

export function QuickActions() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button className="gap-2 shadow-sm">
        <Upload className="h-4 w-4" />
        Upload Document
      </Button>
      <Button variant="secondary" className="gap-2">
        <Scan className="h-4 w-4" />
        Start Scan
      </Button>
      <Button variant="outline" className="gap-2">
        <Plus className="h-4 w-4" />
        New Report
      </Button>
    </div>
  );
}
