import { LucideIcon } from "lucide-react";

interface HowItWorksStepProps {
  number: number;
  icon: LucideIcon;
  title: string;
  description: string;
}

export function HowItWorksStep({ number, icon: Icon, title, description }: HowItWorksStepProps) {
  return (
    <div className="relative flex flex-col items-center text-center group">
      <div className="relative mb-4">
        <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground shadow-lg group-hover:shadow-glow transition-shadow">
          <Icon className="h-10 w-10" />
        </div>
        <div className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-sm shadow-md">
          {number}
        </div>
      </div>
      <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground max-w-xs">{description}</p>
    </div>
  );
}
