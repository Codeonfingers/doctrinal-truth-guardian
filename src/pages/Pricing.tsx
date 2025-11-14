import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const Pricing = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto max-w-screen-xl px-6 py-20">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">Pricing</h1>
          <p className="text-lg text-muted-foreground">
            Simple, transparent pricing for doctrinal analysis.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
