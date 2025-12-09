import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface Activity {
  id: string;
  title: string;
  category: "Work" | "Study" | "Sleep" | "Entertainment" | "Exercise" | "Other";
  minutes: number;
}

interface ActivityCardProps {
  activity: Activity;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  index: number;
}

const categoryStyles: Record<Activity["category"], { bg: string; text: string; border: string }> = {
  Work: { bg: "bg-category-work/10", text: "text-category-work", border: "border-category-work/30" },
  Study: { bg: "bg-category-study/10", text: "text-category-study", border: "border-category-study/30" },
  Sleep: { bg: "bg-category-sleep/10", text: "text-category-sleep", border: "border-category-sleep/30" },
  Entertainment: { bg: "bg-category-entertainment/10", text: "text-category-entertainment", border: "border-category-entertainment/30" },
  Exercise: { bg: "bg-category-exercise/10", text: "text-category-exercise", border: "border-category-exercise/30" },
  Other: { bg: "bg-category-other/10", text: "text-category-other", border: "border-category-other/30" },
};

const categoryIcons: Record<Activity["category"], string> = {
  Work: "💼",
  Study: "📚",
  Sleep: "😴",
  Entertainment: "🎮",
  Exercise: "🏃",
  Other: "📌",
};

const ActivityCard = ({ activity, onEdit, onDelete, index }: ActivityCardProps) => {
  const style = categoryStyles[activity.category];

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  return (
    <div 
      className={cn(
        "group relative bg-card rounded-xl border p-4 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1",
        style.border
      )}
      style={{ 
        animationDelay: `${index * 50}ms`,
        opacity: 0,
        animation: 'fade-in-up 0.4s ease-out forwards'
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className={cn(
            "flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-lg",
            style.bg
          )}>
            {categoryIcons[activity.category]}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground truncate">{activity.title}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className={cn(
                "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
                style.bg, style.text
              )}>
                {activity.category}
              </span>
              <span className="text-sm text-muted-foreground">
                {formatDuration(activity.minutes)}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            onClick={() => onEdit(activity.id)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
            onClick={() => onDelete(activity.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Minutes indicator bar */}
      <div className="mt-3 h-1 bg-muted rounded-full overflow-hidden">
        <div 
          className={cn("h-full rounded-full transition-all duration-500", style.bg.replace('/10', ''))}
          style={{ width: `${Math.min((activity.minutes / 120) * 100, 100)}%` }}
        />
      </div>
    </div>
  );
};

export default ActivityCard;
