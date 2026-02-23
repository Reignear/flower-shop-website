import { supabase } from "@/supabase/client";

export const fetchStats = async () => {
  try {
    // Count clients
    const countClient = supabase
      .from("user_table")
      .select("*", { count: "estimated" })
      .eq("role", "user");

    // Count bouquet sold
    const countSold = supabase
      .from("orders_table")
      .select("*", { count: "estimated" })
      .eq("status", "delivered");

    // Count bouquet types
    const countTypes = supabase
      .from("product_table")
      .select("*", { count: "estimated" });

    // Count experience
    const currentYear = new Date().getFullYear();
    const countExperience = currentYear - 2024;

    // Fetch top 4 best sellers
    const latestProduct = supabase
      .from("product_table")
      .select("id, description, name, price, image")
      .order("created_at", { ascending: false })
      .limit(4);
    
    const orderFeedback = supabase
      .from("order_feedback_table")
      .select("id, feedback, rating, user: user_table (id, first_name)")
      .order("created_at", { ascending: false })
      .limit(10);

    const [clientResult, soldResult, typesResult, latestResult, feedbackResult] =
      await Promise.all([countClient, countSold, countTypes, latestProduct, orderFeedback]);

    if (
      clientResult.error ||
      soldResult.error ||
      typesResult.error ||
      latestResult.error ||
      feedbackResult.error
    ) {
      console.error(
        "Error fetching stats data:",
        clientResult.error ||
          soldResult.error ||
          typesResult.error ||
          latestResult.error ||
            feedbackResult.error
      );
      return null;
    }
    const bestSellerWithImages = await Promise.all(
      (latestResult.data || []).map(
        async ({ id, name, price, image, description }) => {
          const { data: image_url } = await supabase.storage
            .from("product-images")
            .createSignedUrl(image, 60 * 60 * 24 * 7);
          return {
            id,
            name,
            price,
            description,
            image_url: image_url?.signedUrl || "",
          };
        },
      ),
    );

    return {
      client: clientResult.count || 0,
      sold: soldResult.count || 0,
      type: typesResult.count || 0,
      experience: countExperience,
      bestSeller: bestSellerWithImages || [],
      feedback: feedbackResult.data || []
    };
  } catch (error) {
    console.error("Error fetching stats data:", error);
  }
};
