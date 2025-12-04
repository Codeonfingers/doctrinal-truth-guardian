import { useState } from "react";
import { Layout } from "@/components/Layout";
import { KPIStrip } from "@/components/dashboard/KPIStrip";
import { ScreeningQueueTable } from "@/components/dashboard/ScreeningQueueTable";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { GlobalSearch } from "@/components/dashboard/GlobalSearch";
import { FilterChips } from "@/components/dashboard/FilterChips";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { ReportSlideOver } from "@/components/dashboard/ReportSlideOver";
import { WorkspaceSwitcher } from "@/components/dashboard/WorkspaceSwitcher";
import { RoleBadge } from "@/components/dashboard/RoleBadge";
import { InviteModal } from "@/components/dashboard/InviteModal";

export default function Dashboard() {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [slideOverOpen, setSlideOverOpen] = useState(false);

  const handleViewDetails = (item: any) => {
    setSelectedItem(item);
    setSlideOverOpen(true);
  };

  return (
    <Layout title="Dashboard">
      <div className="max-w-screen-2xl mx-auto p-4 md:p-6 lg:p-8 space-y-6">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <WorkspaceSwitcher />
            <RoleBadge role="admin" />
          </div>
          <div className="flex items-center gap-3">
            <InviteModal />
          </div>
        </div>

        {/* Quick Actions */}
        <QuickActions />

        {/* KPI Cards */}
        <KPIStrip />

        {/* Search & Filters */}
        <div className="space-y-4">
          <GlobalSearch />
          <FilterChips />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Screening Queue - Takes 2 columns on large screens */}
          <div className="lg:col-span-2">
            <ScreeningQueueTable onViewDetails={handleViewDetails} />
          </div>

          {/* Activity Timeline */}
          <div className="lg:col-span-1">
            <ActivityFeed />
          </div>
        </div>
      </div>

      {/* Slide-over Report Viewer */}
      <ReportSlideOver
        isOpen={slideOverOpen}
        onClose={() => setSlideOverOpen(false)}
        analysis={selectedItem}
      />
    </Layout>
  );
}
