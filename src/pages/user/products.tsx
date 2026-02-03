import UserLayout from "@/components/layout/user-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const purchasedProducts = [
  {
    id: 1,
    name: "Rose Elegance Bouquet",
    category: "Bouquets",
    purchaseDate: "2024-01-15",
    price: "$70.99",
    quantity: 1,
    image: "/red-roses-bouquet.png",
  },
  {
    id: 2,
    name: "Tulip Paradise Bouquet",
    category: "Bouquets",
    purchaseDate: "2024-01-10",
    price: "$79.99",
    quantity: 2,
    image: "/tulip-flowers-bouquet.jpg",
  },
  {
    id: 3,
    name: "Wedding Invitation Cards",
    category: "Invitations",
    purchaseDate: "2024-01-05",
    price: "$120.00",
    quantity: 150,
    image: "/tulip-flowers-bouquet.jpg",
  },
  {
    id: 4,
    name: "Gift Hamper Deluxe",
    category: "Gifts",
    purchaseDate: "2024-01-01",
    price: "$150.00",
    quantity: 1,
    image: "/red-roses-bouquet.png",
  },
  {
    id: 5,
    name: "Special Mixed Bouquet",
    category: "Bouquets",
    purchaseDate: "2023-12-28",
    price: "$95.99",
    quantity: 1,
    image: "/tulip-flowers-bouquet.jpg",
  },
  {
    id: 6,
    name: "Aster Delight Bouquet",
    category: "Bouquets",
    purchaseDate: "2023-12-24",
    price: "$70.99",
    quantity: 3,
    image: "/red-roses-bouquet.png",
  },
];

export default function ProductsPage() {
  return (
    <UserLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            My Products
          </h1>
          <p className="text-muted-foreground">All products you've purchased</p>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6 flex-wrap">
          <Button className="bg-primary text-primary-foreground">
            All Products
          </Button>
          <Button variant="outline">Bouquets</Button>
          <Button variant="outline">Gifts</Button>
          <Button variant="outline">Invitations</Button>
          <Button variant="outline">Services</Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {purchasedProducts.map((product) => (
            <Card
              key={product.id}
              className="overflow-hidden hover:shadow-lg transition"
            >
              <div className="h-48 bg-gray-200 overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-110 transition duration-300"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-foreground">
                    {product.name}
                  </h3>
                  <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                    {product.category}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Qty: {product.quantity}
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  Purchased: {product.purchaseDate}
                </p>
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-lg text-foreground">
                    {product.price}
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      Reorder
                    </Button>
                    <Button size="sm" variant="outline">
                      Review
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Purchase Summary */}
        <Card className="mt-8 p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Purchase Summary
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Products</p>
              <p className="text-3xl font-bold text-foreground">6</p>
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
      </div>
    </UserLayout>
  );
}
