import { Link } from "react-router-dom";
import { Calendar, Clock, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  title?: string;
  description?: string;
  showCta?: boolean;
  ctaText?: string;
  ctaLink?: string;
}

const EmptyState = ({ 
  title = "No data available for this date",
  description = "Start logging your day to view insights.",
  showCta = true,
  ctaText = "Go to Activity Logger",
  ctaLink = "/app"
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center animate-fade-in">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-gradient-hero rounded-full blur-2xl opacity-20 scale-150" />
        <div className="relative bg-muted/50 rounded-full p-8">
          <div className="relative">
            <Calendar className="h-16 w-16 text-muted-foreground" />
            <div className="absolute -top-1 -right-1 bg-accent text-accent-foreground rounded-full p-1">
              <Clock className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>

      <h2 className="font-display text-2xl font-bold text-foreground mb-2">
        {title}
      </h2>
      <p className="text-muted-foreground max-w-sm mb-8">
        {description}
      </p>

      {showCta && (
        <Link to={ctaLink}>
          <Button variant="hero" size="lg" className="gap-2">
            <PlusCircle className="h-5 w-5" />
            {ctaText}
          </Button>
        </Link>
      )}

      {/* Decorative elements */}
      <div className="mt-12 grid grid-cols-3 gap-4 opacity-40">
        <div className="w-12 h-2 bg-category-work rounded-full" />
        <div className="w-8 h-2 bg-category-study rounded-full" />
        <div className="w-10 h-2 bg-category-sleep rounded-full" />
      </div>
    </div>
  );
};

export default EmptyState;
