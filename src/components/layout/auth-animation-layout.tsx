interface AuthAnimationLayoutProps {
  children: React.ReactNode;
}

const AuthAnimationLayout = ({ children }: AuthAnimationLayoutProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 overflow-hidden">
      <div className=" gap-2 md:h-screen overflow-hidden">
        <div className="md:flex hidden h-full w-full items-center justify-center">
          <img
            src="/assets/images/public/bouquet-collage.svg"
            alt="Bouquet Collage"
          />
        </div>
      </div>
      <div className="relative z-10 w-full min-h-screen flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default AuthAnimationLayout;
