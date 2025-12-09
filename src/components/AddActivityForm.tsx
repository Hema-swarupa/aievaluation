import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Activity } from "./ActivityCard";

interface AddActivityFormProps {
  onAdd: (activity: Omit<Activity, "id">) => void;
  disabled?: boolean;
}

const categories: Activity["category"][] = [
  "Work",
  "Study", 
  "Sleep",
  "Entertainment",
  "Exercise",
  "Other",
];

const categoryEmojis: Record<Activity["category"], string> = {
  Work: "💼",
  Study: "📚",
  Sleep: "😴",
  Entertainment: "🎮",
  Exercise: "🏃",
  Other: "📌",
};

const AddActivityForm = ({ onAdd, disabled = false }: AddActivityFormProps) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<Activity["category"]>("Work");
  const [minutes, setMinutes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !minutes) return;

    onAdd({
      title: title.trim(),
      category,
      minutes: parseInt(minutes, 10),
    });

    setTitle("");
    setMinutes("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-card rounded-2xl border border-border p-6 shadow-soft">
      <h3 className="font-display text-lg font-semibold text-foreground mb-4">
        Add Activity
      </h3>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title" className="text-sm font-medium text-foreground">
            Activity Title
          </Label>
          <Input
            id="title"
            type="text"
            placeholder="What did you do?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="h-11"
            disabled={disabled}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="category" className="text-sm font-medium text-foreground">
              Category
            </Label>
            <Select 
              value={category} 
              onValueChange={(value) => setCategory(value as Activity["category"])}
              disabled={disabled}
            >
              <SelectTrigger className="h-11">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    <span className="flex items-center gap-2">
                      <span>{categoryEmojis[cat]}</span>
                      <span>{cat}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="minutes" className="text-sm font-medium text-foreground">
              Duration (minutes)
            </Label>
            <Input
              id="minutes"
              type="number"
              min="1"
              max="1440"
              placeholder="30"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              className="h-11"
              disabled={disabled}
            />
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full"
          variant="hero"
          size="lg"
          disabled={disabled || !title.trim() || !minutes}
        >
          <Plus className="h-5 w-5" />
          Add Activity
        </Button>
      </div>
    </form>
  );
};

export default AddActivityForm;
