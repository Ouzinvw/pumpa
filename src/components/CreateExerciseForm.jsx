"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/toast";

const difficultyLevels = ["beginner", "easy", "medium", "hard", "godly"];

const muscleGroups = [
  "Chest",
  "Back",
  "Shoulders",
  "Biceps",
  "Triceps",
  "Forearms",
  "Abs",
  "Obliques",
  "Lower Back",
  "Glutes",
  "Quads",
  "Hamstrings",
  "Calves",
  "Hip Flexors",
  "Adductors",
  "Abductors",
  "Trapezius",
  "Rhomboids",
  "Lats",
  "Deltoids",
  "Pecs",
  "Serratus Anterior",
  "Erector Spinae",
  "Rotator Cuff",
  "Flexor Muscles",
  "Extensor Muscles",
];

const equipmentList = [
  "Barbell",
  "Dumbbell",
  "Kettlebell",
  "Resistance Bands",
  "Bodyweight",
  "Machine",
  "Cable Machine",
  "Bench",
  "Pull-up Bar",
  "Yoga Mat",
  "Medicine Ball",
  "Foam Roller",
  "TRX Straps",
  "Stability Ball",
  "Weighted Vest",
  "Plates",
  "Box",
  "Rings",
];

const exerciseFormSchema = z.object({
  name: z.string().min(3, {
    message: "Exercise name must be at least 3 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  difficulty: z.enum(difficultyLevels),
  muscleGroup: z.enum(muscleGroups),
  requiredEquipment: z.array(z.string()).min(1, {
    message: "Please select at least one piece of equipment.",
  }),
  gifUrl: z.string().url().optional().or(z.literal("")),
});

export default function CreateExerciseForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(exerciseFormSchema),
    defaultValues: {
      name: "",
      description: "",
      difficulty: "medium",
      muscleGroup: "Chest",
      requiredEquipment: [],
      gifUrl: "",
    },
  });

  async function onSubmit(values) {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/exercises", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to create exercise");
      }

      const data = await response.json();
      toast({
        title: "Exercise created",
        description: `Successfully created exercise: ${data.name}`,
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create exercise. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleClipboardPaste() {
    try {
      const clipboardText = await navigator.clipboard.readText();
      const exerciseData = JSON.parse(clipboardText);

      form.reset(exerciseData);
      toast({
        title: "Clipboard data loaded",
        description: "Exercise data has been pasted from clipboard.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          "Failed to parse clipboard data. Make sure it's valid JSON.",
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Button type="button" onClick={handleClipboardPaste} className="mb-4">
          Take from Clipboard
        </Button>

        {/* Form fields (unchanged) */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Exercise Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter exercise name" {...field} />
              </FormControl>
              <FormDescription>
                Give your exercise a descriptive name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the exercise and how to perform it"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="difficulty"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Difficulty</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {difficultyLevels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="muscleGroup"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Primary Muscle Group</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select muscle group" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {muscleGroups.map((group) => (
                    <SelectItem key={group} value={group}>
                      {group}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="requiredEquipment"
          render={() => (
            <FormItem>
              <FormLabel>Required Equipment</FormLabel>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                {equipmentList.map((item) => (
                  <FormField
                    key={item}
                    control={form.control}
                    name="requiredEquipment"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">{item}</FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gifUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>GIF URL (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Enter GIF URL" {...field} />
              </FormControl>
              <FormDescription>
                Provide a URL to a GIF demonstrating the exercise.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Exercise"}
        </Button>
      </form>
    </Form>
  );
}
