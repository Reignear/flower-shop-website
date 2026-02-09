/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import type { Category } from "@/utils/interface";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAdminCategory } from "@/hooks/use-admin-category";
import { handleImageChange, ImagePreview } from "@/utils/image";
import { useUpdateCategory } from "@/tanstack/category.mutation";
import { useEffect } from "react";

interface CategoryFormEditProps {
  category_id: string;
  category: Category;
  setEditCategory: (open: string | null) => void;
  old_path: string | null;
}

export default function CategoryFormEdit({
  category_id,
  category,
  setEditCategory,
  old_path,
}: CategoryFormEditProps) {
  const { register, handleSubmit, image, setImage } = useAdminCategory();
  const updateCategoryMutation = useUpdateCategory();
  const onSubmit = async (category: Category) => {
    try {
      await updateCategoryMutation.mutateAsync({
        id: category_id,
        category,
        image,
        old_path: old_path,
      });
      setEditCategory(null);
    } catch (error) {
      console.log("Error in updating category", error);
    }
  };

  useEffect(() => {
    setImage(category.image_url);
  }, [category.image_url, setImage]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-5">
        <div className="space-y-2">
          <Label>Image</Label>
          <label className="max-w relative block h-40 rounded-md shadow-xs hover:cursor-pointer">
            {image ? (
              <img
                src={ImagePreview(image)}
                alt={category.name}
                className="h-full w-full rounded-md object-cover"
              />
            ) : (
              <div>
                <div className="flex h-40 w-full items-center justify-center rounded-md bg-gray-200">
                  <h1 className="text-muted-foreground text-sm">
                    No image selected
                  </h1>
                </div>
              </div>
            )}
            <Input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e: any) => {
                handleImageChange(e, setImage);
              }}
            />
          </label>
        </div>
        <div className="space-y-2">
          <Label>Name:</Label>
          <Input defaultValue={category.name} {...register("name")}></Input>
        </div>
        <div className="space-y-2">
          <Label>Description:</Label>
          <Textarea
            defaultValue={category.description ?? ""}
            {...register("description")}
          ></Textarea>
        </div>

        <Button
          type="submit"
          variant={"default"}
          className="cursor-pointer w-full"
          disabled={updateCategoryMutation.isPending}
        >
          {updateCategoryMutation.isPending ? "Saving..." : "Save"}
        </Button>
      </div>
    </form>
  );
}
