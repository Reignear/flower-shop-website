import { ThreeDot } from "react-loading-indicators";

export default function LoadingPage() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-linear-to-br from-background via-secondary/20 to-accent/10 overflow-hidden relative">
      {/* Animated background blobs */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-accent/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute top-40 right-20 w-40 h-40 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-20 left-1/3 w-40 h-40 bg-secondary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>

      <div className="flex flex-col items-center justify-center gap-8 max-w-md mx-auto px-4 relative z-10">
        {/* Loading Text */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold text-foreground text-balance">
            Preparing Your Blooms
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed">
            We are arranging the perfect flowers for you...
          </p>
        </div>

        {/* Animated dots */}
        <div className="flex gap-2 justify-center">
          <ThreeDot color="#0D0D0D" size="small" />
        </div>
      </div>
    </main>
  );
}
