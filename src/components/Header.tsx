import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Menu, X, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";

export function Header() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Features", path: "/#features" },
    { label: "How It Works", path: "/#how-it-works" },
    { label: "Pricing", path: "/pricing" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <>
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border shadow-sm">
        <div className="container mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo (Left) */}
           <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground hidden sm:inline">DoctrineShield</span>
          </div>

          {/* Center Menu (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => {
                  if (item.path.startsWith("/#")) {
                    navigate("/");
                    setTimeout(() => {
                      const id = item.path.substring(2);
                      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
                    }, 100);
                  } else {
                    navigate(item.path);
                  }
                }}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right CTAs (Desktop) */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate("/auth")}
              className="font-medium"
            >
              Login
            </Button>
            <Button
              onClick={() => navigate("/analyzer")}
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md font-medium"
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
              className="rounded-full"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
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
          <div className="p-6 border-b border-border flex items-center justify-between">
            <span className="font-semibold text-foreground text-lg">Menu</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <nav className="flex flex-col gap-2 p-6">
            {navItems.map((item) => (
              <Button
                key={item.path}
                variant="ghost"
                onClick={() => {
                  if (item.path.startsWith("/#")) {
                    navigate("/");
                    setMobileMenuOpen(false);
                    setTimeout(() => {
                      const id = item.path.substring(2);
                      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
                    }, 100);
                  } else {
                    navigate(item.path);
                    setMobileMenuOpen(false);
                  }
                }}
                className="justify-start text-base h-12"
              >
                {item.label}
              </Button>
            ))}
            
            <div className="mt-6 space-y-3">
              <Button
                variant="outline"
                onClick={() => {
                  navigate("/auth");
                  setMobileMenuOpen(false);
                }}
                className="w-full h-12 text-base"
              >
                Login
              </Button>
              <Button
                onClick={() => {
                  navigate("/analyzer");
                  setMobileMenuOpen(false);
                }}
                className="w-full bg-primary text-primary-foreground h-12 text-base shadow-md"
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
