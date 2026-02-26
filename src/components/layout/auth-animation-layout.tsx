interface AuthAnimationLayoutProps {
  children: React.ReactNode;
}

const AuthAnimationLayout = ({ children }: AuthAnimationLayoutProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 overflow-hidden">
      <div className="hidden md:flex gap-2 h-screen overflow-hidden border">
        <div className="h-full w-full flex items-center justify-center">
          <img
            src="/assets/images/public/bouquet-collage.svg"
            alt="Bouquet Collage"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
      <div
        className=" inset-0 block md:hidden bg-cover bg-center fixed"
        style={{
          backgroundImage: "url('/assets/images/public/bouquet-collage.svg')",
        }}
      />
      <div className="relative z-10 w-full min-h-screen flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default AuthAnimationLayout;
