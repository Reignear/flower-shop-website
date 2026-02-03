import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Filter } from "lucide-react";
import { useState } from "react";
import PublicLayout from "@/components/layout/public-layout";
import type { Category } from "@/utils/types";

export default function Product() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");

  const products = [
    {
      id: 1,
      name: "Rose Elegance Bouquet",
      price: "$45.99",
      category: "bouquets",
      image: "/pink-rose-bouquet-flowers.jpg",
      isNew: true,
      description: "Beautiful arrangement of premium red roses",
    },
    {
      id: 2,
      name: "Tulip Paradise",
      price: "$35.99",
      category: "bouquets",
      image: "/tulip-bouquet-flowers.jpg",
      isNew: false,
      description: "Vibrant tulips in assorted spring colors",
    },
    {
      id: 3,
      name: "Aster Delight",
      price: "$32.99",
      category: "bouquets",
      image: "/red-aster-bouquet-flowers.jpg",
      isNew: true,
      description: "Charming red asters with greenery",
    },
    {
      id: 4,
      name: "Special Mixed Bouquet",
      price: "$55.99",
      category: "bouquets",
      image: "/special-mixed-bouquet-flowers.jpg",
      isNew: false,
      description: "Premium mix of seasonal flowers",
    },
    // Wedding Invitations
    {
      id: 5,
      name: "Floral Wedding Invitation",
      price: "$2.99",
      category: "invitations",
      image: "/tulip-bouquet-flowers.jpg",
      isNew: true,
      description: "Elegant floral-themed wedding invitation cards",
    },
    {
      id: 6,
      name: "Classic Rose Invitation",
      price: "$2.50",
      category: "invitations",
      image: "/pink-rose-bouquet-flowers.jpg",
      isNew: false,
      description: "Timeless rose design for wedding announcements",
    },
    {
      id: 7,
      name: "Minimalist Wedding Card",
      price: "$2.75",
      category: "invitations",
      image: "/special-mixed-bouquet-flowers.jpg",
      isNew: true,
      description: "Modern minimal design with botanical accents",
    },
    // Debut Invitations
    {
      id: 8,
      name: "Elegant Debut Invitation",
      price: "$1.99",
      category: "invitations",
      image: "/red-aster-bouquet-flowers.jpg",
      isNew: false,
      description: "Sophisticated debut invitation design",
    },
    {
      id: 9,
      name: "Floral Debut Card",
      price: "$2.25",
      category: "invitations",
      image: "/tulip-bouquet-flowers.jpg",
      isNew: true,
      description: "Flower-inspired debut celebration card",
    },
    // Gift Arrangements
    {
      id: 10,
      name: "Gift Box with Flowers",
      price: "$65.99",
      category: "gifts",
      image: "/flower-gift-hand.jpg",
      isNew: true,
      description: "Premium flowers in elegant gift box",
    },
    {
      id: 11,
      name: "Luxury Hamper Set",
      price: "$89.99",
      category: "gifts",
      image: "/flower-arrangement-delivery.jpg",
      isNew: false,
      description: "Flowers with premium chocolates and wine",
    },
    // Arrangements
    {
      id: 12,
      name: "Table Centerpiece",
      price: "$49.99",
      category: "arrangements",
      image: "/special-mixed-bouquet-flowers.jpg",
      isNew: false,
      description: "Perfect for events and celebrations",
    },
  ];

  const categories: { value: Category; label: string }[] = [
    { value: "all", label: "All Products" },
    { value: "bouquets", label: "Bouquets" },
    { value: "invitations", label: "Invitations" },
    { value: "gifts", label: "Gifts" },
    { value: "arrangements", label: "Arrangements" },
  ];

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <PublicLayout>
      <main className="bg-background">
        {/* Page Header */}
        <section className="px-4 md:px-8 lg:px-12 py-12 md:py-20 border-b border-border">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
              Our Products
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Explore our complete collection of premium flowers, gifts, and
              special occasion items crafted with love and care.
            </p>
          </div>
        </section>

        {/* Products Section */}
        <section className="px-4 md:px-8 lg:px-12 py-12 md:py-20">
          <div className="max-w-7xl mx-auto">
            {/* Category Filter */}
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="w-5 h-5 text-foreground" />
                <h3 className="text-lg font-semibold text-foreground">
                  Filter by Category
                </h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setSelectedCategory(cat.value)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === cat.value
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground hover:bg-muted/80"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className="group overflow-hidden bg-card border-border hover:shadow-lg transition-shadow flex flex-col"
                >
                  <div className="relative aspect-square overflow-hidden bg-muted">
                    {product.isNew && (
                      <div className="absolute top-4 left-4 z-10 bg-foreground text-background px-3 py-1 rounded-full text-xs font-bold">
                        New!
                      </div>
                    )}
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 flex flex-col grow">
                    <h3 className="font-semibold text-foreground mb-1 line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3 grow line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between mt-auto">
                      <p className="text-lg font-bold text-foreground">
                        {product.price}
                      </p>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full"
                      >
                        <Heart className="w-5 h-5" />
                      </Button>
                    </div>
                    <Button className="w-full mt-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90">
                      Add to Cart
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12">
                <p className="text-lg text-muted-foreground">
                  No products found in this category.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
    </PublicLayout>
  );
}
