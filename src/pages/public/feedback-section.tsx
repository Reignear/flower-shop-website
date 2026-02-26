import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { capitalizeFirstLetter } from "@/utils/capitalize";
import type { OrderFeedback } from "@/utils/interface";
import { SquareArrowOutUpRight, Star } from "lucide-react";
import { Link } from "react-router-dom";

interface FeedbackSectionProps {
  feedbacks: OrderFeedback[];
}
export default function FeedbackSection({ feedbacks }: FeedbackSectionProps) {
  return (
    <main className="px-4 md:px-8 lg:px-12 py-12 md:py-20 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <p className="text-sm font-semibold text-muted-foreground mb-2 uppercase">
              Service Feedback
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
              Meet Our Satisfied Customers
            </h2>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto overflow-hidden">
        <div className="flex flex-row gap-8  animate-scroll-left">
          {feedbacks?.map((feedback, index) => (
            <Card
              key={index}
              className="p-6 bg-card border-border md:min-w-lg  "
            >
              <div className="flex gap-1 mb-4">
                {[...Array(feedback.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-300 text-yellow-300"
                  />
                ))}
              </div>
              <p className="text-foreground mb-6 leading-relaxed">
                {feedback.feedback}
              </p>
              <div className="flex items-center gap-4">
                <div className="rounded-full border p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                </div>

                <div>
                  <p className="font-semibold text-foreground">
                    {capitalizeFirstLetter(feedback.user?.first_name)}{" "}
                    {capitalizeFirstLetter(feedback.user?.last_name)}
                  </p>
                  <p className="text-sm text-muted-foreground">Customer</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <div>
          <Link to="/feedback" className="flex justify-start mt-8">
            <Button
              size="lg"
              className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              View Product Feedback <SquareArrowOutUpRight />
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
