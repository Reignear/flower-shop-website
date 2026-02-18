import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NotAvailablePage() {
  return (
    <main className="w-full min-h-screen flex items-center justify-center bg-background px-4">
      {/* Subtle animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/3 rounded-full blur-3xl"></div>
      </div>

      {/* Content container */}
      <div className="relative z-10 max-w-2xl w-full flex flex-col items-center justify-center gap-8 text-center">
        {/* Status number */}
        <div className="flex flex-col gap-2">
          <span className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-linear-to-r from-accent to-accent/70">
            143
          </span>
          <div className="h-1 w-12 bg-accent/30 rounded-full mx-auto"></div>
        </div>

        {/* Heading */}
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
            This Page Is Unavailable
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto leading-relaxed">
            We're currently working on improvements to enhance your experience.
            We'll be back soon. Thank you for your patience.
          </p>
        </div>

        {/* Status indicator */}
        <div className="z-15 relative">
          <div className="flex items-center justify-center">
            <img src="/assets/images/unavailable.svg" className="w-40" alt="" />
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto justify-center pt-4">
          <Link to="/" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto">
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Support info */}
        <p className="text-sm text-muted-foreground pt-4 border-t border-border/50 w-full"></p>
      </div>
    </main>
  );
}
