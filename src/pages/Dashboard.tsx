import { useState } from "react";
import { Layout } from "@/components/Layout";
import { KPIStrip } from "@/components/dashboard/KPIStrip";
import { RecentAnalysesTable } from "@/components/dashboard/RecentAnalysesTable";
import { HeatmapCard } from "@/components/dashboard/HeatmapCard";
import { ModelHealthCard } from "@/components/dashboard/ModelHealthCard";
import { DatasetScreeningCard } from "@/components/dashboard/DatasetScreeningCard";
import { HeresieTrendsCard } from "@/components/dashboard/HeresieTrendsCard";
import { ReportSlideOver } from "@/components/dashboard/ReportSlideOver";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { WorkspaceSwitcher } from "@/components/dashboard/WorkspaceSwitcher";
import { RoleBadge } from "@/components/dashboard/RoleBadge";
import { InviteModal } from "@/components/dashboard/InviteModal";
import { GlobalSearch } from "@/components/dashboard/GlobalSearch";

export default function Dashboard() {
  const [selectedAnalysis, setSelectedAnalysis] = useState<any>(null);
  const [slideOverOpen, setSlideOverOpen] = useState(false);

  const handleViewDetails = (analysis: any) => {
    setSelectedAnalysis(analysis);
    setSlideOverOpen(true);
  };

  return (
    <Layout title="Dashboard">
      <div className="max-w-screen-xl mx-auto p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8">
        {/* Workspace Controls & Search */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <WorkspaceSwitcher />
              <RoleBadge role="admin" />
            </div>
            <InviteModal />
          </div>
          <GlobalSearch />
        </div>
        {/* KPI Strip */}
        <KPIStrip />

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
          {/* Left Column - Recent Analyses (2/3) */}
          <div className="lg:col-span-2">
            <RecentAnalysesTable onViewDetails={handleViewDetails} />
          </div>

          {/* Right Column - Widgets (1/3) */}
          <div className="space-y-6 md:space-y-8">
            <HeatmapCard />
            <HeresieTrendsCard />
            <ModelHealthCard />
            <DatasetScreeningCard />
          </div>
        </div>

        {/* Activity Feed */}
        <ActivityFeed />
      </div>

      {/* Slide-over Report Viewer */}
      <ReportSlideOver
        isOpen={slideOverOpen}
        onClose={() => setSlideOverOpen(false)}
        analysis={selectedAnalysis}
      />
    </Layout>
  );
}
