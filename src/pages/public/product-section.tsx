import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProductSection() {
  const products = [
    {
      name: "Aster Bouquet",
      price: "$27.23",
      image:
        "https://imgs.search.brave.com/qEUa5ir21yKDh-0lZxaJfjImDM1zwxXLPb785BLRQ6I/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZS5zaHV0dGVyc3Rv/Y2suY29tL2ltYWdl/LXBob3RvL2RyeS1m/cmVzaC1mbG93ZXJz/LWZsYXQtbGF5b3V0/LTI2MG53LTI0OTQ5/NTg0NzcuanBn",
      isNew: true,
    },
    {
      name: "Rose Bouquet",
      price: "$27.00",
      image:
        "https://imgs.search.brave.com/qEUa5ir21yKDh-0lZxaJfjImDM1zwxXLPb785BLRQ6I/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZS5zaHV0dGVyc3Rv/Y2suY29tL2ltYWdl/LXBob3RvL2RyeS1m/cmVzaC1mbG93ZXJz/LWZsYXQtbGF5b3V0/LTI2MG53LTI0OTQ5/NTg0NzcuanBn",
      isNew: true,
    },
    {
      name: "Tulip Bouquet",
      price: "$20.99",
      image:
        "https://imgs.search.brave.com/qEUa5ir21yKDh-0lZxaJfjImDM1zwxXLPb785BLRQ6I/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZS5zaHV0dGVyc3Rv/Y2suY29tL2ltYWdl/LXBob3RvL2RyeS1m/cmVzaC1mbG93ZXJz/LWZsYXQtbGF5b3V0/LTI2MG53LTI0OTQ5/NTg0NzcuanBn",
      isNew: false,
    },
    {
      name: "Special Bouquet",
      price: "$50.99",
      image:
        "https://imgs.search.brave.com/qEUa5ir21yKDh-0lZxaJfjImDM1zwxXLPb785BLRQ6I/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZS5zaHV0dGVyc3Rv/Y2suY29tL2ltYWdl/LXBob3RvL2RyeS1m/cmVzaC1mbG93ZXJz/LWZsYXQtbGF5b3V0/LTI2MG53LTI0OTQ5/NTg0NzcuanBn",
      isNew: false,
    },
  ];
  return (
    <main className="px-4 md:px-8 lg:px-12 py-12 md:py-20 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <p className="text-sm font-semibold text-muted-foreground mb-2 uppercase">
              Product
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
              Our Best Sellers This Month
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <Card
              key={index}
              className="group overflow-hidden bg-card border-border hover:shadow-lg transition-shadow"
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
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold text-foreground">
                    {product.price}
                  </p>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Heart className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <div>
          <Link to="/products" className="flex justify-start mt-8">
            <Button
              size="lg"
              className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
