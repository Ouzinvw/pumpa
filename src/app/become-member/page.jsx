import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    features: [
      "Access to basic workouts",
      "Progress tracking",
      "Community forum access",
    ],
    color: "bg-white",
    textColor: "text-black",
  },
  {
    name: "Pro",
    price: "$19.99",
    features: [
      "All Free features",
      "Custom workout plans",
      "Nutrition guidance",
      "Priority support",
    ],
    color: "bg-gradient-to-r from-blue-500 to-purple-600",
    textColor: "text-white",
    shine: true,
  },
  {
    name: "Elite",
    price: "$29.99",
    features: [
      "All Pro features",
      "1-on-1 coaching sessions",
      "Exclusive workshops",
      "Early access to new features",
    ],
    color: "bg-gradient-to-r from-orange-400 to-red-500",
    textColor: "text-white",
    animate: true,
  },
];

const testimonials = [
  {
    name: "John D.",
    text: "Pumpa transformed my fitness journey. The Elite plan is worth every penny!",
  },
  {
    name: "Sarah M.",
    text: "I've tried many fitness apps, but Pumpa's Pro plan stands out with its custom workouts.",
  },
  {
    name: "Mike R.",
    text: "Even the free tier offers great value. Pumpa is a game-changer!",
  },
  {
    name: "John D.",
    text: "Pumpa transformed my fitness journey. The Elite plan is worth every penny!",
  },
];

export default function MembershipPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8 text-center italic">
        <span className="bg-gradient-to-r from-orange-400 to-red-500 inline-block text-transparent bg-clip-text">
          Pumpa
        </span>{" "}
        pricing plans
      </h1>
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl
              ${plan.shine ? "hover:shadow-blue-200" : ""}
              ${plan.animate ? "transform hover:scale-105" : ""}
            `}
          >
            <CardHeader className={`${plan.color} ${plan.textColor}`}>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription
                className={`${plan.textColor} ${
                  plan.textColor === "text-white" ? "text-opacity-80" : ""
                }`}
              >
                <span className="text-3xl font-bold">{plan.price}</span> / month
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="mr-2 h-5 w-5 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className={`w-full ${plan.animate ? "animate-pulse" : ""}`}
              >
                Choose Plan
              </Button>
            </CardFooter>
            {plan.animate && (
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 opacity-20 animate-gradient-x"></div>
            )}
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-4 gap-8">
        {testimonials.map((testimonial, index) => (
          <Card
            key={index}
            className="bg-gray-100 hover:shadow-md transition-shadow duration-300"
          >
            <CardContent className="pt-6">
              <p className="italic mb-4">"{testimonial.text}"</p>
              <p className="font-semibold text-right">- {testimonial.name}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
