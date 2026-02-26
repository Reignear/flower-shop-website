import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
export default function WelcomeSection() {
  return (
    <main className="min-h-screen bg-background px-4 md:px-8 lg:px-12 py-8 md:py-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl md:text-start text-center lg:text-6xl font-bold text-foreground mb-6 text-balance">
              Gift and Flower for Your Beloved
            </h1>
            <p className="text-base md:text-lg md:text-start text-center text-muted-foreground mb-8 leading-relaxed">
              Priding ourselves on the quality, bold colours and sustainability
              of our products, will give you a boost of confidence.
            </p>
            <div className=" gap-4 mb-12 hidden md:flex">
              <Link to="/user/signin">
                <Button
                  size="lg"
                  className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Start Shopping
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex justify-center items-start lg:justify-center">
            <div className="relative w-full max-w-lg aspect-square">
              <img
                src="/assets/images/public/landing-page.svg"
                alt="Landing Page Flower Design"
                className="w-full h-full object-contain rounded-2xl "
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
