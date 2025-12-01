import { useNavigate } from "react-router-dom";
import { SmartHeader } from "@/components/SmartHeader";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { FeatureCard } from "@/components/landing/FeatureCard";
import { HowItWorksStep } from "@/components/landing/HowItWorksStep";
import { PricingCard } from "@/components/landing/PricingCard";
import { TrustBadge } from "@/components/landing/TrustBadge";
import { DoctrinalScorePreview } from "@/components/landing/DoctrinalScorePreview";
import { TrustSection } from "@/components/landing/TrustSection";
import heroLaptop from "@/assets/hero-laptop.png";
import { useEffect } from "react";
import { toast } from "sonner";
import { 
  Upload, 
  Search, 
  AlertTriangle, 
  BookOpen, 
  Brain,
  FileUp,
  ScanSearch,
  FileCheck,
  Shield,
  Lock,
  Users,
  Star,
  CheckCircle2,
  Youtube
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem("hasSeenWelcome");
    if (!hasSeenWelcome) {
      setTimeout(() => {
        toast("💡 Quick Tip", {
          description: "Press ⌘K (or Ctrl+K) to open the command palette and navigate quickly!",
          duration: 5000,
        });
        localStorage.setItem("hasSeenWelcome", "true");
      }, 2000);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-x-hidden">
      <SmartHeader />

      {/* Hero Section */}
      <main className="flex-1 w-full">
        <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="space-y-8">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
                Your AI Guardian Against False Doctrine
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                DoctrineShield detects misinterpretation, false teachings, spiritual manipulation, and doctrinal errors in sermons, books, videos, teachings, and counseling.
              </p>
              
              {/* Value Props */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Brain className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-foreground">AI-powered doctrinal audit</p>
                    <p className="text-sm text-muted-foreground">Advanced AI trained on biblical theology</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <BookOpen className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-foreground">80,000+ scriptural cross-references</p>
                    <p className="text-sm text-muted-foreground">Comprehensive biblical database</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-foreground">Detects false doctrine instantly</p>
                    <p className="text-sm text-muted-foreground">Real-time analysis and alerts</p>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  onClick={() => navigate("/analyzer")}
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-glow transition-all text-lg px-8 py-6"
                >
                  Start Doctrinal Scan
                </Button>
                <Button
                  onClick={() => navigate("/analyzer")}
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-6"
                >
                  See Live Demo
                </Button>
              </div>
            </div>

            {/* Right Column - Illustration */}
            <div className="flex items-center justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full"></div>
                <img
                  src={heroLaptop}
                  alt="DoctrineShield AI Analysis Platform detecting false doctrine in religious content"
                  className="relative w-full max-w-2xl h-auto animate-fade-in"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="bg-secondary/30 py-20 md:py-28">
          <div className="container mx-auto max-w-screen-xl px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
                Powerful Features for Doctrinal Analysis
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Everything you need to ensure theological soundness in your materials
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <FeatureCard
                icon={ScanSearch}
                title="Doctrinal Integrity Scanner"
                description="Flags false teachings, heresy risk, and manipulative doctrines with precision AI analysis trained on biblical theology."
              />
              <FeatureCard
                icon={BookOpen}
                title="Scripture-Based Corrections"
                description="Automated corrections with verse references from 80,000+ scriptural cross-references for accurate biblical guidance."
              />
              <FeatureCard
                icon={AlertTriangle}
                title="False Counsel Detection"
                description="Identifies problematic teachings in marriage, prosperity gospel, deliverance ministry, and prophetic advisories."
              />
              <FeatureCard
                icon={Upload}
                title="Universal Content Upload"
                description="Support for PDF, Word, audio transcripts, voice notes, YouTube links, and raw text. Upload anything."
              />
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div id="how-it-works" className="py-20 md:py-28">
          <div className="container mx-auto max-w-screen-xl px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
                How It Works
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Four simple steps to doctrinal clarity
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              <HowItWorksStep
                number={1}
                icon={FileUp}
                title="Upload Content"
                description="Upload sermons, books, videos, teachings, or counseling materials in any format."
              />
              <HowItWorksStep
                number={2}
                icon={ScanSearch}
                title="AI Doctrinal Scan"
                description="Our AI analyzes against 80,000+ scriptural references and theological patterns."
              />
              <HowItWorksStep
                number={3}
                icon={FileCheck}
                title="Receive Report"
                description="Get detailed report with integrity score, risk level, and flagged issues."
              />
              <HowItWorksStep
                number={4}
                icon={CheckCircle2}
                title="Share or Save"
                description="Download PDF reports, share findings, or archive for future reference."
              />
            </div>
          </div>
        </div>

        {/* Score Preview Section */}
        <div className="bg-secondary/30 py-20 md:py-28">
          <div className="container mx-auto max-w-screen-xl px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
                Comprehensive Doctrinal Analysis
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Get detailed insights with our AI-powered integrity scoring system
              </p>
            </div>
            <DoctrinalScorePreview />
          </div>
        </div>

        {/* Trust & Security Section */}
        <TrustSection />

        {/* Pricing Section */}
        <div className="bg-secondary/30 py-16 md:py-20">
          <div className="container mx-auto max-w-screen-xl px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Simple, Transparent Pricing
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                Choose the plan that fits your ministry needs
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <PricingCard
                name="Free"
                price="$0"
                description="Perfect for trying out DoctrineShield"
                features={[
                  "5 analyses per month",
                  "Basic doctrinal scanning",
                  "Standard reports (PDF)",
                  "Email support",
                  "Community access"
                ]}
                ctaText="Get Started"
                onCtaClick={() => navigate("/auth")}
              />
              <PricingCard
                name="Pro"
                price="$29"
                description="For pastors and ministry leaders"
                features={[
                  "Unlimited analyses",
                  "Advanced heresy detection",
                  "Detailed heatmap visualizations",
                  "Priority email support",
                  "API access",
                  "Batch processing",
                  "Custom report branding"
                ]}
                highlighted={true}
                ctaText="Start Free Trial"
                onCtaClick={() => navigate("/auth")}
              />
              <PricingCard
                name="Ministry"
                price="Custom"
                description="For churches and organizations"
                features={[
                  "Everything in Pro",
                  "Dedicated account manager",
                  "Custom model training",
                  "Team collaboration tools",
                  "SSO & advanced security",
                  "SLA guarantee",
                  "White-label options"
                ]}
                ctaText="Contact Sales"
                onCtaClick={() => navigate("/contact")}
              />
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="py-20 md:py-28">
          <div className="container mx-auto max-w-screen-xl px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
                Trusted by Ministry Leaders Worldwide
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Join 1,000+ pastors and ministry leaders protecting their congregations
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mb-16">
              <TrustBadge icon={Shield} text="Secure Upload" />
              <TrustBadge icon={Lock} text="Data Privacy Guaranteed" />
              <TrustBadge icon={Users} text="Used by 1,000+ Pastors" />
              <TrustBadge icon={Star} text="4.9/5 Average Rating" />
            </div>

            {/* Testimonials */}
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="bg-card border border-border rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-warning text-warning" />
                  ))}
                </div>
                <p className="text-muted-foreground italic mb-6 text-lg">
                  "DoctrineShield has been invaluable in helping us review teaching materials before 
                  distributing them to our congregation. The accuracy is remarkable."
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    JD
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Pastor John Davis</div>
                    <div className="text-sm text-muted-foreground">First Baptist Church</div>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-warning text-warning" />
                  ))}
                </div>
                <p className="text-muted-foreground italic mb-6 text-lg">
                  "As a seminary professor, I recommend DoctrineShield to all my students. 
                  It's an excellent tool for learning to identify subtle doctrinal errors."
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    SM
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Dr. Sarah Mitchell</div>
                    <div className="text-sm text-muted-foreground">Theological Seminary</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
