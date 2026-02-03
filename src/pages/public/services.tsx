import { Button } from "@/components/ui/button";
import PublicLayout from "@/components/layout/public-layout";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
const Services = () => {
  const services = [
    {
      id: 1,
      title: "Custom Bouquets",
      description:
        "Personalized flower arrangements tailored to your preferences and occasion",
      image: "/tulip-flowers-bouquet.jpg",
      features: ["Premium Selection", "Same-day Delivery", "Custom Colors"],
    },
    {
      id: 2,
      title: "Wedding Florals",
      description:
        "Complete floral design for your special day from bridal bouquets to centerpieces",
      image: "/pink-rose-bouquet-flowers.jpg",
      features: [
        "Full Design Consultation",
        "Venue Decoration",
        "Bridal Packages",
      ],
    },
    {
      id: 3,
      title: "Corporate Events",
      description:
        "Professional floral arrangements for conferences, galas, and business celebrations",
      image: "/flower-gift-hand.jpg",
      features: ["Bulk Orders", "Event Coordination", "Custom Branding"],
    },
    {
      id: 4,
      title: "Subscription Service",
      description:
        "Receive fresh flowers delivered weekly to brighten your space",
      image: "/special-mixed-bouquet-flowers.jpg",
      features: ["Weekly Delivery", "Flexible Plans", "Premium Blooms"],
    },
    {
      id: 5,
      title: "Gift Hampers",
      description:
        "Curated gift sets combining flowers with premium chocolates and wine",
      image: "/flower-arrangement-delivery.jpg",
      features: ["Luxury Packaging", "Customizable Items", "Gift Wrapping"],
    },
    {
      id: 6,
      title: "Plant Care Consultation",
      description: "Expert advice on caring for your flowers and indoor plants",
      image: "/woman-with-flowers-smiling.jpg",
      features: ["Free Consultation", "Care Tips", "Long-lasting Blooms"],
    },
  ];
  return (
    <PublicLayout>
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="px-4 md:px-8 lg:px-12 py-20 md:py-32">
          <div className="max-w-7xl mx-auto text-center mb-20">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 text-balance">
              Our Complete Services
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              From custom arrangements to corporate events, we provide
              comprehensive floral solutions for every occasion and celebration.
            </p>
          </div>

          {/* Services Grid */}
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="group bg-card rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden bg-muted">
                    <img
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col">
                    <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-sm md:text-base mb-6 grow leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-2 mb-6">
                      {service.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-sm text-foreground"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg gap-2 group/btn">
                      Learn More
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 md:px-8 lg:px-12 py-20 md:py-32 bg-primary/5">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              Bring Beauty to Your Occasion
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Contact our team today for a personalized consultation and let us
              help you create unforgettable floral experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/user/signin">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full border-primary text-primary hover:bg-primary/10 bg-transparent"
                >
                  Contact us for booking
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </PublicLayout>
  );
};

export default Services;
