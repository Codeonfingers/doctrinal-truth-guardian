import { useState } from "react";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardTopBar } from "@/components/dashboard/DashboardTopBar";
import { Footer } from "@/components/Footer";

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  hideFooter?: boolean;
  hideSidebar?: boolean;
}

export function Layout({ children, title, hideFooter = false, hideSidebar = false }: LayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (hideSidebar) {
    return (
      <div className="min-h-screen w-full bg-background">
        <DashboardTopBar
          title={title}
          onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
        />
        <main className="pt-0">
          <div className="px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </div>
          {!hideFooter && <Footer />}
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - hidden on mobile by default, shown with overlay */}
      <div
        className={`fixed md:relative inset-y-0 left-0 z-50 md:z-auto transform transition-transform duration-300 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <DashboardSidebar
          collapsed={sidebarCollapsed}
          onToggle={() => {
            setSidebarCollapsed(!sidebarCollapsed);
            setMobileMenuOpen(false);
          }}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden w-full min-w-0">
        {/* Top Bar */}
        <DashboardTopBar
          title={title}
          onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
        />

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </div>
          {!hideFooter && <Footer />}
        </main>
      </div>
    </div>
  );
}
