import { Shield, Target, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold">DoctrineShield™</span>
          </div>
          <Button onClick={() => navigate("/")}>Back to Home</Button>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-hero text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About DoctrineShield™</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Empowering believers with AI-driven doctrinal discernment
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Our Mission</h2>
            <p className="text-lg text-muted-foreground">
              DoctrineShield™ is dedicated to protecting biblical truth in an era of theological confusion. 
              We leverage advanced AI technology to help believers discern sound doctrine from harmful teachings.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="p-6 rounded-lg bg-card border shadow-sm">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Precision Analysis</h3>
              <p className="text-muted-foreground">
                Our AI engine analyzes Christian materials with precision, detecting subtle theological 
                deviations and producing comprehensive integrity scores.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-card border shadow-sm">
              <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-success" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Biblical Foundation</h3>
              <p className="text-muted-foreground">
                Every assessment is rooted in orthodox Christian theology, comparing teachings against 
                established biblical standards and historical church doctrine.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-card border shadow-sm">
              <div className="w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-warning" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community Protection</h3>
              <p className="text-muted-foreground">
                We help churches, ministries, and individual believers identify potentially harmful 
                teachings before they can damage faith communities.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-card border shadow-sm">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Trusted Technology</h3>
              <p className="text-muted-foreground">
                Built by a team of theologians and AI experts, DoctrineShield™ combines cutting-edge 
                technology with deep theological understanding.
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16 p-8 rounded-lg bg-gradient-card border">
            <h3 className="text-2xl font-bold mb-4">Ready to Protect Your Faith?</h3>
            <p className="text-muted-foreground mb-6">
              Start analyzing Christian materials today with DoctrineShield™
            </p>
            <Button size="lg" onClick={() => navigate("/")}>
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
