import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import PublicLayout from "@/components/layout/public-layout";

interface FeedbackItem {
  id: number;
  name: string;
  image: string;
  product: string;
  statement: string;
  rating: number;
  photoUrl: string;
}

const feedbackData: FeedbackItem[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    image: "/feedback/sarah.jpg",
    product: "Rose Elegance Bouquet",
    statement:
      "The flowers were absolutely stunning and arrived fresh. The arrangement was exactly as described. Highly recommend!",
    rating: 5,
    photoUrl:
      "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=500&h=500&fit=crop",
  },
  {
    id: 2,
    name: "Maria Garcia",
    image: "/feedback/maria.jpg",
    product: "Wedding Florals Package",
    statement:
      "Made our wedding day even more special. The floral designs were elegant and the team was very professional.",
    rating: 5,
    photoUrl:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=500&h=500&fit=crop",
  },
  {
    id: 3,
    name: "Emily Chen",
    image: "/feedback/emily.jpg",
    product: "Tulip Paradise Bouquet",
    statement:
      "Beautiful flowers and excellent customer service. The delivery was on time and the flowers lasted for weeks.",
    rating: 5,
    photoUrl:
      "https://images.unsplash.com/photo-1520763185298-1b434c919abe?w=500&h=500&fit=crop",
  },
  {
    id: 4,
    name: "Jessica Martinez",
    image: "/feedback/jessica.jpg",
    product: "Gift Hamper Deluxe",
    statement:
      "Perfect gift for my mother. The presentation was luxurious and every item was of high quality.",
    rating: 5,
    photoUrl:
      "https://images.unsplash.com/photo-1506755855726-48249a8a7d67?w=500&h=500&fit=crop",
  },
  {
    id: 5,
    name: "Rachel Lee",
    image: "/feedback/rachel.jpg",
    product: "Subscription Service (Monthly)",
    statement:
      "I love receiving fresh flowers every month. Great variety and always in perfect condition.",
    rating: 5,
    photoUrl:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=500&fit=crop",
  },
  {
    id: 6,
    name: "Amanda White",
    image: "/feedback/amanda.jpg",
    product: "Debut Invitation Cards",
    statement:
      "Elegant invitation cards that impressed all my guests. The printing quality was excellent.",
    rating: 5,
    photoUrl:
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=500&h=500&fit=crop",
  },
  {
    id: 7,
    name: "Michelle Brown",
    image: "/feedback/michelle.jpg",
    product: "Aster Delight Bouquet",
    statement:
      "Vibrant colors and fresh flowers. The arrangement was eye-catching and perfectly arranged.",
    rating: 4,
    photoUrl:
      "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=500&h=500&fit=crop",
  },
  {
    id: 8,
    name: "Laura Davis",
    image: "/feedback/laura.jpg",
    product: "Corporate Event Arrangement",
    statement:
      "Hired them for our office event. The flowers added elegance to our venue. Very professional team.",
    rating: 5,
    photoUrl:
      "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?w=500&h=500&fit=crop",
  },
  {
    id: 9,
    name: "Nicole Taylor",
    image: "/feedback/nicole.jpg",
    product: "Special Mixed Bouquet",
    statement:
      "Absolutely gorgeous! The mix of flowers was colorful and the arrangement was done beautifully.",
    rating: 5,
    photoUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop",
  },
  {
    id: 10,
    name: "Sophia Anderson",
    image: "/feedback/sophia.jpg",
    product: "Wedding Invitation Cards",
    statement:
      "The invitation cards were stunning and set the perfect tone for our wedding. Thank you!",
    rating: 5,
    photoUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop",
  },
  {
    id: 11,
    name: "Olivia Harris",
    image: "/feedback/olivia.jpg",
    product: "Rose Elegance Bouquet",
    statement:
      "Such a wonderful experience. The flowers were fresh and the delivery was quick and reliable.",
    rating: 5,
    photoUrl:
      "https://images.unsplash.com/photo-1582794543139-77ae4d114f29?w=500&h=500&fit=crop",
  },
  {
    id: 12,
    name: "Ava Wilson",
    image: "/feedback/ava.jpg",
    product: "Plant Care Consultation",
    statement:
      "The expert advice on plant care was invaluable. My flowers lasted much longer after following their tips.",
    rating: 5,
    photoUrl:
      "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=500&h=500&fit=crop",
  },
  {
    id: 13,
    name: "Isabella Rodriguez",
    image: "/feedback/isabella.jpg",
    product: "Subscription Service (Weekly)",
    statement:
      "I get excited every week for my flower delivery. Great variety and always fresh.",
    rating: 5,
    photoUrl:
      "https://images.unsplash.com/photo-1514159096122-eaa9a77dc328?w=500&h=500&fit=crop",
  },
  {
    id: 14,
    name: "Mia Thompson",
    image: "/feedback/mia.jpg",
    product: "Table Arrangement Set",
    statement:
      "Perfect for my dinner party. The arrangements were elegant and added so much to the ambiance.",
    rating: 5,
    photoUrl:
      "https://images.unsplash.com/photo-1557672172-298e090d0f80?w=500&h=500&fit=crop",
  },
  {
    id: 15,
    name: "Emma Jackson",
    image: "/feedback/emma.jpg",
    product: "Tulip Paradise Bouquet",
    statement:
      "The tulips were vibrant and long-lasting. Great value for the quality provided.",
    rating: 4,
    photoUrl:
      "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=500&h=500&fit=crop",
  },
  {
    id: 16,
    name: "Charlotte Moore",
    image: "/feedback/charlotte.jpg",
    product: "Wedding Florals Package",
    statement:
      "Every detail was perfect. The florist understood my vision and executed it beautifully.",
    rating: 5,
    photoUrl:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=500&h=500&fit=crop",
  },
  {
    id: 17,
    name: "Amelia Clark",
    image: "/feedback/amelia.jpg",
    product: "Gift Hamper Premium",
    statement:
      "Sent this to my boss and she was absolutely thrilled. High-quality items and beautiful packaging.",
    rating: 5,
    photoUrl:
      "https://images.unsplash.com/photo-1506755855726-48249a8a7d67?w=500&h=500&fit=crop",
  },
  {
    id: 18,
    name: "Harper Martinez",
    image: "/feedback/harper.jpg",
    product: "Aster Delight Bouquet",
    statement:
      "Bright and cheerful flowers that lifted my mood. Highly satisfied with the purchase.",
    rating: 5,
    photoUrl:
      "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=500&h=500&fit=crop",
  },
  {
    id: 19,
    name: "Evelyn Young",
    image: "/feedback/evelyn.jpg",
    product: "Corporate Event Arrangement",
    statement:
      "The flowers transformed our office space. The team was accommodating and professional.",
    rating: 5,
    photoUrl:
      "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?w=500&h=500&fit=crop",
  },
  {
    id: 20,
    name: "Abigail King",
    image: "/feedback/abigail.jpg",
    product: "Special Mixed Bouquet",
    statement:
      "Beautiful arrangement with a great selection of flowers. Would definitely order again.",
    rating: 5,
    photoUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop",
  },
  {
    id: 21,
    name: "Grace Lewis",
    image: "/feedback/grace.jpg",
    product: "Debut Invitation Cards",
    statement:
      "The invitations looked so elegant. Received many compliments from guests about the design.",
    rating: 5,
    photoUrl:
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=500&h=500&fit=crop",
  },
  {
    id: 22,
    name: "Chloe Walker",
    image: "/feedback/chloe.jpg",
    product: "Wedding Invitation Cards",
    statement:
      "Perfect quality and design. The cards arrived on time and in perfect condition.",
    rating: 5,
    photoUrl:
      "https://images.unsplash.com/photo-1514159096122-eaa9a77dc328?w=500&h=500&fit=crop",
  },
  {
    id: 23,
    name: "Zoey Hall",
    image: "/feedback/zoey.jpg",
    product: "Subscription Service (Monthly)",
    statement:
      "This subscription is worth every penny. Always excited to see what flowers arrive each month.",
    rating: 5,
    photoUrl:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=500&fit=crop",
  },
  {
    id: 24,
    name: "Lily Allen",
    image: "/feedback/lily.jpg",
    product: "Rose Elegance Bouquet",
    statement:
      "Absolutely perfect! The roses were red, vibrant, and long-lasting.",
    rating: 5,
    photoUrl:
      "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=500&h=500&fit=crop",
  },
  {
    id: 25,
    name: "Nora Scott",
    image: "/feedback/nora.jpg",
    product: "Plant Care Consultation",
    statement:
      "Very informative session. The consultant gave practical tips that have helped my plants thrive.",
    rating: 5,
    photoUrl:
      "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=500&h=500&fit=crop",
  },
  {
    id: 26,
    name: "Lucy Green",
    image: "/feedback/lucy.jpg",
    product: "Tulip Paradise Bouquet",
    statement:
      "Gorgeous tulips! They were well-packaged and arrived in perfect condition.",
    rating: 5,
    photoUrl:
      "https://images.unsplash.com/photo-1520763185298-1b434c919abe?w=500&h=500&fit=crop",
  },
  {
    id: 27,
    name: "Sophie Turner",
    image: "/feedback/sophie.jpg",
    product: "Table Arrangement Set",
    statement:
      "Stunning table arrangements. Made my home look like a luxury hotel.",
    rating: 5,
    photoUrl:
      "https://images.unsplash.com/photo-1557672172-298e090d0f80?w=500&h=500&fit=crop",
  },
  {
    id: 28,
    name: "Ella Phillips",
    image: "/feedback/ella.jpg",
    product: "Gift Hamper Deluxe",
    statement:
      "My friend loved it! The hamper was beautifully arranged with premium items.",
    rating: 5,
    photoUrl:
      "https://images.unsplash.com/photo-1506755855726-48249a8a7d67?w=500&h=500&fit=crop",
  },
  {
    id: 29,
    name: "Stella Campbell",
    image: "/feedback/stella.jpg",
    product: "Wedding Florals Package",
    statement:
      "Absolutely magical florals for our special day. The entire team was wonderful to work with.",
    rating: 5,
    photoUrl:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=500&h=500&fit=crop",
  },
  {
    id: 30,
    name: "Victoria Parker",
    image: "/feedback/victoria.jpg",
    product: "Aster Delight Bouquet",
    statement: "Colorful and fresh! Perfect for brightening up my workspace.",
    rating: 5,
    photoUrl:
      "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=500&h=500&fit=crop",
  },
  {
    id: 31,
    name: "Emma White",
    image: "/feedback/emma-white.jpg",
    product: "Corporate Event Arrangement",
    statement:
      "Professional service and beautiful flowers. Great attention to detail.",
    rating: 5,
    photoUrl:
      "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?w=500&h=500&fit=crop",
  },
  {
    id: 32,
    name: "Ivy Martin",
    image: "/feedback/ivy.jpg",
    product: "Special Mixed Bouquet",
    statement:
      "Loved the variety in this bouquet. Each flower was fresh and beautiful.",
    rating: 4,
    photoUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop",
  },
  {
    id: 33,
    name: "Ruby Garcia",
    image: "/feedback/ruby.jpg",
    product: "Debut Invitation Cards",
    statement:
      "The invitations were classy and elegant. Perfect for my daughter's debut.",
    rating: 5,
    photoUrl:
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=500&h=500&fit=crop",
  },
  {
    id: 34,
    name: "Hazel Rodriguez",
    image: "/feedback/hazel.jpg",
    product: "Wedding Invitation Cards",
    statement:
      "Beautiful cards with excellent quality paper. Guests were impressed!",
    rating: 5,
    photoUrl:
      "https://images.unsplash.com/photo-1514159096122-eaa9a77dc328?w=500&h=500&fit=crop",
  },
  {
    id: 35,
    name: "Violet Davis",
    image: "/feedback/violet.jpg",
    product: "Subscription Service (Weekly)",
    statement:
      "Fantastic service! I look forward to my weekly flower delivery every week.",
    rating: 5,
    photoUrl:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=500&fit=crop",
  },
  {
    id: 36,
    name: "Rose Johnson",
    image: "/feedback/rose.jpg",
    product: "Rose Elegance Bouquet",
    statement:
      "Perfect gift for my anniversary. Beautiful and romantic arrangement.",
    rating: 5,
    photoUrl:
      "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=500&h=500&fit=crop",
  },
  {
    id: 37,
    name: "Daisy Wilson",
    image: "/feedback/daisy.jpg",
    product: "Plant Care Consultation",
    statement:
      "The consultant was knowledgeable and helpful. My plants are doing so much better now.",
    rating: 5,
    photoUrl:
      "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=500&h=500&fit=crop",
  },
  {
    id: 38,
    name: "Jasmine Brown",
    image: "/feedback/jasmine.jpg",
    product: "Tulip Paradise Bouquet",
    statement:
      "Amazing tulips in vibrant colors. Great quality and presentation.",
    rating: 5,
    photoUrl:
      "https://images.unsplash.com/photo-1520763185298-1b434c919abe?w=500&h=500&fit=crop",
  },
  {
    id: 39,
    name: "Iris Taylor",
    image: "/feedback/iris.jpg",
    product: "Table Arrangement Set",
    statement:
      "Transformed my dining room! The arrangements were elegant and sophisticated.",
    rating: 5,
    photoUrl:
      "https://images.unsplash.com/photo-1557672172-298e090d0f80?w=500&h=500&fit=crop",
  },
  {
    id: 40,
    name: "Poppy Harris",
    image: "/feedback/poppy.jpg",
    product: "Gift Hamper Premium",
    statement:
      "Luxurious hamper with premium products. Recipient was very happy!",
    rating: 5,
    photoUrl:
      "https://images.unsplash.com/photo-1506755855726-48249a8a7d67?w=500&h=500&fit=crop",
  },
  {
    id: 41,
    name: "Liliana Thomas",
    image: "/feedback/liliana.jpg",
    product: "Wedding Florals Package",
    statement:
      "Spectacular floral designs. Made our wedding look like a dream come true.",
    rating: 5,
    photoUrl:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=500&h=500&fit=crop",
  },
  {
    id: 42,
    name: "Magnolia Jackson",
    image: "/feedback/magnolia.jpg",
    product: "Aster Delight Bouquet",
    statement:
      "Bright and cheerful flowers. Exactly what I needed to brighten my day.",
    rating: 5,
    photoUrl:
      "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=500&h=500&fit=crop",
  },
  {
    id: 43,
    name: "Camellia White",
    image: "/feedback/camellia.jpg",
    product: "Corporate Event Arrangement",
    statement:
      "Excellent flowers and service. Our corporate event looked amazing.",
    rating: 5,
    photoUrl:
      "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?w=500&h=500&fit=crop",
  },
  {
    id: 44,
    name: "Orchid Moore",
    image: "/feedback/orchid.jpg",
    product: "Special Mixed Bouquet",
    statement:
      "Diverse selection of fresh flowers. Loved every bloom in this bouquet.",
    rating: 5,
    photoUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop",
  },
  {
    id: 45,
    name: "Peony Clark",
    image: "/feedback/peony.jpg",
    product: "Debut Invitation Cards",
    statement: "Elegant and beautiful. My daughter loved her invitations!",
    rating: 5,
    photoUrl:
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=500&h=500&fit=crop",
  },
  {
    id: 46,
    name: "Blossem Lewis",
    image: "/feedback/blossom.jpg",
    product: "Wedding Invitation Cards",
    statement:
      "Premium quality cards with stunning design. Highly professional!",
    rating: 5,
    photoUrl:
      "https://images.unsplash.com/photo-1514159096122-eaa9a77dc328?w=500&h=500&fit=crop",
  },
  {
    id: 47,
    name: "Petal Young",
    image: "/feedback/petal.jpg",
    product: "Subscription Service (Monthly)",
    statement:
      "Best decision ever! Fresh flowers every month keeps my home beautiful.",
    rating: 5,
    photoUrl:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=500&fit=crop",
  },
  {
    id: 48,
    name: "Fern King",
    image: "/feedback/fern.jpg",
    product: "Rose Elegance Bouquet",
    statement: "Premium quality roses. Perfect for special occasions.",
    rating: 5,
    photoUrl:
      "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=500&h=500&fit=crop",
  },
  {
    id: 49,
    name: "Coral Hayes",
    image: "/feedback/coral.jpg",
    product: "Plant Care Consultation",
    statement:
      "Expert advice that really made a difference. My plants are thriving!",
    rating: 5,
    photoUrl:
      "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=500&h=500&fit=crop",
  },
  {
    id: 50,
    name: "Sage Bennett",
    image: "/feedback/sage.jpg",
    product: "Tulip Paradise Bouquet",
    statement:
      "Fresh, vibrant, and beautifully arranged. Would order again in a heartbeat.",
    rating: 5,
    photoUrl:
      "https://images.unsplash.com/photo-1520763185298-1b434c919abe?w=500&h=500&fit=crop",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={16}
          className={`${
            i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}

function FeedbackCard({ feedback }: { feedback: FeedbackItem }) {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition">
      {/* Attached Photo */}
      {feedback.photoUrl && (
        <div className="w-full h-48 overflow-hidden bg-gray-200">
          <img
            src={feedback.photoUrl || "/placeholder.svg"}
            alt={`${feedback.name}'s feedback photo`}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Feedback Content */}
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="shrink-0">
            <img
              src={feedback.image || "/placeholder.svg"}
              alt={feedback.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-primary"
            />
          </div>
          <div className="grow">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold text-foreground">
                  {feedback.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feedback.product}
                </p>
              </div>
            </div>
            <StarRating rating={feedback.rating} />
            <p className="text-sm text-foreground mt-3 leading-relaxed">
              {feedback.statement}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FeedbackPage() {
  const [showAll, setShowAll] = useState(false);
  const displayedFeedback = showAll ? feedbackData : feedbackData.slice(0, 10);

  return (
    <PublicLayout>
      <main className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12 py-16">
          {/* Page Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Customer Feedback
            </h1>
            <p className="text-lg text-muted-foreground">
              See what our customers think about our products and services
            </p>
          </div>

          {/* Feedback Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {displayedFeedback.map((feedback) => (
              <FeedbackCard key={feedback.id} feedback={feedback} />
            ))}
          </div>

          {/* View All Button */}
          {!showAll && feedbackData.length > 10 && (
            <div className="flex justify-center">
              <Button
                onClick={() => setShowAll(true)}
                className="px-8 py-6 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full"
              >
                View All {feedbackData.length} Feedbacks
              </Button>
            </div>
          )}

          {/* Show Less Button */}
          {showAll && (
            <div className="flex justify-center">
              <Button
                onClick={() => setShowAll(false)}
                className="px-8 py-6 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full"
              >
                Show Less
              </Button>
            </div>
          )}

          {/* Feedback Count */}
          <div className="text-center mt-8 text-muted-foreground">
            Showing {displayedFeedback.length} of {feedbackData.length}{" "}
            feedbacks
          </div>
        </div>
      </main>
    </PublicLayout>
  );
}
