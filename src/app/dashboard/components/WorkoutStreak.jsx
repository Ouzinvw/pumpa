import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function WorkoutStreak() {
  // Mock data for workout streak
  const currentStreak = 5;
  const personalBest = 14;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Workout Streak</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-2xl font-bold">{currentStreak} days</p>
            <p className="text-sm text-gray-500">Current Streak</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{personalBest} days</p>
            <p className="text-sm text-gray-500">Personal Best</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
