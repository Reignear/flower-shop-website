import { useParams } from "react-router-dom";
import { useProductID } from "@/tanstack/fetch.hook";
export const insertTitle = "Insert New Product";
export const editTitle = "Edit Product";
export const deleteTitle = "Delete Product";

export const insertDescription =
  "Fill out the form below to add a new product to the inventory.";
export const editDescription =
  "Modify the details of the product as needed and save your changes.";
export const deleteDescription =
  "Are you sure you want to delete this product? This action cannot be undone.";

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
