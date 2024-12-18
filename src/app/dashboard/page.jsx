export default async function DashboardPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Welcome to Your Dashboard</h1>
      <p className="mb-4">Here's an overview of your fitness journey:</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Recent Workouts</h2>
          <p>You haven't logged any workouts yet. Start tracking today!</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Fitness Goals</h2>
          <p>Set your fitness goals to stay motivated and track progress.</p>
        </div>
      </div>
    </div>
  );
}
