import FlowerCard from "@/components/custom/flower-card";
import { data } from "@/data/auth-layout-data";

interface AuthAnimationLayoutProps {
  children: React.ReactNode;
}

const AuthAnimationLayout = ({ children }: AuthAnimationLayoutProps) => {
  return (
    <div className="grid grid-cols-2 overflow-hidden">
      <div className="p-5 grid grid-cols-3 gap-2 h-screen overflow-hidden">
        {/* Column 1 - moves up */}
        <div className="flex flex-col gap-2 animate-scroll-up">
          <FlowerCard data={data} width="min-w-40" height="h-60" />
          <FlowerCard data={data} width="min-w-40" height="h-60" />
          <FlowerCard data={data} width="min-w-40" height="h-60" />
          <FlowerCard data={data} width="min-w-40" height="h-60" />
          <FlowerCard data={data} width="min-w-40" height="h-60" />
          <FlowerCard data={data} width="min-w-40" height="h-60" />
          <FlowerCard data={data} width="min-w-40" height="h-60" />
          <FlowerCard data={data} width="min-w-40" height="h-60" />
        </div>

        {/* Column 2 - moves down */}
        <div className="flex flex-col gap-2 animate-scroll-down">
          <FlowerCard data={data} width="min-w-40" height="h-60" />
          <FlowerCard data={data} width="min-w-40" height="h-60" />
          <FlowerCard data={data} width="min-w-40" height="h-60" />
          <FlowerCard data={data} width="min-w-40" height="h-60" />
          <FlowerCard data={data} width="min-w-40" height="h-60" />
          <FlowerCard data={data} width="min-w-40" height="h-60" />
          <FlowerCard data={data} width="min-w-40" height="h-60" />
          <FlowerCard data={data} width="min-w-40" height="h-60" />
        </div>

        {/* Column 3 - moves up */}
        <div className="flex flex-col gap-2 animate-scroll-up">
          <FlowerCard data={data} width="min-w-40" height="h-60" />
          <FlowerCard data={data} width="min-w-40" height="h-60" />
          <FlowerCard data={data} width="min-w-40" height="h-60" />
          <FlowerCard data={data} width="min-w-40" height="h-60" />
          <FlowerCard data={data} width="min-w-40" height="h-60" />
          <FlowerCard data={data} width="min-w-40" height="h-60" />
          <FlowerCard data={data} width="min-w-40" height="h-60" />
          <FlowerCard data={data} width="min-w-40" height="h-60" />
        </div>
      </div>
      <div className="relative z-10 w-full min-h-screen flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default AuthAnimationLayout;
