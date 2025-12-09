import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SummaryCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  variant?: "default" | "primary" | "accent" | "success";
  index?: number;
}

const variantStyles = {
  default: {
    bg: "bg-card",
    iconBg: "bg-muted",
    iconColor: "text-foreground",
  },
  primary: {
    bg: "bg-gradient-hero",
    iconBg: "bg-primary-foreground/20",
    iconColor: "text-primary-foreground",
  },
  accent: {
    bg: "bg-gradient-accent",
    iconBg: "bg-accent-foreground/20",
    iconColor: "text-accent-foreground",
  },
  success: {
    bg: "bg-success",
    iconBg: "bg-success-foreground/20",
    iconColor: "text-success-foreground",
  },
};

const SummaryCard = ({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  variant = "default",
  index = 0 
}: SummaryCardProps) => {
  const styles = variantStyles[variant];
  const isColored = variant !== "default";

  return (
    <div 
      className={cn(
        "rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1",
        styles.bg,
        isColored ? "border-0" : "border border-border"
      )}
      style={{ 
        animationDelay: `${index * 100}ms`,
        opacity: 0,
        animation: 'scale-in 0.4s ease-out forwards'
      }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className={cn(
            "text-sm font-medium",
            isColored ? "text-primary-foreground/80" : "text-muted-foreground"
          )}>
            {title}
          </p>
          <p className={cn(
            "text-3xl font-display font-bold mt-1",
            isColored ? "text-primary-foreground" : "text-foreground"
          )}>
            {value}
          </p>
          {subtitle && (
            <p className={cn(
              "text-sm mt-1",
              isColored ? "text-primary-foreground/70" : "text-muted-foreground"
            )}>
              {subtitle}
            </p>
          )}
        </div>
        <div className={cn(
          "p-3 rounded-xl",
          styles.iconBg
        )}>
          <Icon className={cn("h-6 w-6", styles.iconColor)} />
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
