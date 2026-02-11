import UserLayout from "@/components/layout/user-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCategory, useProduct } from "@/tanstack/fetch.hook";
import { useUserProduct } from "@/hooks/use-user-product";
import { pageTitle, pageDescription } from "@/data/user-product-data";
import { capitalizeFirstLetter } from "@/utils/capitalize";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import Skeleton from "react-loading-skeleton";
import { OrbitProgress } from "react-loading-indicators";
import { productBreadCrumb } from "@/data/user-product-data";

export default function ProductsPage() {
  const { activeCategory, setActiveCategory, imageLoaded, setImageLoaded } =
    useUserProduct();
  const { data: product = [], isLoading: isProductLoading } = useProduct();
  const { data: category = [], isLoading: isCategoryLoading } = useCategory();

  const filteredProducts =
    activeCategory === "all"
      ? product
      : product.filter((prod) => prod.category_id === activeCategory);

  const totalProducts = product.length;
  return (
    <UserLayout breadCrumbs={productBreadCrumb}>
      <div className="p-8 space-y-5">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {pageTitle}
          </h1>
          <p className="text-muted-foreground">{pageDescription}</p>
        </div>
        {/* Purchase Summary */}
        <Card className="mt-8 p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Purchase Summary
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Products</p>
              <p className="text-3xl font-bold text-foreground">
                {totalProducts}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Purchases</p>
              <p className="text-3xl font-bold text-foreground">8</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Spent</p>
              <p className="text-3xl font-bold text-foreground">$587.96</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg Order Value</p>
              <p className="text-3xl font-bold text-foreground">$73.50</p>
            </div>
          </div>
        </Card>
        {/* Filters */}
        <div className="flex gap-2 justify-between">
          <Select value={activeCategory} onValueChange={setActiveCategory}>
            <SelectTrigger className="w-full max-w-sm">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categories</SelectLabel>
                <SelectItem value="all">All</SelectItem>
                {isCategoryLoading ? (
                  <Skeleton className="w-full max-w-sm h-10 rounded-md" />
                ) : (
                  category.map((cat) => (
                    <SelectItem
                      key={cat.name}
                      value={cat.name}
                      onClick={() => setActiveCategory(cat.name)}
                    >
                      {cat.name}
                    </SelectItem>
                  ))
                )}

                <Separator className="my-1" />
                <Link to="user/product/customize">
                  <button className="p-2 w-full text-start text-sm hover:cursor-pointer hover:bg-primary/10 rounded-md text-primary">
                    Customize Order
                  </button>
                </Link>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isProductLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-200 w-full h-80 rounded-lg skeleton-effect"
                >
                  <Skeleton width="100%" height={80} />
                </div>
              ))
            : filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className="overflow-hidden hover:shadow-lg transition "
                >
                  <div className="h-48  overflow-hidden flex items-center justify-center bg-gray-100">
                    {!imageLoaded && (
                      <OrbitProgress
                        variant="spokes"
                        dense
                        color="#b2b2b2"
                        size="medium"
                      />
                    )}
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className={`w-full h-full object-cover hover:scale-110 transition duration-300 ${!imageLoaded ? "hidden" : ""}`}
                      onLoad={() => setImageLoaded(true)}
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-foreground">
                        {capitalizeFirstLetter(product.name)}
                      </h3>
                      <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                        {product.code}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {capitalizeFirstLetter(product.status)}
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Category: {capitalizeFirstLetter(product.category_id)}
                    </p>
                    <div className="flex justify-between items-center">
                      <p className="font-semibold text-lg text-foreground">
                        ₱ {product.price}
                      </p>
                      <div className="flex gap-2">
                        <Link to={`/user/products/${product.id}`}>
                          <Button size="sm" variant="default">
                            View
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
        </div>
        {!isProductLoading && filteredProducts.length === 0 && (
          <div className="text-center py-10">
            <p className="text-muted-foreground">No products found.</p>
          </div>
        )}
      </div>
    </UserLayout>
  );
}
