import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { FeatureCard } from "@/components/landing/FeatureCard";
import { HowItWorksStep } from "@/components/landing/HowItWorksStep";
import { PricingCard } from "@/components/landing/PricingCard";
import { TrustBadge } from "@/components/landing/TrustBadge";
import heroLaptop from "@/assets/hero-laptop.png";
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
  Star
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-x-hidden">
      <Header />

      {/* Hero Section */}
      <main className="flex-1 w-full">
        <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 py-12 md:py-20">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="space-y-6 md:space-y-8">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
                Guard Against False Doctrine in Religious Content
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground max-w-md leading-relaxed">
                Upload your material and receive a thorough analysis to ensure doctrinal accuracy and integrity.
              </p>
              
              {/* Value Props */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm sm:text-base">
                  <Brain className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-foreground font-medium">AI-powered doctrinal audit</span>
                </div>
                <div className="flex items-center gap-2 text-sm sm:text-base">
                  <BookOpen className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-foreground font-medium">80,000+ scriptural cross-references analyzed</span>
                </div>
                <div className="flex items-center gap-2 text-sm sm:text-base">
                  <AlertTriangle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-foreground font-medium">Detects false doctrine instantly</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
                <Button
                  onClick={() => navigate("/analyzer")}
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-glow transition-all text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6"
                >
                  Start Analysis
                </Button>
                <Button
                  onClick={() => navigate("/pricing")}
                  variant="outline"
                  size="lg"
                  className="text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6"
                >
                  View Pricing
                </Button>
              </div>
            </div>

            {/* Right Column - Illustration */}
            <div className="flex items-center justify-center">
              <img
                src={heroLaptop}
                alt="DoctrineShield Analysis Platform"
                className="w-full max-w-2xl h-auto animate-fade-in"
              />
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-secondary/30 py-16 md:py-20">
          <div className="container mx-auto max-w-screen-xl px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Powerful Features for Doctrinal Analysis
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                Everything you need to ensure theological soundness in your materials
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <FeatureCard
                icon={Upload}
                title="Upload Documents"
                description="Support for PDF, Word documents, and audio files. Simply drag and drop to begin analysis."
              />
              <FeatureCard
                icon={ScanSearch}
                title="Instant Doctrinal Scan"
                description="Advanced AI engine analyzes your content against biblical doctrine in seconds."
              />
              <FeatureCard
                icon={AlertTriangle}
                title="Heresy Risk Meter"
                description="Color-coded severity ratings help you quickly identify areas of concern."
              />
              <FeatureCard
                icon={BookOpen}
                title="Scripture-based Corrections"
                description="Receive suggested corrections backed by relevant Bible passages and references."
              />
              <FeatureCard
                icon={Brain}
                title="AI-Powered Analysis"
                description="Leverages cutting-edge machine learning trained on orthodox theological texts."
              />
              <FeatureCard
                icon={FileCheck}
                title="Comprehensive Reports"
                description="Download detailed PDF reports with heatmaps, flagged issues, and recommendations."
              />
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="py-16 md:py-20">
          <div className="container mx-auto max-w-screen-xl px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                How It Works
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                Three simple steps to doctrinal clarity
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12 md:gap-8 max-w-5xl mx-auto">
              <HowItWorksStep
                number={1}
                icon={FileUp}
                title="Upload"
                description="Upload your document, book, sermon, or teaching material in any supported format."
              />
              <HowItWorksStep
                number={2}
                icon={ScanSearch}
                title="Analyze"
                description="Our AI engine scans your content against scriptural truth and orthodox doctrine."
              />
              <HowItWorksStep
                number={3}
                icon={FileCheck}
                title="Receive Report"
                description="Get a comprehensive report with integrity score, flagged issues, and corrections."
              />
            </div>
          </div>
        </div>

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

        {/* Trust & Credibility Section */}
        <div className="py-16 md:py-20">
          <div className="container mx-auto max-w-screen-xl px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Trusted by Ministry Leaders Worldwide
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                Your security and privacy are our top priorities
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <TrustBadge icon={Shield} text="Secure Upload" />
              <TrustBadge icon={Lock} text="Data Privacy Guaranteed" />
              <TrustBadge icon={Users} text="Used by 1,000+ Pastors" />
              <TrustBadge icon={Star} text="4.9/5 Average Rating" />
            </div>

            {/* Testimonials */}
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
                <p className="text-muted-foreground italic mb-4">
                  "DoctrineShield has been invaluable in helping us review teaching materials before 
                  distributing them to our congregation. The accuracy is remarkable."
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    JD
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Pastor John Davis</div>
                    <div className="text-sm text-muted-foreground">First Baptist Church</div>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
                <p className="text-muted-foreground italic mb-4">
                  "As a seminary professor, I recommend DoctrineShield to all my students. 
                  It's an excellent tool for learning to identify subtle doctrinal errors."
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
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
