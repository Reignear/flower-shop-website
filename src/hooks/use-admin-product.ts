import type { Product } from "@/utils/interface";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const useAdminProduct = () => {
  const [image, setImage] = useState<File | null>(null);
  const { register, handleSubmit, control } = useForm<Product>();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [openInsert, setOpenInsert] = useState(false);
  const [openDelete, setOpenDelete] = useState<string | null>(null);
  const [openUpdate, setOpenUpdate] = useState<string | null>(null);
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  return {
    image,
    setImage,
    register,
    handleSubmit,
    openDelete,
    setOpenDelete,
    control,
    openInsert,
    setOpenInsert,
    layout,
    setLayout,
    activeCategory,
    setActiveCategory,
    openUpdate,
    setOpenUpdate,
  };
};
