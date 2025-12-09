import { cn } from "@/lib/utils";

interface TimeProgressProps {
  usedMinutes: number;
  totalMinutes?: number;
}

const TimeProgress = ({ usedMinutes, totalMinutes = 1440 }: TimeProgressProps) => {
  const percentage = Math.min((usedMinutes / totalMinutes) * 100, 100);
  const remainingMinutes = totalMinutes - usedMinutes;
  const remainingHours = Math.floor(remainingMinutes / 60);
  const remainingMins = remainingMinutes % 60;

  const getProgressColor = () => {
    if (percentage >= 100) return "bg-destructive";
    if (percentage >= 80) return "bg-accent";
    return "bg-gradient-hero";
  };

  return (
    <div className="bg-card rounded-2xl border border-border p-6 shadow-soft">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Time Remaining</h3>
          <p className="text-3xl font-display font-bold text-foreground mt-1">
            {remainingHours > 0 && <span>{remainingHours}h </span>}
            <span>{remainingMins}m</span>
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Used Today</p>
          <p className={cn(
            "text-xl font-semibold",
            percentage >= 100 ? "text-destructive" : "text-foreground"
          )}>
            {usedMinutes} / {totalMinutes}
          </p>
        </div>
      </div>

      <div className="relative">
        <div className="h-3 bg-muted rounded-full overflow-hidden">
          <div 
            className={cn(
              "h-full rounded-full transition-all duration-700 ease-out",
              getProgressColor()
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
        
        {/* Hour markers */}
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          <span>0h</span>
          <span>6h</span>
          <span>12h</span>
          <span>18h</span>
          <span>24h</span>
        </div>
      </div>

      {percentage >= 100 && (
        <p className="mt-3 text-sm text-destructive font-medium flex items-center gap-2">
          <span className="w-2 h-2 bg-destructive rounded-full animate-pulse" />
          You've logged all 24 hours for this day!
        </p>
      )}
    </div>
  );
};

export default TimeProgress;
