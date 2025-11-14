import { useState } from "react";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardTopBar } from "@/components/dashboard/DashboardTopBar";
import { KPIStrip } from "@/components/dashboard/KPIStrip";
import { RecentAnalysesTable } from "@/components/dashboard/RecentAnalysesTable";
import { HeatmapCard } from "@/components/dashboard/HeatmapCard";
import { ModelHealthCard } from "@/components/dashboard/ModelHealthCard";
import { DatasetScreeningCard } from "@/components/dashboard/DatasetScreeningCard";
import { HeresieTrendsCard } from "@/components/dashboard/HeresieTrendsCard";
import { ReportSlideOver } from "@/components/dashboard/ReportSlideOver";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { Footer } from "@/components/Footer";

export default function Dashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedAnalysis, setSelectedAnalysis] = useState<any>(null);
  const [slideOverOpen, setSlideOverOpen] = useState(false);

  const handleViewDetails = (analysis: any) => {
    setSelectedAnalysis(analysis);
    setSlideOverOpen(true);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Sidebar */}
      <DashboardSidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <DashboardTopBar title="Dashboard" />

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-screen-xl mx-auto p-6 space-y-6">
            {/* KPI Strip */}
            <KPIStrip />

            {/* Main Grid */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Left Column - Recent Analyses (2/3) */}
              <div className="lg:col-span-2">
                <RecentAnalysesTable onViewDetails={handleViewDetails} />
              </div>

              {/* Right Column - Widgets (1/3) */}
              <div className="space-y-6">
                <HeatmapCard />
                <HeresieTrendsCard />
                <ModelHealthCard />
                <DatasetScreeningCard />
              </div>
            </div>

            {/* Activity Feed */}
            <ActivityFeed />
          </div>

          {/* Footer */}
          <Footer />
        </main>
      </div>

      {/* Slide-over Report Viewer */}
      <ReportSlideOver
        isOpen={slideOverOpen}
        onClose={() => setSlideOverOpen(false)}
        analysis={selectedAnalysis}
      />
    </div>
  );
}
