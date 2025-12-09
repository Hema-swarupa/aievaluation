import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { format, parse } from "date-fns";
import { CalendarIcon, Clock, Activity as ActivityIcon, Trophy, PieChart, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Navbar from "@/components/Navbar";
import SummaryCard from "@/components/SummaryCard";
import EmptyState from "@/components/EmptyState";
import { Activity } from "@/components/ActivityCard";
import { cn } from "@/lib/utils";

// Mock data for demonstration
const mockActivities: Activity[] = [
  { id: "1", title: "Morning Standup", category: "Work", minutes: 30 },
  { id: "2", title: "Deep Work Session", category: "Work", minutes: 120 },
  { id: "3", title: "Gym Workout", category: "Exercise", minutes: 60 },
  { id: "4", title: "Reading", category: "Study", minutes: 45 },
  { id: "5", title: "Netflix", category: "Entertainment", minutes: 90 },
  { id: "6", title: "Sleep", category: "Sleep", minutes: 480 },
  { id: "7", title: "Lunch break", category: "Other", minutes: 60 },
];

const categoryColors: Record<string, string> = {
  Work: "hsl(245, 58%, 51%)",
  Study: "hsl(199, 89%, 48%)",
  Sleep: "hsl(262, 83%, 58%)",
  Entertainment: "hsl(340, 82%, 52%)",
  Exercise: "hsl(142, 76%, 36%)",
  Other: "hsl(220, 10%, 46%)",
};

const Dashboard = () => {
  const [searchParams] = useSearchParams();
  const dateParam = searchParams.get("date");
  
  const [date, setDate] = useState<Date>(() => {
    if (dateParam) {
      try {
        return parse(dateParam, "yyyy-MM-dd", new Date());
      } catch {
        return new Date();
      }
    }
    return new Date();
  });

  // Toggle between data and no-data states for demo
  const [hasData, setHasData] = useState(true);
  const activities = hasData ? mockActivities : [];

  const analytics = useMemo(() => {
    const totalMinutes = activities.reduce((sum, a) => sum + a.minutes, 0);
    const categoryTotals = activities.reduce((acc, activity) => {
      acc[activity.category] = (acc[activity.category] || 0) + activity.minutes;
      return acc;
    }, {} as Record<string, number>);

    const topCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0];

    return {
      totalMinutes,
      activityCount: activities.length,
      topCategory: topCategory ? topCategory[0] : "N/A",
      topCategoryMinutes: topCategory ? topCategory[1] : 0,
      categoryTotals,
    };
  }, [activities]);

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar showBack showLogout backTo="/app" />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with date picker */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              Analytics Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Insights for your selected day
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Demo toggle */}
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setHasData(!hasData)}
            >
              Toggle {hasData ? "Empty" : "Data"} State
            </Button>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full sm:w-[280px] justify-start text-left font-normal h-12",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-5 w-5" />
                  {date ? format(date, "EEEE, MMMM d, yyyy") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(d) => d && setDate(d)}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {activities.length > 0 ? (
          <>
            {/* Summary Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <SummaryCard
                title="Total Time Logged"
                value={formatDuration(analytics.totalMinutes)}
                subtitle={`${Math.round((analytics.totalMinutes / 1440) * 100)}% of your day`}
                icon={Clock}
                variant="primary"
                index={0}
              />
              <SummaryCard
                title="Activities Logged"
                value={analytics.activityCount}
                subtitle="Different activities today"
                icon={ActivityIcon}
                index={1}
              />
              <SummaryCard
                title="Top Category"
                value={analytics.topCategory}
                subtitle={formatDuration(analytics.topCategoryMinutes)}
                icon={Trophy}
                variant="accent"
                index={2}
              />
            </div>

            {/* Charts Section */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Pie Chart Placeholder */}
              <div className="bg-card rounded-2xl border border-border p-6 shadow-soft animate-fade-in">
                <div className="flex items-center gap-2 mb-6">
                  <PieChart className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    Time by Category
                  </h3>
                </div>

                {/* Visual pie chart representation */}
                <div className="flex items-center justify-center py-8">
                  <div className="relative w-48 h-48">
                    <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                      {Object.entries(analytics.categoryTotals).reduce((acc, [category, minutes], index) => {
                        const percentage = (minutes / analytics.totalMinutes) * 100;
                        const previousPercentage = acc.offset;
                        const dashArray = `${percentage} ${100 - percentage}`;
                        
                        acc.elements.push(
                          <circle
                            key={category}
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke={categoryColors[category]}
                            strokeWidth="20"
                            strokeDasharray={dashArray}
                            strokeDashoffset={-previousPercentage}
                            className="transition-all duration-500"
                            style={{ animationDelay: `${index * 100}ms` }}
                          />
                        );
                        acc.offset += percentage;
                        return acc;
                      }, { elements: [] as React.ReactNode[], offset: 0 }).elements}
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-foreground">
                          {formatDuration(analytics.totalMinutes)}
                        </p>
                        <p className="text-sm text-muted-foreground">Total</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Legend */}
                <div className="grid grid-cols-2 gap-3 mt-6">
                  {Object.entries(analytics.categoryTotals).map(([category, minutes]) => (
                    <div key={category} className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: categoryColors[category] }}
                      />
                      <span className="text-sm text-muted-foreground">{category}</span>
                      <span className="text-sm font-medium text-foreground ml-auto">
                        {formatDuration(minutes)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bar Chart Placeholder */}
              <div className="bg-card rounded-2xl border border-border p-6 shadow-soft animate-fade-in" style={{ animationDelay: "100ms" }}>
                <div className="flex items-center gap-2 mb-6">
                  <BarChart3 className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    Activity Durations
                  </h3>
                </div>

                <div className="space-y-4">
                  {activities.sort((a, b) => b.minutes - a.minutes).map((activity, index) => (
                    <div 
                      key={activity.id} 
                      className="space-y-2"
                      style={{ 
                        opacity: 0,
                        animation: `fade-in-up 0.4s ease-out ${index * 50}ms forwards`
                      }}
                    >
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-foreground font-medium truncate mr-4">
                          {activity.title}
                        </span>
                        <span className="text-muted-foreground flex-shrink-0">
                          {formatDuration(activity.minutes)}
                        </span>
                      </div>
                      <div className="h-3 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all duration-700 ease-out"
                          style={{ 
                            width: `${(activity.minutes / analytics.totalMinutes) * 100}%`,
                            backgroundColor: categoryColors[activity.category],
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Activity List */}
            <div className="mt-8 bg-card rounded-2xl border border-border p-6 shadow-soft">
              <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                All Activities
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Activity</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Category</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activities.map((activity) => (
                      <tr key={activity.id} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                        <td className="py-3 px-4 text-foreground">{activity.title}</td>
                        <td className="py-3 px-4">
                          <span 
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                            style={{ 
                              backgroundColor: `${categoryColors[activity.category]}20`,
                              color: categoryColors[activity.category]
                            }}
                          >
                            {activity.category}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right text-muted-foreground">
                          {formatDuration(activity.minutes)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-card rounded-2xl border border-border p-8">
            <EmptyState />
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
