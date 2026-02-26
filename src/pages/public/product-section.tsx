import { Button } from "@/components/ui/button";
import { capitalizeFirstLetter } from "@/utils/capitalize";
import type { Product } from "@/utils/interface";
import { Link } from "react-router-dom";

interface ProductSectionProps {
  products: Product[];
}

export default function ProductSection({ products }: ProductSectionProps) {
  return (
    <main className="px-4 md:px-8 lg:px-12 py-12 md:py-20 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <p className="text-sm font-semibold text-muted-foreground mb-2 uppercase">
              Product
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
              Our Latest Products
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products?.map((product: Product, index: number) => (
            <div
              key={index}
              className="group overflow-hidden rounded-2xl border hover:shadow-lg transition-shadow"
            >
              <div className="relative aspect-square overflow-hidden bg-muted">
                <img
                  src={product.image_url || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-foreground line-clamp-2">
                  {capitalizeFirstLetter(product.name)}
                </h3>
                <p className="text-muted-foreground mb-2 text-sm line-clamp-1">
                  {capitalizeFirstLetter(product.description)}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold text-foreground">
                    ₱ {product.price}
                  </p>
                </div>
              </div>
            </div>
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
