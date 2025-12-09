import { useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { CalendarIcon, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Navbar from "@/components/Navbar";
import TimeProgress from "@/components/TimeProgress";
import AddActivityForm from "@/components/AddActivityForm";
import ActivityCard, { Activity } from "@/components/ActivityCard";
import EmptyState from "@/components/EmptyState";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

const AppPage = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [activities, setActivities] = useState<Activity[]>([
    { id: "1", title: "Morning Standup", category: "Work", minutes: 30 },
    { id: "2", title: "Deep Work Session", category: "Work", minutes: 120 },
    { id: "3", title: "Gym Workout", category: "Exercise", minutes: 60 },
    { id: "4", title: "Reading", category: "Study", minutes: 45 },
    { id: "5", title: "Netflix", category: "Entertainment", minutes: 90 },
  ]);

  const totalMinutes = activities.reduce((sum, a) => sum + a.minutes, 0);
  const remainingMinutes = 1440 - totalMinutes;
  const isOverLimit = totalMinutes > 1440;

  const handleAddActivity = (newActivity: Omit<Activity, "id">) => {
    const newMinutes = totalMinutes + newActivity.minutes;
    if (newMinutes > 1440) {
      toast({
        title: "Cannot add activity",
        description: `Adding ${newActivity.minutes} minutes would exceed 24 hours. You have ${remainingMinutes} minutes left.`,
        variant: "destructive",
      });
      return;
    }

    const activity: Activity = {
      ...newActivity,
      id: Date.now().toString(),
    };
    setActivities([...activities, activity]);
    toast({
      title: "Activity added",
      description: `${newActivity.title} (${newActivity.minutes}m) has been logged.`,
    });
  };

  const handleEditActivity = (id: string) => {
    console.log("Edit activity:", id);
    toast({
      title: "Edit mode",
      description: "Edit functionality placeholder",
    });
  };

  const handleDeleteActivity = (id: string) => {
    setActivities(activities.filter((a) => a.id !== id));
    toast({
      title: "Activity deleted",
      description: "The activity has been removed.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar showLogout />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with date picker */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              Activity Logger
            </h1>
            <p className="text-muted-foreground mt-1">
              Track how you spend your day
            </p>
          </div>

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

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left column - Form and Progress */}
          <div className="lg:col-span-1 space-y-6">
            <TimeProgress usedMinutes={totalMinutes} />
            <AddActivityForm 
              onAdd={handleAddActivity} 
              disabled={isOverLimit}
            />
            
            {/* Analyse Button */}
            <Link 
              to={totalMinutes > 0 ? `/dashboard?date=${format(date, 'yyyy-MM-dd')}` : "#"}
              className={cn(totalMinutes === 0 && "pointer-events-none")}
            >
              <Button 
                variant="accent" 
                size="xl" 
                className="w-full gap-2"
                disabled={totalMinutes === 0}
              >
                <BarChart3 className="h-5 w-5" />
                Analyse Your Day
              </Button>
            </Link>
          </div>

          {/* Right column - Activity List */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-semibold text-foreground">
                Today's Activities
              </h2>
              <span className="text-sm text-muted-foreground">
                {activities.length} {activities.length === 1 ? "activity" : "activities"}
              </span>
            </div>

            {activities.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-4">
                {activities.map((activity, index) => (
                  <ActivityCard
                    key={activity.id}
                    activity={activity}
                    onEdit={handleEditActivity}
                    onDelete={handleDeleteActivity}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-card rounded-2xl border border-border p-8">
                <EmptyState
                  title="No activities yet"
                  description="Start logging your activities to track your day."
                  showCta={false}
                />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AppPage;
