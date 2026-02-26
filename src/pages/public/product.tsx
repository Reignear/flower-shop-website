import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import PublicLayout from "@/components/layout/public-layout";
import type { Category, Product } from "@/utils/interface";
import { useCategory, useProduct } from "@/tanstack/fetch.hook";
import { capitalizeFirstLetter } from "@/utils/capitalize";
import { usePublicProduct } from "@/hooks/use-public-product";
import { Link } from "react-router-dom";
import CustomSkeleton from "@/components/custom/custom-skeleton";

export default function Product() {
  const { activeCategory, setActiveCategory } = usePublicProduct();
  const { data: productsData, isLoading: isProductsLoading } = useProduct();
  console.log(productsData);
  const { data: categoriesData } = useCategory();
  console.log(categoriesData);

  const filteredProducts =
    activeCategory === "all"
      ? productsData || []
      : productsData?.filter(
          (product) => product.category === activeCategory.name,
        ) || [];
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
                <Button
                  onClick={() => setActiveCategory("all")}
                  variant={activeCategory === "all" ? "default" : "outline"}
                  className="px-4 py-2 rounded-full text-sm font-medium transition-all"
                >
                  All
                </Button>
                {categoriesData?.map((category: Category, index) => (
                  <Button
                    key={index}
                    onClick={() => setActiveCategory(category)}
                    variant={
                      activeCategory === category ? "default" : "outline"
                    }
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all`}
                  >
                    {capitalizeFirstLetter(category.name)}
                  </Button>
                ))}
              </div>
            </div>
            {isProductsLoading && (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 4 }).map((_, index) => (
                  <CustomSkeleton key={index} type={"product-card"} />
                ))}
              </div>
            )}
            {/* Products Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product: Product) => (
                <div
                  key={product.id}
                  className="group overflow-hidden border rounded-2xl hover:shadow-lg transition-shadow flex flex-col"
                >
                  <div className="relative aspect-square overflow-hidden bg-muted">
                    <img
                      src={product.image_url}
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
                    </div>
                    <Link
                      to={`/user/products/${product.id}`}
                      className="w-full mt-3"
                    >
                      <Button className="w-full">Add to Cart</Button>
                    </Link>
                  </div>
                </div>
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
