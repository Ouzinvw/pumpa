import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export function RecommendedWorkouts() {
  // Mock data for recommended workouts
  const recommendedWorkouts = [
    { id: 1, name: "HIIT Cardio Blast", creator: "FitnessPro", likes: 245 },
    { id: 2, name: "Yoga for Flexibility", creator: "YogaMaster", likes: 189 },
    {
      id: 3,
      name: "Strength Training 101",
      creator: "PowerLifter",
      likes: 302,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recommended Workouts</CardTitle>
        <CardDescription>Popular workouts from the community</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {recommendedWorkouts.map((workout) => (
            <li key={workout.id} className="flex justify-between items-center">
              <div>
                <Link
                  href={`/workout/${workout.id}`}
                  className="font-medium hover:underline"
                >
                  {workout.name}
                </Link>
                <p className="text-sm text-gray-500">by {workout.creator}</p>
              </div>
              <span className="text-sm text-gray-500">
                {workout.likes} likes
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
