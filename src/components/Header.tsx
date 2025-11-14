import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Header() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Analyzer", path: "/chat" },
    { label: "Pricing", path: "/pricing" },
  ];

  return (
    <>
      {/* Fixed Header */}
      <header className="w-full bg-background border-b border-border/10">
        <div className="container mx-auto flex h-20 max-w-screen-xl items-center justify-between px-6">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-foreground">DoctrineShield</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="text-base font-medium text-primary hover:text-primary/80 transition-colors"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => navigate("/auth")}
              className="text-base font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Sign In
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <div
        className={cn(
          "fixed inset-0 z-40 md:hidden",
          mobileMenuOpen ? "block" : "hidden"
        )}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
        
        {/* Sidebar */}
        <div
          className={cn(
            "absolute right-0 top-16 h-[calc(100vh-4rem)] w-64 border-l border-border bg-card p-4 shadow-lg transition-transform duration-300 ease-in-out",
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Button
                key={item.path}
                variant="ghost"
                onClick={() => {
                  navigate(item.path);
                  setMobileMenuOpen(false);
                }}
                className="justify-start text-sm font-medium"
              >
                {item.label}
              </Button>
            ))}
            <Button
              onClick={() => {
                navigate("/auth");
                setMobileMenuOpen(false);
              }}
              className="justify-start mt-4"
            >
              Sign In
            </Button>
          </nav>
        </div>
      </div>
    </>
  );
}
