import { useState } from "react";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardTopBar } from "@/components/dashboard/DashboardTopBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Database } from "lucide-react";

export default function DatasetScreening() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <DashboardSidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardTopBar title="Dataset Screening" />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-screen-xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Dataset Screening
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Dataset screening functionality coming soon.</p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
