import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Shield, Menu, X, Moon, Sun, Search, Building2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function SmartHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Dashboard", path: "/dashboard" },
    { label: "Chat", path: "/chat" },
    { label: "Reports", path: "/reports" },
    { label: "Admin", path: "/admin" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Smart Sticky Header */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300",
          scrolled
            ? "h-14 bg-background/95 backdrop-blur-lg shadow-md border-b border-border/50"
            : "h-16 bg-background border-b border-border"
        )}
      >
        <div className="h-full w-full max-w-screen-2xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo (Left) */}
          <div
            className={cn(
              "flex items-center gap-2 cursor-pointer transition-all duration-300 shrink-0",
              scrolled ? "scale-95" : "scale-100"
            )}
            onClick={() => navigate("/")}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground hidden sm:inline">
              DoctrineShield
            </span>
          </div>

          {/* Center Menu (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Button
                key={item.path}
                variant="ghost"
                size="sm"
                onClick={() => navigate(item.path)}
                className={cn(
                  "text-sm font-medium transition-colors duration-200 px-4",
                  isActive(item.path)
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                {item.label}
              </Button>
            ))}
          </nav>

          {/* Right Section (Desktop) */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Global Search */}
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="pl-10 h-9 bg-secondary/50 border-border text-sm"
                onClick={() => {
                  const event = new KeyboardEvent("keydown", {
                    key: "k",
                    metaKey: true,
                    bubbles: true,
                  });
                  document.dispatchEvent(event);
                }}
                readOnly
              />
              <kbd className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                <span className="text-xs">⌘</span>K
              </kbd>
            </div>

            {/* Workspace Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 h-9">
                  <Building2 className="h-4 w-4" />
                  <span className="hidden xl:inline">Workspace</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>My Workspace</DropdownMenuItem>
                <DropdownMenuItem>Church Ministry</DropdownMenuItem>
                <DropdownMenuItem>Theology Team</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Create Workspace</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Role Badge */}
            <Badge variant="secondary" className="bg-primary/10 text-primary border-0 h-7">
              Admin
            </Badge>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full h-9 w-9"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                      U
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/auth")}>
                  Profile Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/auth")}>
                  Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* CTA Button */}
            <Button
              onClick={() => navigate("/chat")}
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm h-9"
            >
              Start Analysis
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full h-9 w-9"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className="h-9 w-9"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 lg:hidden",
          mobileMenuOpen ? "block" : "hidden"
        )}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Sidebar */}
        <div
          className={cn(
            "absolute right-0 top-0 h-full w-72 border-l border-border bg-card shadow-2xl transition-transform duration-300 ease-in-out",
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="p-4 border-b border-border flex items-center justify-between">
            <span className="font-semibold text-foreground">Menu</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(false)}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <nav className="flex flex-col gap-1 p-4">
            {navItems.map((item) => (
              <Button
                key={item.path}
                variant={isActive(item.path) ? "secondary" : "ghost"}
                onClick={() => {
                  navigate(item.path);
                  setMobileMenuOpen(false);
                }}
                className="justify-start h-11"
              >
                {item.label}
              </Button>
            ))}

            <div className="mt-4 pt-4 border-t border-border space-y-3">
              {/* Workspace Switcher Mobile */}
              <div className="flex items-center justify-between px-3 py-2 bg-secondary/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">My Workspace</span>
                </div>
                <Badge variant="secondary" className="bg-primary/10 text-primary border-0 text-xs">
                  Admin
                </Badge>
              </div>

              <Button
                variant="outline"
                onClick={() => {
                  navigate("/auth");
                  setMobileMenuOpen(false);
                }}
                className="w-full h-11"
              >
                Login
              </Button>
              <Button
                onClick={() => {
                  navigate("/chat");
                  setMobileMenuOpen(false);
                }}
                className="w-full bg-primary text-primary-foreground h-11 shadow-sm"
              >
                Start Analysis
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
