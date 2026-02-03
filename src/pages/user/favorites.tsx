import UserLayout from "@/components/layout/user-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

const favorites = [
  {
    id: 1,
    name: "Rose Elegance Bouquet",
    price: "$70.99",
    rating: 5,
    reviews: 234,
    image: "/red-roses-bouquet.png",
    category: "Bouquets",
  },
  {
    id: 2,
    name: "Tulip Paradise Bouquet",
    price: "$79.99",
    rating: 4.8,
    reviews: 189,
    image: "/tulip-flowers-bouquet.jpg",
    category: "Bouquets",
  },
  {
    id: 3,
    name: "Premium Wedding Package",
    price: "$500.00",
    rating: 5,
    reviews: 45,
    image: "/red-roses-bouquet.png",
    category: "Services",
  },
  {
    id: 4,
    name: "Luxury Gift Hamper",
    price: "$150.00",
    rating: 4.9,
    reviews: 123,
    image: "/tulip-flowers-bouquet.jpg",
    category: "Gifts",
  },
  {
    id: 5,
    name: "Special Mixed Bouquet",
    price: "$95.99",
    rating: 4.7,
    reviews: 98,
    image: "/red-roses-bouquet.png",
    category: "Bouquets",
  },
  {
    id: 6,
    name: "Aster Delight Bouquet",
    price: "$70.99",
    rating: 4.6,
    reviews: 76,
    image: "/tulip-flowers-bouquet.jpg",
    category: "Bouquets",
  },
];

export default function Favorite() {
  return (
    <UserLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            My Favorites
          </h1>
          <p className="text-muted-foreground">
            Your wishlist and favorite products
          </p>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6 flex-wrap">
          <Button className="bg-primary text-primary-foreground">
            All Favorites
          </Button>
          <Button variant="outline">Bouquets</Button>
          <Button variant="outline">Gifts</Button>
          <Button variant="outline">Services</Button>
        </div>

        {/* Favorites Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {favorites.map((favorite) => (
            <Card
              key={favorite.id}
              className="overflow-hidden hover:shadow-lg transition group"
            >
              <div className="relative h-48 bg-gray-200 overflow-hidden">
                <img
                  src={favorite.image || "/placeholder.svg"}
                  alt={favorite.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                />
                <button className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition">
                  <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                </button>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-foreground">
                    {favorite.name}
                  </h3>
                  <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                    {favorite.category}
                  </span>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={
                          i < Math.floor(favorite.rating)
                            ? "text-yellow-400 text-sm"
                            : "text-gray-300 text-sm"
                        }
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({favorite.reviews})
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <p className="font-semibold text-lg text-foreground">
                    {favorite.price}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="bg-primary text-primary-foreground"
                    >
                      Buy Now
                    </Button>
                    <Button size="sm" variant="outline">
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Favorites Summary */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Favorites Summary
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Favorites</p>
              <p className="text-3xl font-bold text-foreground">18</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Value</p>
              <p className="text-3xl font-bold text-foreground">$1,892</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg Rating</p>
              <p className="text-3xl font-bold text-foreground">4.8★</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Recent Added</p>
              <p className="text-3xl font-bold text-foreground">3</p>
            </div>
          </div>
        </Card>
      </div>
    </UserLayout>
  );
}
