"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export function ManageActiveWorkout({
  userId,
  initialActiveWorkout,
  savedWorkouts,
}) {
  const [activeWorkout, setActiveWorkout] = useState(initialActiveWorkout);
  const [selectedWorkout, setSelectedWorkout] = useState(
    initialActiveWorkout?.id || ""
  );
  const { toast } = useToast();

  const handleChangeActiveWorkout = async () => {
    try {
      const response = await fetch("/api/set-active-workout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, workoutId: selectedWorkout }),
      });

      if (!response.ok) {
        throw new Error("Failed to set active workout");
      }

      const updatedWorkout = await response.json();
      setActiveWorkout(updatedWorkout);
      toast({
        title: "Active Workout Updated",
        description: `Your active workout has been set to ${updatedWorkout.name}.`,
      });
    } catch (error) {
      console.error("Error setting active workout:", error);
      toast({
        title: "Error",
        description: "Failed to set active workout. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Active Workout</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="font-medium">Current Active Workout:</p>
            <p>
              {activeWorkout ? activeWorkout.name : "No active workout set"}
            </p>
          </div>
          <Select value={selectedWorkout} onValueChange={setSelectedWorkout}>
            <SelectTrigger>
              <SelectValue placeholder="Select a workout" />
            </SelectTrigger>
            <SelectContent>
              {savedWorkouts.map((workout) => (
                <SelectItem key={workout.id} value={workout.id}>
                  {workout.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            onClick={handleChangeActiveWorkout}
            disabled={!selectedWorkout || selectedWorkout === activeWorkout?.id}
          >
            Set as Active Workout
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
