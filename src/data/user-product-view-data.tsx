import { useProductID } from "@/tanstack/fetch.hook";
import { useParams } from "react-router-dom";

export function ProductViewBreadCrumb() {
    const{id: productId} = useParams();
    const {data: product} = useProductID(Number(productId));
    return [
    { label: "Dashboard", href: "/user/dashboard" },
    { label: "Product", href: "/user/products" },
    {
      label: `${product?.name || "Loading..."}`,
      href: `/user/product/${productId}`,
    },
  ];
}