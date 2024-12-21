"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export default function SaveWorkoutButton({ workoutId, isSaved, userId }) {
  const [saved, setSaved] = useState(isSaved);
  const { toast } = useToast();

  const handleSave = async () => {
    try {
      const response = await fetch("/api/save-workout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          workoutId,
          userId,
          action: saved ? "unsave" : "save",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save/unsave workout");
      }

      setSaved(!saved);
      toast({
        title: saved ? "Workout Unsaved" : "Workout Saved",
        description: saved
          ? "The workout has been removed from your saved list."
          : "The workout has been added to your saved list.",
      });
    } catch (error) {
      console.error("Error saving/unsaving workout:", error);
      toast({
        title: "Error",
        description: "Failed to save/unsave the workout. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button onClick={handleSave} variant={saved ? "outline" : "default"}>
      {saved ? "Unsave" : "Save"}
    </Button>
  );
}
