import type { Product } from "@/utils/interface";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const useAdminProduct = () => {
  const [image, setImage] = useState<File | null>(null);
  const { register, handleSubmit, control } = useForm<Product>();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [layout, setLayout] = useState<"grid" | "table">("grid");
  const [search, setSearch] = useState("");

  return {
    image,
    setImage,
    register,
    handleSubmit,
    control,
    layout,
    setLayout,
    activeCategory,
    setActiveCategory,
    search,
    setSearch,
  };
};
