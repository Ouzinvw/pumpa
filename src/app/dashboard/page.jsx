import { InitializeWorkout } from "./components/InitializeWorkout";
import { WorkoutConsistency } from "./components/WorkoutConsistency";
import { WorkoutStreak } from "./components/WorkoutStreak";
import { RecommendedWorkouts } from "./components/RecommendedWorkouts";

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8">
        <InitializeWorkout />
        <div className="grid md:grid-cols-2 gap-8">
          <WorkoutConsistency />
          <WorkoutStreak />
        </div>
        <RecommendedWorkouts />
      </div>
    </div>
  );
}
