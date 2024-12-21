import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { MessageCircle, Phone, Mail } from "lucide-react";

export default function GetAssistancePage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">Need some help?</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="transition-all duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageCircle className="mr-2" />
              Contact Form
            </CardTitle>
            <CardDescription>
              Send us a message and we'll get back to you
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <Input placeholder="Your Name" />
              <Input type="email" placeholder="Your Email" />
              <Textarea placeholder="Your Message" className="min-h-[100px]" />
              <Button className="w-full">Send Message</Button>
            </form>
          </CardContent>
        </Card>
        <div className="space-y-6">
          <Card className="transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Phone className="mr-2" />
                Phone Support
              </CardTitle>
              <CardDescription>
                Call us directly for immediate assistance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold">1-800-PUMPA-HELP</p>
              <p className="text-sm text-gray-500">Available 24/7</p>
            </CardContent>
          </Card>
          <Card className="transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="mr-2" />
                Email Support
              </CardTitle>
              <CardDescription>
                Send us an email for non-urgent inquiries
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-semibold">support@pumpa.com</p>
              <p className="text-sm text-gray-500">
                We typically respond within 24 hours
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
