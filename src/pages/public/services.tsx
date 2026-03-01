import { Button } from "@/components/ui/button";
import PublicLayout from "@/components/layout/public-layout";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import PremadeBouquets from "/assets/images/public/premade-bouquets.svg";
import CustomizedBouquets from "/assets/images/public/customized-bouquets.svg";
import BouquetArrangement from "/assets/images/public/bouquet-arrangement.svg";
const Services = () => {
  const services = [
    {
      id: 1,
      title: "Premade Bouquets",
      description:
        "Beautiful bouquets crafted from idea, thoughtfully arranged by our florists—perfect for quick gifting and special moments.",
      image: PremadeBouquets,
      features: [
        "Ready-to-Order Designs",
        "Mixed Fresh & Dried Flowers",
        "No hassle Delivery",
      ],
    },
    {
      id: 2,
      title: "Customized Bouquets",
      description:
        "Create your own bouquet by choosing flowers, colors, and styles that match your personal taste and occasion.",
      image: CustomizedBouquets,
      features: [
        "Choose Your Type Flowers",
        "Personalized Wrapping",
        "Custom Message Cards",
      ],
    },
    {
      id: 3,
      title: "Bouquet Arrangement",
      description:
        "Professional floral arrangement services for custom events, celebrations, and corporate gatherings.",
      image: BouquetArrangement,
      features: [
        "Event Styling Support",
        "Large-Scale Arrangements",
        "Theme-Based Designs",
      ],
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
                  <div className="relative h-64 overflow-hidden bg-muted">
                    <img
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="p-6 flex flex-col">
                    <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-sm md:text-base mb-6 grow leading-relaxed">
                      {service.description}
                    </p>

                    <div className="space-y-2 mb-6">
                      {service.features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-sm text-foreground"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg gap-2 group/btn">
                      Order now
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
