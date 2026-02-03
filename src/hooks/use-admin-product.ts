import type { Product } from "@/utils/interface";
import type { Category } from "@/utils/interface";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const useAdminProduct = () => {
  const [image, setImage] = useState<File | null>(null);
  const { register, handleSubmit, control } = useForm<Product>();
  const [category, setCategory] = useState<Category[] | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [product, setProduct] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [openInsert, setOpenInsert] = useState(false);
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  return {
    image,
    setImage,
    register,
    handleSubmit,
    category,
    setCategory,
    control,
    loading,
    setLoading,
    openInsert,
    setOpenInsert,
    layout,
    setLayout,
    product,
    setProduct,
    activeCategory,
    setActiveCategory,
  };
};
