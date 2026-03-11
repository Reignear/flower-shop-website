
import PublicLayout from "@/components/layout/public-layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

export default function Contact() {
  return (
    <PublicLayout>
      <div className="max-w-6xl mx-auto p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="space-y-5">
            <h2 className="text-2xl font-bold text-primary mb-6">
              Send us a Message
            </h2>

            <div>
              <label
                htmlFor="name"
                className="block text-sm mb-2 text-muted-foreground"
              >
                Full Name
              </label>
              <Input className="w-full" />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm  text-muted-foreground mb-2"
              >
                Email Address
              </label>
              <Input type="email" className="w-full" />
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-sm  text-muted-foreground mb-2"
              >
                Subject
              </label>
              <Input className="w-full" />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm  text-muted-foreground mb-2"
              >
                Message
              </label>
              <Textarea rows={5} />
            </div>
            <Button variant={"default"} className="w-full" disabled>
              Send Message
            </Button>
          </div>

          {/* Contact Information */}
          <div className="md:block hidden">
            <h2 className="text-2xl font-bold text-primary mb-6">
              Contact Information
            </h2>
            <div className="space-y-6">
              <Card className="p-6 border border-border flex flex-row items-center gap-4">
                <div className="shrink-0">
                  <Mail className="w-6 h-6 " />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Email</h3>
                  <a
                    href="mailto:hello@celestialbloom.com"
                    className="text-primary hover:underline"
                  >
                    clarissamagallanes49@gmail.com
                  </a>
                </div>
              </Card>

              <Card className="p-6 border border-border flex flex-row items-center gap-4">
                <div className="shrink-0">
                  <Phone className="w-6 h-6 " />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Phone</h3>
                  <a
                    href="tel:+15550000000"
                    className="text-primary hover:underline"
                  >
                    +63 994-730-8109
                  </a>
                </div>
              </Card>

              <Card className="p-6 border border-border flex flex-row items-center gap-4">
                <div className="shrink-0">
                  <MapPin className="w-6 h-6 " />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Location
                  </h3>
                  <p className="text-foreground/70">
                    Balagunan
                    <br />
                    Santo Tomas
                    <br />
                    Davao Del Norte
                  </p>
                </div>
              </Card>

              <Card className="p-6 border border-border flex flex-row items-center gap-4">
                <div className="shrink-0">
                  <Clock className="w-6 h-6 " />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Business Hours
                  </h3>
                  <p className="text-foreground/70">
                    Monday - Friday: 9:00 AM - 6:00 PM
                    <br />
                    Saturday: 10:00 AM - 4:00 PM
                    <br />
                    Sunday: Closed
                  </p>
                </div>
              </Card>
            </div>

            {/* FAQ Link */}
            <div className="mt-8 p-6 bg-secondary rounded-lg">
              <h3 className="font-semibold text-primary mb-2">
                Have Questions?
              </h3>
              <p className="text-foreground/70 mb-4">
                Check our FAQs page for common questions about orders, shipping,
                and more.
              </p>

              <a href="/faq">
                <Button variant={"link"}>View FAQs →</Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
