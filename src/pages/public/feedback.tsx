/* eslint-disable @typescript-eslint/no-explicit-any */
import { Star } from "lucide-react";
import PublicLayout from "@/components/layout/public-layout";
import { useFeedback } from "@/tanstack/fetch.hook";
import { capitalizeFirstLetter } from "@/utils/capitalize";
import CustomSkeleton from "@/components/custom/custom-skeleton";

export default function FeedbackPage() {
  const { data, isLoading: isFeedbackLoading } = useFeedback();
  console.log("Feedback", data);
  return (
    <PublicLayout>
      <main className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12 py-16">
          {/* Page Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Customer Product Feedback
            </h1>
            <p className="text-lg text-muted-foreground">
              See what our customers think about our products
            </p>
          </div>
          {isFeedbackLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {Array.from({ length: 4 }).map((_, index) => (
                <CustomSkeleton type="feedback-card" key={index} />
              ))}
            </div>
          )}
          {/* Feedback Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {data?.map((feedback: any, index: number) => (
              <div
                key={index}
                className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition"
              >
                {feedback.product.image_url && (
                  <div className="w-full h-48 overflow-hidden bg-gray-200">
                    <img
                      src={feedback.product.image_url}
                      className="w-full h-full object-cover "
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0">
                      <img
                        src={feedback.product.image_url}
                        className="w-12 h-12 rounded-full object-cover border-2 border-primary"
                      />
                    </div>
                    <div className="grow">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-foreground">
                            {capitalizeFirstLetter(feedback.user?.first_name)}{" "}
                            {capitalizeFirstLetter(feedback.user?.last_name)}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {capitalizeFirstLetter(feedback.product.name)}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={`${
                              i < feedback.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-foreground mt-3 leading-relaxed truncate-2">
                        {capitalizeFirstLetter(feedback.feedback)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Feedback Count */}
          <div className="text-center mt-8 text-muted-foreground">
            Showing {data?.length} of {data?.length} feedbacks
          </div>
        </div>
      </main>
    </PublicLayout>
  );
}
