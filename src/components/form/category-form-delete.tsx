/* eslint-disable react-hooks/incompatible-library */
import { capitalizeFirstLetter } from "@/utils/capitalize";
import type { Category } from "@/utils/interface";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useDeleteCategory } from "@/tanstack/category.mutation";
interface CategoryFormDeleteProps {
  category: Category;
  setDeleteCategory: (open: boolean) => void;
}
export default function CategoryFormDelete({
  category,
  setDeleteCategory,
}: CategoryFormDeleteProps) {
  const deleteCategoryMutation = useDeleteCategory();
  const { register, handleSubmit, watch } = useForm();
  const deleteConfirmation = watch("deleteConfirmation");

  const match = capitalizeFirstLetter(category.name) === deleteConfirmation;
  const onSubmit = async () => {
    if (match) {
      try {
        await deleteCategoryMutation.mutateAsync({ category });
        setDeleteCategory(false);
      } catch (error) {
        console.log("Error in deleting category", error);
      }
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <p className="text-red-600 text-sm">
          Type <strong>"{capitalizeFirstLetter(category.name)}"</strong> to
          delete the category
        </p>
        <Input {...register("deleteConfirmation")} />
        <Button
          variant={"destructive"}
          className="w-full"
          disabled={deleteCategoryMutation.isPending || !match}
        >
          {deleteCategoryMutation.isPending ? "Deleting..." : "Delete"}
        </Button>
      </div>
    </form>
  );
}
