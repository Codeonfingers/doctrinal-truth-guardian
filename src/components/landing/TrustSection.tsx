import { Shield, Lock, Brain, Users } from "lucide-react";

const trustItems = [
  {
    icon: Shield,
    title: "Secure Upload",
    description: "Your data is never stored permanently",
  },
  {
    icon: Users,
    title: "Built by Experts",
    description: "Theology experts & ministry leaders",
  },
  {
    icon: Brain,
    title: "AI-Trained",
    description: "100k+ doctrinal patterns analyzed",
  },
  {
    icon: Lock,
    title: "100% Private",
    description: "Encrypted platform & secure processing",
  },
];

export function TrustSection() {
  return (
    <div className="bg-secondary/30 py-16 md:py-20">
      <div className="container mx-auto max-w-screen-xl px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Trusted & Secure
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Your security and privacy are our highest priorities
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-card border border-border rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
