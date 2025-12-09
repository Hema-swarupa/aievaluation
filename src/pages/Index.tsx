import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Clock, ArrowRight, Mail, Lock, Chrome } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // If user is logged in, show different CTA
  const handleGetStarted = () => {
    if (user) {
      navigate("/app");
    } else {
      navigate("/auth");
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Background decorations */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-hero opacity-[0.02] rounded-full blur-3xl" />
      </div>

      <div className="relative min-h-screen flex">
        {/* Left side - Hero */}
        <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 bg-gradient-hero p-12 flex-col justify-between relative overflow-hidden">
          {/* Pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          <div className="relative">
            <div className="flex items-center gap-3">
              <div className="bg-primary-foreground/20 p-3 rounded-xl backdrop-blur-sm">
                <Clock className="h-8 w-8 text-primary-foreground" />
              </div>
              <span className="font-display text-2xl font-bold text-primary-foreground">
                TimeTrack
              </span>
            </div>
          </div>

          <div className="relative space-y-8 max-w-xl">
            <h1 className="font-display text-5xl xl:text-6xl font-bold text-primary-foreground leading-tight">
              24-Hour
              <br />
              Time Tracker
            </h1>
            <p className="text-xl text-primary-foreground/80 leading-relaxed">
              Track how you spend your day and analyze your routine. 
              Every minute counts — make them visible.
            </p>

            {/* Feature highlights */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {[
                { label: "Track Activities", emoji: "📊" },
                { label: "Daily Analytics", emoji: "📈" },
                { label: "Category Insights", emoji: "🎯" },
                { label: "24h Validation", emoji: "⏱️" },
              ].map((feature, i) => (
                <div 
                  key={feature.label}
                  className="flex items-center gap-3 bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-4"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <span className="text-2xl">{feature.emoji}</span>
                  <span className="text-primary-foreground font-medium">{feature.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Floating time cards */}
          <div className="relative mt-8">
            <div className="flex gap-4 overflow-hidden">
              {["Work", "Sleep", "Exercise"].map((cat, i) => (
                <div 
                  key={cat}
                  className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl px-4 py-2 animate-float"
                  style={{ animationDelay: `${i * 0.5}s` }}
                >
                  <span className="text-primary-foreground/80 text-sm">{cat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right side - CTA */}
        <div className="w-full lg:w-1/2 xl:w-2/5 flex items-center justify-center p-6 sm:p-12">
          <div className="w-full max-w-md space-y-8 animate-fade-in">
            {/* Mobile logo */}
            <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
              <div className="bg-gradient-hero p-3 rounded-xl shadow-glow">
                <Clock className="h-8 w-8 text-primary-foreground" />
              </div>
              <span className="font-display text-2xl font-bold text-foreground">
                TimeTrack
              </span>
            </div>

            <div className="text-center lg:text-left">
              <h2 className="font-display text-3xl font-bold text-foreground">
                {user ? "Welcome back!" : "Start tracking today"}
              </h2>
              <p className="mt-2 text-muted-foreground">
                {user 
                  ? "Continue managing your time and viewing your analytics."
                  : "Create an account to track how you spend your day."
                }
              </p>
            </div>

            <div className="space-y-4">
              <Button 
                onClick={handleGetStarted}
                variant="hero" 
                size="xl" 
                className="w-full"
              >
                {user ? "Go to Dashboard" : "Get Started"}
                <ArrowRight className="h-5 w-5" />
              </Button>

              {!user && (
                <>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-background text-muted-foreground">
                        Already have an account?
                      </span>
                    </div>
                  </div>

                  <Link to="/auth">
                    <Button variant="outline" size="lg" className="w-full h-12">
                      Sign In
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Feature list for mobile */}
            <div className="lg:hidden space-y-4 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground text-center mb-4">
                Track how you spend your day and analyze your routine.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Track Activities", emoji: "📊" },
                  { label: "Daily Analytics", emoji: "📈" },
                  { label: "Category Insights", emoji: "🎯" },
                  { label: "24h Validation", emoji: "⏱️" },
                ].map((feature) => (
                  <div 
                    key={feature.label}
                    className="flex items-center gap-2 bg-muted rounded-lg p-3 text-sm"
                  >
                    <span>{feature.emoji}</span>
                    <span className="text-foreground">{feature.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
