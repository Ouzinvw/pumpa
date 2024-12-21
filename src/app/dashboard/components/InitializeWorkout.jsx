import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Flame, Clock, Dumbbell, ArrowRight } from "lucide-react";
import Link from "next/link";

const difficultyColors = {
  Beginner: "bg-sky-400",
  Easy: "bg-green-400",
  Medium: "bg-amber-400",
  Hard: "bg-red-600",
  Godly: "bg-rose-600 italic",
};

export function InitializeWorkout() {
  // Mock data for the saved workout
  const savedWorkout = {
    name: "Full Body Blast",
    duration: 45,
    difficulty: "Godly",
    description:
      "A high-intensity workout targeting all major muscle groups for maximum results.",
    progress: 75,
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-orange-400 to-red-500 text-white">
        <CardTitle className="text-2xl flex items-center gap-2">
          <Flame className="h-6 w-6" />
          Ready to ignite your workout?
        </CardTitle>
        <CardDescription className="text-orange-100">
          Your personalized session is fired up and waiting!
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">{savedWorkout.name}</h3>
          <Badge
            className={`font-bold text-md hover:bg-gray-300 ${
              difficultyColors[savedWorkout.difficulty]
            } ${savedWorkout.difficulty === "Godly" ? "animate-bounce" : ""}`}
          >
            {savedWorkout.difficulty}
          </Badge>
        </div>
        <div className="mb-6">
          <p className="text-sm text-gray-600">{savedWorkout.description}</p>
        </div>
        <div className="flex items-center gap-2 mb-6">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span>{savedWorkout.duration} minutes</span>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{savedWorkout.progress}%</span>
          </div>
          <Progress value={savedWorkout.progress} className="h-2" />
        </div>
      </CardContent>
      <div className="px-6 pb-6 flex justify-center">
        <Button
          asChild
          className="group bg-gradient-to-r from-orange-400 to-red-500 text-white hover:from-orange-500 hover:to-red-600 transition-all duration-300 transform hover:scale-105"
        >
          <Link href="/workout/start" className="flex items-center gap-2">
            <Dumbbell className="h-5 w-5" />
            <span>Start Workout</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </div>
    </Card>
  );
}
