import { useParams } from "react-router-dom";
import { useProductID } from "@/tanstack/fetch.hook";


export function useViewProductBreadCrumb() {
  const { id: productId } = useParams();
  const { data: product } = useProductID(Number(productId));

  return [
    { label: "Dashboard", href: "/admin/dashboard" },
    { label: "Product", href: "/admin/products" },
    {
      label: `${product?.name || "Loading..."}`,
      href: `/admin/product/${productId}`,
    },
  ];
}
