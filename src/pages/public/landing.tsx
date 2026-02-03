import PublicLayout from "@/components/layout/public-layout";
import Welcome from "@/pages/public/welcome-section";
import Product from "@/pages/public/product-section";
import Stats from "@/pages/public/stats-section";
import Feedback from "@/pages/public/feedback-section";
import Services from "@/pages/public/services-section";

const landing = () => {
  return (
    <PublicLayout>
      <section>
        <Welcome />
      </section>
      <section>
        <Stats />
      </section>
      <section>
        <Services />
      </section>
      <section>
        <Product />
      </section>
      <section>
        <Feedback />
      </section>
    </PublicLayout>
  );
};

export default landing;
