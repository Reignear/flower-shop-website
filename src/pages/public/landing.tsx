/* eslint-disable @typescript-eslint/no-explicit-any */
import PublicLayout from "@/components/layout/public-layout";
import Welcome from "@/pages/public/welcome-section";
import Product from "@/pages/public/product-section";
import Stats from "@/pages/public/stats-section";
import Feedback from "@/pages/public/feedback-section";
import Services from "@/pages/public/services-section";
import { useFeedbackOrder, useLanding } from "@/tanstack/fetch.hook";
import type { OrderFeedback } from "@/utils/interface";

export default function Landing() {
  const { data } = useLanding();
  const statsData = {
    sold: data?.sold || 0,
    type: data?.type || 0,
    client: data?.client || 0,
    experience: data?.experience || 0,
  };

  const products = (data?.bestSeller || []).map((item: any) => ({
    id: item.id,
    name: item.name,
    price: item.price,
    description: item.description,
    image_url: item.image_url,

    code: item.code || "",
    image: item.image || "",
    status: item.status || "",
    category: item.category || "",
  }));

  const { data: feedbackOrderData } = useFeedbackOrder("published");
  const feedbacks = (feedbackOrderData as OrderFeedback[] | undefined)?.map(
    (item: any) => ({
      id: item.id,
      feedback: item.feedback,
      rating: item.rating,
      status: item.status,
      user: {
        id: item.user?.id || "",
        first_name: item.user?.first_name || "",
        middle_name: item.user?.middle_name || "",
        last_name: item.user?.last_name || "",
        email: item.user?.email || "",
        birthdate: item.user?.birthdate || "",
        role: item.user?.role || "",
      },
      created_at: item.created_at || "",
      order: item.order?.id || "",
    }),
  );
  return (
    <PublicLayout>
      <section>
        <Welcome />
      </section>
      <section>
        <Stats
          sold={statsData.sold}
          type={statsData.type}
          client={statsData.client}
          experience={statsData.experience}
        />
      </section>
      <section>
        <Services />
      </section>
      <section>
        <Product products={products} />
      </section>
      <section>
        <Feedback feedbacks={feedbacks} />
      </section>
    </PublicLayout>
  );
}
