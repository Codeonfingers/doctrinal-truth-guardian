import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield } from "lucide-react";
import { FileUpload } from "@/components/FileUpload";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();

  const handleFileSelect = (file: File) => {
    navigate("/dashboard", { state: { fileName: file.name } });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold">DoctrineShield™</span>
          </div>
          <nav className="flex items-center space-x-2">
            <Button variant="ghost" onClick={() => navigate("/about")}>About</Button>
            <Button variant="ghost" onClick={() => navigate("/contact")}>Contact</Button>
            <Button onClick={() => navigate("/auth")}>Sign In</Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-hero text-white">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px_32px]" />
        <div className="container relative mx-auto px-4 py-16 md:py-24">
          <div className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center shadow-glow">
              <Shield className="w-10 h-10" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              DoctrineShield™
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-light">
              The Autonomous Spiritual Intelligence Engine
            </p>
            <p className="text-lg text-white/80 max-w-2xl">
              AI-powered doctrinal discernment platform that analyzes Christian materials
              to detect theological deviations and produce integrity scores.
            </p>
          </div>
        </div>
      </div>

      {/* Upload Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-8 animate-slide-up">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">Upload for Analysis</h2>
            <p className="text-muted-foreground">
              Upload books, sermons, or articles for comprehensive doctrinal review
            </p>
          </div>
          
          <FileUpload onFileSelect={handleFileSelect} />

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <div className="p-6 rounded-lg bg-card border shadow-sm">
              <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-success" />
              </div>
              <h3 className="font-semibold mb-2">Heresy Detection</h3>
              <p className="text-sm text-muted-foreground">
                Identify theological deviations including universalism, denial of Christ's divinity, and more
              </p>
            </div>
            <div className="p-6 rounded-lg bg-card border shadow-sm">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Scripture Validation</h3>
              <p className="text-sm text-muted-foreground">
                Verify biblical quotes are contextually accurate and not twisted
              </p>
            </div>
            <div className="p-6 rounded-lg bg-card border shadow-sm">
              <div className="w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-warning" />
              </div>
              <h3 className="font-semibold mb-2">Tone Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Detect manipulative rhetoric including fear, pride, or flattery tactics
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
