import type { Category } from "@/utils/interface";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const useAdminCategory = () => {
  const { register, handleSubmit, watch } = useForm<Category>();
  const [image, setImage] = useState<File | null>(null);
  const [openInsert, setOpenInsert] = useState(false);
  const [editCategory, setEditCategory] = useState<string | null>(null);
  const [deleteCategory, setDeleteCategory] = useState(false);
  return {
    register,
    handleSubmit,
    watch,
    image,
    setImage,
    openInsert,
    setOpenInsert,
    editCategory,
    setEditCategory,
    deleteCategory,
    setDeleteCategory,
  };
};
