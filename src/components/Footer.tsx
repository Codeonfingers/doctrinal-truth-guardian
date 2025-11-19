import { Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-card border-t border-border py-8 mt-auto">
      <div className="container mx-auto max-w-screen-xl px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <span className="text-sm text-muted-foreground">
              © 2025 DoctrineShield™ — Guarding the Truth. Unmasking the Lie.
            </span>
          </div>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <button
              onClick={() => navigate("/about")}
              className="hover:text-foreground transition-colors"
            >
              About
            </button>
            <button
              onClick={() => navigate("/contact")}
              className="hover:text-foreground transition-colors"
            >
              Contact
            </button>
            <a href="/privacy" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="/terms" className="hover:text-foreground transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
