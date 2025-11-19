import { Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface PricingCardProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  ctaText: string;
  onCtaClick: () => void;
}

export function PricingCard({ 
  name, 
  price, 
  description, 
  features, 
  highlighted = false, 
  ctaText,
  onCtaClick 
}: PricingCardProps) {
  return (
    <Card className={`relative ${highlighted ? 'border-primary shadow-glow scale-105' : 'border-border'} transition-all hover:shadow-lg`}>
      {highlighted && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <Badge className="bg-accent text-accent-foreground">Most Popular</Badge>
        </div>
      )}
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl font-bold text-foreground">{name}</CardTitle>
        <CardDescription className="text-muted-foreground">{description}</CardDescription>
        <div className="mt-4">
          <span className="text-4xl font-bold text-foreground">{price}</span>
          {price !== "Custom" && <span className="text-muted-foreground">/month</span>}
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
              <span className="text-sm text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>
        <Button 
          onClick={onCtaClick}
          variant={highlighted ? "default" : "outline"}
          className="w-full"
          size="lg"
        >
          {ctaText}
        </Button>
      </CardContent>
    </Card>
  );
}
