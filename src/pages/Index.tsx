import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import heroLaptop from "@/assets/hero-laptop.png";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-x-hidden">
      <Header />

      {/* Hero Section */}
      <main className="flex-1 w-full">
        <div className="container mx-auto max-w-screen-xl px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="space-y-8">
              <h1 className="text-5xl lg:text-6xl font-extrabold text-foreground leading-tight tracking-tight">
                Guard Against False Doctrine in Religious Content
              </h1>
              <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
                Upload your material and receive a thorough analysis to ensure doctrinal accuracy and integrity.
              </p>
              <button
                onClick={() => navigate("/chat")}
                className="px-8 py-4 bg-primary text-primary-foreground rounded-lg text-lg font-semibold hover:bg-primary/90 transition-colors shadow-md"
              >
                Upload Content
              </button>
            </div>

            {/* Right Column - Illustration */}
            <div className="flex items-center justify-center">
              <img
                src={heroLaptop}
                alt="DoctrineShield Analysis Platform"
                className="w-full max-w-2xl h-auto"
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
