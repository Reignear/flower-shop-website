import PublicLayout from "@/components/layout/public-layout";
import { Card } from "@/components/ui/card";
import { AlertCircle, MapPin, Truck } from "lucide-react";
import { deliveryWorks } from "@/data/public-shipping-data";
const Shipping = () => {
  return (
    <PublicLayout
      title="Shipping Information"
      description="Reliable, fast delivery right to your doorstep"
    >
      <div className="max-w-6xl mx-auto p-5">
        <section className="mb-16">
          <h2 className="text-xl md:text-3xl font-bold text-primary mb-8">
            Shipping Options
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-5 border border-border">
              <div className="flex items-start gap-4">
                <Truck className="w-8 h-8 text-emerald-400 shrink-0 mt-1" />
                <div>
                  <h3 className="text-base md:text-xl font-semibold text-primary mb-2">
                    Standard Delivery
                  </h3>
                  <p className="text-foreground/70 mb-4">
                    Delivered within 2-3 business days. Perfect for planned
                    celebrations and special occasions.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-5 border border-border">
              <div className="flex items-start gap-4">
                <MapPin className="w-8 h-8 text-emerald-400 shrink-0 mt-1" />
                <div>
                  <h3 className="text-base md:text-xl font-semibold text-primary mb-2">
                    Same-Day Delivery
                  </h3>
                  <p className="text-foreground/70 mb-4">
                    Available in select areas. Order before 3 PM for same-day
                    delivery.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-5 border border-border">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-8 h-8 text-emerald-400 shrink-0 mt-1" />
                <div>
                  <h3 className="text-base md:text-xl font-semibold text-primary mb-2">
                    Scheduled Delivery
                  </h3>
                  <p className="text-foreground/70 mb-4">
                    Pick your ideal delivery date up to 30 days in advance. No
                    rush fees.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-16">
          <h2 className="text-xl md:text-3xl font-bold text-primary mb-8">
            How Our Delivery Works
          </h2>
          <div className="space-y-6">
            {deliveryWorks.map((item) => (
              <div key={item.step} className="flex gap-6">
                <div className="shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-accent text-accent-foreground font-bold">
                    <h1 className="text-emerald-400">{item.step}</h1>
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-base md:text-lg font-semibold text-primary mb-2">
                    {item.title}
                  </h4>
                  <p className="text-foreground/70">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Important Info */}
        <section className="mb-16">
          <h2 className="text-xl md:text-3xl font-bold text-primary mb-8">
            Important Information
          </h2>
          <div className="space-y-4">
            <Card className="p-6 border border-border">
              <h4 className="font-semibold text-primary mb-2">
                Address Requirements
              </h4>
              <p className="text-foreground/70">
                Please provide a complete delivery address including street
                number, city, state, and ZIP code. P.O. boxes and certain
                apartment buildings may have restrictions.
              </p>
            </Card>

            <Card className="p-6 border border-border">
              <h4 className="font-semibold text-primary mb-2">
                Delivery Times
              </h4>
              <p className="text-foreground/70">
                Deliveries are made Monday through Saturday, 8 AM to 6 PM.
                Sunday deliveries are available in select areas. We'll provide a
                delivery window when your order is confirmed.
              </p>
            </Card>

            <Card className="p-6 border border-border">
              <h4 className="font-semibold text-primary mb-2">
                Signature Requirements
              </h4>
              <p className="text-foreground/70">
                For large orders, a signature may be required upon delivery. If
                no one is home, the driver will attempt delivery again or leave
                a notice.
              </p>
            </Card>

            <Card className="p-6 border border-border">
              <h4 className="font-semibold text-primary mb-2">
                Seasonal Delays
              </h4>
              <p className="text-foreground/70">
                During peak holidays (Valentine's Day, Mother's Day, Christmas),
                delivery times may be extended by 1-2 days. We recommend
                ordering early for holiday deliveries.
              </p>
            </Card>
          </div>
        </section>

        {/* Damage & Issues */}
        <section className="bg-secondary rounded-lg p-8">
          <h3 className="text-xl md:text-2xl font-bold text-primary mb-4">
            If There's an Issue
          </h3>
          <p className="text-foreground/70 mb-6">
            We stand behind our deliveries. If your flowers arrive damaged or
            don't meet your expectations:
          </p>
          <ul className="space-y-3 text-foreground/70">
            <li>
              <span className="font-semibold">Report immediately</span> -
              Contact us within 24 hours with photos of the issue
            </li>
            <li>
              <span className="font-semibold">We'll make it right</span> - We'll
              replace your arrangement or issue a full refund
            </li>
            <li>
              <span className="font-semibold">Hassle-free process</span> - No
              questions asked, we just want you to be happy
            </li>
          </ul>
        </section>
      </div>
    </PublicLayout>
  );
};

export default Shipping;
