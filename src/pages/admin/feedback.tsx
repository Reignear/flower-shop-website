import AdminLayout from "@/components/layout/admin-layout";
import { Button } from "@/components/ui/button";
import { MessageCircle, Trash2, CheckCircle } from "lucide-react";

const feedbacks = [
  {
    id: 1,
    customer: "Sarah Johnson",
    product: "Rose Elegance Bouquet",
    rating: 5,
    comment:
      "Absolutely stunning flowers! Perfect quality and delivery was fast.",
    status: "Published",
    date: "2024-01-15",
  },
  {
    id: 2,
    customer: "Maria Garcia",
    product: "Wedding Florals Package",
    rating: 5,
    comment:
      "Made our wedding day perfect. The florist understood our vision beautifully.",
    status: "Published",
    date: "2024-01-14",
  },
  {
    id: 3,
    customer: "Emily Chen",
    product: "Tulip Paradise Bouquet",
    rating: 5,
    comment: "Fresh flowers that lasted for weeks. Excellent customer service!",
    status: "Pending",
    date: "2024-01-13",
  },
  {
    id: 4,
    customer: "Jessica Martinez",
    product: "Gift Hamper Deluxe",
    rating: 4,
    comment:
      "Beautiful presentation, though one item arrived with slight damage.",
    status: "Pending",
    date: "2024-01-12",
  },
  {
    id: 5,
    customer: "Rachel Lee",
    product: "Subscription Service",
    rating: 5,
    comment: "Love my monthly flowers! Great variety every time.",
    status: "Published",
    date: "2024-01-11",
  },
  {
    id: 6,
    customer: "Amanda White",
    product: "Debut Invitation Cards",
    rating: 5,
    comment: "Elegant invitations that impressed all my guests!",
    status: "Published",
    date: "2024-01-10",
  },
  {
    id: 7,
    customer: "Michelle Brown",
    product: "Aster Delight Bouquet",
    rating: 4,
    comment: "Nice colors but expected larger blooms.",
    status: "Pending",
    date: "2024-01-09",
  },
];

export default function AdminFeedbackPage() {
  return (
    <AdminLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Feedback Management
          </h1>
          <p className="text-muted-foreground">
            Review and manage customer feedback
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-card rounded-lg p-6 border border-border">
            <p className="text-muted-foreground text-sm mb-2">
              Total Feedbacks
            </p>
            <p className="text-3xl font-bold text-foreground">487</p>
            <p className="text-xs text-muted-foreground mt-2">This month</p>
          </div>
          <div className="bg-card rounded-lg p-6 border border-border">
            <p className="text-muted-foreground text-sm mb-2">Avg Rating</p>
            <p className="text-3xl font-bold text-chart-5">4.7★</p>
            <p className="text-xs text-muted-foreground mt-2">Out of 5.0</p>
          </div>
          <div className="bg-card rounded-lg p-6 border border-border">
            <p className="text-muted-foreground text-sm mb-2">Published</p>
            <p className="text-3xl font-bold text-chart-4">412</p>
            <p className="text-xs text-muted-foreground mt-2">Live on site</p>
          </div>
          <div className="bg-card rounded-lg p-6 border border-border">
            <p className="text-muted-foreground text-sm mb-2">Pending Review</p>
            <p className="text-3xl font-bold text-chart-1">24</p>
            <p className="text-xs text-muted-foreground mt-2">
              Awaiting approval
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6 flex-wrap">
          <Button className="bg-primary text-primary-foreground">
            All Feedbacks
          </Button>
          <Button
            variant="outline"
            className="border-border text-muted-foreground hover:bg-muted bg-transparent"
          >
            Published
          </Button>
          <Button
            variant="outline"
            className="border-border text-muted-foreground hover:bg-muted bg-transparent"
          >
            Pending
          </Button>
          <Button
            variant="outline"
            className="border-border text-muted-foreground hover:bg-muted bg-transparent"
          >
            5 Stars
          </Button>
          <Button
            variant="outline"
            className="border-border text-muted-foreground hover:bg-muted bg-transparent"
          >
            4 Stars & Below
          </Button>
        </div>

        {/* Feedback Cards */}
        <div className="space-y-4">
          {feedbacks.map((feedback) => (
            <div
              key={feedback.id}
              className="bg-card rounded-lg border border-border p-6 hover:border-primary/50 transition"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-chart-1/20 rounded-full flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-chart-1" />
                    </div>
                    <div>
                      <p className="text-foreground font-semibold">
                        {feedback.customer}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {feedback.product}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={
                          i < feedback.rating ? "text-chart-5" : "text-border"
                        }
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      feedback.status === "Published"
                        ? "bg-chart-4/20 text-chart-4"
                        : "bg-chart-1/20 text-chart-1"
                    }`}
                  >
                    {feedback.status}
                  </span>
                </div>
              </div>

              <p className="text-muted-foreground mb-4 leading-relaxed">
                {feedback.comment}
              </p>

              <div className="flex justify-between items-center">
                <p className="text-xs text-muted-foreground">{feedback.date}</p>
                <div className="flex items-center gap-2">
                  {feedback.status === "Pending" && (
                    <Button
                      size="sm"
                      className="bg-chart-4/20 hover:bg-chart-4/30 text-chart-4 flex items-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Approve
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-border text-destructive hover:bg-destructive/20 bg-transparent"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
