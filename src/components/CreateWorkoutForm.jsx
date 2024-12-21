"use client";

import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";

const difficultyLevels = ["beginner", "easy", "medium", "hard", "godly"];

const workoutFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Workout name must be at least 3 characters." }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters." }),
  difficulty: z.enum(difficultyLevels),
  isPrivate: z.boolean().default(false),
  duration: z
    .number()
    .min(1, { message: "Duration must be at least 1 minute." }),
  breakTime: z.number().min(0, { message: "Break time cannot be negative." }),
  exercises: z
    .array(
      z.object({
        exerciseId: z.string(),
        sets: z.number().min(1, { message: "Sets must be at least 1." }),
        reps: z
          .number()
          .min(1, { message: "Reps must be at least 1." })
          .optional(),
        time: z
          .number()
          .min(1, { message: "Time must be at least 1 second." })
          .optional(),
      })
    )
    .min(1, { message: "Please add at least one exercise." }),
});

export default function CreateWorkoutForm() {
  const [exercises, setExercises] = useState([]);
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(workoutFormSchema),
    defaultValues: {
      name: "",
      description: "",
      difficulty: "medium",
      isPrivate: false,
      duration: 30,
      breakTime: 60,
      exercises: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "exercises",
  });

  useEffect(() => {
    // Fetch exercises from your API
    const fetchExercises = async () => {
      try {
        const response = await fetch("/api/exercises");
        if (!response.ok) throw new Error("Failed to fetch exercises");
        const data = await response.json();
        setExercises(data);
      } catch (error) {
        console.error("Error fetching exercises:", error);
        toast({
          title: "Error",
          description: "Failed to load exercises. Please try again.",
          variant: "destructive",
        });
      }
    };

    fetchExercises();
  }, [toast]);

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/workouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to create workout");

      const result = await response.json();
      toast({
        title: "Success",
        description: `Workout "${result.name}" created successfully!`,
      });
      form.reset();
    } catch (error) {
      console.error("Error creating workout:", error);
      toast({
        title: "Error",
        description: "Failed to create workout. Please try again.",
        variant: "destructive",
      });
    }
  };

  const toastTest = async () => {
    toast({ title: "This is a toast" });
    console.log("Toasted");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Workout Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter workout name" {...field} />
              </FormControl>
              <FormDescription>
                Give your workout a descriptive name.
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
                  placeholder="Describe your workout"
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
          name="isPrivate"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Private Workout</FormLabel>
                <FormDescription>
                  Make this workout private and visible only to you.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duration (minutes)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                />
              </FormControl>
              <FormDescription>
                Estimated duration of the workout in minutes.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="breakTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Break Time (seconds)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                />
              </FormControl>
              <FormDescription>
                Rest time between exercises in seconds (30-60 seconds
                recommended).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <h3 className="text-lg font-medium mb-2">Exercises</h3>
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-end gap-4 mb-4">
              <FormField
                control={form.control}
                name={`exercises.${index}.exerciseId`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Exercise</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select exercise" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {exercises.map((exercise) => (
                          <SelectItem key={exercise.id} value={exercise.id}>
                            {exercise.name}
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
                name={`exercises.${index}.sets`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sets</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value, 10))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`exercises.${index}.reps`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reps</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value, 10))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`exercises.${index}.time`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time (seconds)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value, 10))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant="destructive"
                onClick={() => remove(index)}
              >
                Remove
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              append({
                exerciseId: "",
                sets: 1,
                reps: undefined,
                time: undefined,
              })
            }
          >
            Add Exercise
          </Button>
        </div>

        <Button type="submit">Create Workout</Button>
      </form>
    </Form>
  );
}
