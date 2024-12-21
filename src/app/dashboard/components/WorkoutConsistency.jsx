import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function WorkoutConsistency() {
  // Mock data for the workout consistency
  const data = [
    { name: "Mon", workouts: 2 },
    { name: "Tue", workouts: 3 },
    { name: "Wed", workouts: 1 },
    { name: "Thu", workouts: 4 },
    { name: "Fri", workouts: 3 },
    { name: "Sat", workouts: 2 },
    { name: "Sun", workouts: 1 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Workout Consistency</CardTitle>
      </CardHeader>
      <CardContent>Placeholder</CardContent>
    </Card>
  );
}
