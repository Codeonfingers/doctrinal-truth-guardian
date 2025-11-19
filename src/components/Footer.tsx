import { Shield, Mail, Twitter, Facebook, Linkedin } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto max-w-screen-xl px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Column 1: Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-primary-foreground">
                <Shield className="h-4 w-4 text-primary" />
              </div>
              <span className="text-lg font-bold">DoctrineShield</span>
            </div>
            <p className="text-sm text-primary-foreground/80">
              Your AI guardian against false doctrine. Protecting theological integrity through advanced AI analysis.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <div className="flex flex-col gap-2 text-sm">
              <button onClick={() => navigate("/")} className="hover:text-primary-foreground/80 transition-colors text-left">
                Home
              </button>
              <button onClick={() => navigate("/#features")} className="hover:text-primary-foreground/80 transition-colors text-left">
                Features
              </button>
              <button onClick={() => navigate("/pricing")} className="hover:text-primary-foreground/80 transition-colors text-left">
                Pricing
              </button>
              <button onClick={() => navigate("/contact")} className="hover:text-primary-foreground/80 transition-colors text-left">
                Contact
              </button>
            </div>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <div className="flex flex-col gap-2 text-sm">
              <a href="/privacy" className="hover:text-primary-foreground/80 transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="hover:text-primary-foreground/80 transition-colors">
                Terms of Service
              </a>
              <a href="/data-protection" className="hover:text-primary-foreground/80 transition-colors">
                Data Protection
              </a>
            </div>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <div className="flex flex-col gap-3 text-sm">
              <a href="mailto:support@doctrineshield.com" className="flex items-center gap-2 hover:text-primary-foreground/80 transition-colors">
                <Mail className="h-4 w-4" />
                support@doctrineshield.com
              </a>
              <div className="flex gap-3 mt-2">
                <a href="#" className="hover:text-primary-foreground/80 transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="hover:text-primary-foreground/80 transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="hover:text-primary-foreground/80 transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 pt-6 text-center">
          <p className="text-sm text-primary-foreground/80">
            © 2025 DoctrineShield™ — Guarding the Truth. Unmasking the Lie.
          </p>
        </div>
      </div>
    </footer>
  );
}
