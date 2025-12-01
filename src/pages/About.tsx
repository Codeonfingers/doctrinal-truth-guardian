import { Shield, Target, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { SmartHeader } from "@/components/SmartHeader";
import { Footer } from "@/components/Footer";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <SmartHeader />

      {/* Hero Section */}
      <section className="bg-gradient-hero text-white py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
            About DoctrineShield™
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto animate-slide-up">
            Empowering believers with AI-driven doctrinal discernment
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="max-w-5xl mx-auto space-y-16">
          <div className="text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Our Mission</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              DoctrineShield™ is dedicated to protecting biblical truth in an era of theological confusion. 
              We leverage advanced AI technology to help believers discern sound doctrine from harmful teachings.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
            <div className="p-6 md:p-8 rounded-xl bg-card border border-border shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold mb-3">Precision Analysis</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our AI engine analyzes Christian materials with precision, detecting subtle theological 
                deviations and producing comprehensive integrity scores.
              </p>
            </div>

            <div className="p-6 md:p-8 rounded-xl bg-card border border-border shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="w-14 h-14 rounded-full bg-success/10 flex items-center justify-center mb-6">
                <Shield className="w-7 h-7 text-success" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold mb-3">Biblical Foundation</h3>
              <p className="text-muted-foreground leading-relaxed">
                Every assessment is rooted in orthodox Christian theology, comparing teachings against 
                established biblical standards and historical church doctrine.
              </p>
            </div>

            <div className="p-6 md:p-8 rounded-xl bg-card border border-border shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="w-14 h-14 rounded-full bg-warning/10 flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-warning-foreground" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold mb-3">Community Protection</h3>
              <p className="text-muted-foreground leading-relaxed">
                We help churches, ministries, and individual believers identify potentially harmful 
                teachings before they can damage faith communities.
              </p>
            </div>

            <div className="p-6 md:p-8 rounded-xl bg-card border border-border shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                <Award className="w-7 h-7 text-accent-foreground" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold mb-3">Trusted Technology</h3>
              <p className="text-muted-foreground leading-relaxed">
                Built by a team of theologians and AI experts, DoctrineShield™ combines cutting-edge 
                technology with deep theological understanding.
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center p-8 md:p-12 rounded-2xl bg-gradient-card border border-border shadow-lg">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to Protect Your Faith?</h3>
            <p className="text-muted-foreground mb-8 text-lg max-w-xl mx-auto">
              Start analyzing Christian materials today with DoctrineShield™
            </p>
            <Button size="lg" onClick={() => navigate("/")} className="shadow-md">
              Get Started
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
