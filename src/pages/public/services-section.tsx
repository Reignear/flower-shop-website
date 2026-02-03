import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function ServicesSection() {
  return (
    <main className="px-4 md:px-8 lg:px-12 py-12 md:py-20 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Images Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-square rounded-lg overflow-hidden">
              <img
                src="assets/images/services-image-one.png"
                alt="Red flowers close-up"
                className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="aspect-square rounded-lg overflow-hidden">
              <img
                src="assets/images/services-image-two.png"
                alt="Flower gift in hand"
                className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="col-span-2 aspect-video rounded-lg overflow-hidden">
              <img
                src="assets/images/services-image-three.png"
                alt="Flower arrangement and delivery"
                className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold text-muted-foreground mb-3 uppercase">
              Our Services
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              Flower Bouquet and Gift
            </h2>
            <p className="text-base md:text-lg text-muted-foreground mb-8 leading-relaxed">
              We aim to supply a fully customizable service from crafting our
              flowers to the packaging and transport. Our goal is to provide as
              lower costs as possible to help arrange an all-style with minimal
              waste. Give your loved ones a special and hand-made flowers.
            </p>
            <Link to="/services" className="flex justify-start mt-8">
              <Button className="rounded-full">Learn More</Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
