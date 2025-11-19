import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PricingCard } from "@/components/landing/PricingCard";
import { TrustBadge } from "@/components/landing/TrustBadge";
import { Shield, Lock, Users, Star } from "lucide-react";

const Pricing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1 container mx-auto max-w-screen-xl px-4 sm:px-6 py-12 md:py-20">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground">Pricing Plans</h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Simple, transparent pricing for doctrinal analysis. Choose the plan that fits your ministry needs.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
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

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-foreground text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-2">What file formats do you support?</h3>
              <p className="text-muted-foreground">We support PDF, Word documents (.doc, .docx), and audio files (MP3, WAV). More formats coming soon.</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-2">How accurate is the analysis?</h3>
              <p className="text-muted-foreground">Our AI is trained on orthodox theological texts and achieves over 95% accuracy in detecting doctrinal deviations. However, human review is always recommended for final decisions.</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-2">Can I cancel my subscription anytime?</h3>
              <p className="text-muted-foreground">Yes, you can cancel your subscription at any time. Your access will continue until the end of your billing period.</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-2">Is my data secure?</h3>
              <p className="text-muted-foreground">Absolutely. We use enterprise-grade encryption and never share your uploaded documents with third parties. Your data is yours.</p>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="text-center">
          <div className="flex flex-wrap justify-center gap-4">
            <TrustBadge icon={Shield} text="Secure Upload" />
            <TrustBadge icon={Lock} text="Data Privacy Guaranteed" />
            <TrustBadge icon={Users} text="Used by 1,000+ Pastors" />
            <TrustBadge icon={Star} text="4.9/5 Average Rating" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
