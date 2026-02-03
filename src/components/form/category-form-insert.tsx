/* eslint-disable @typescript-eslint/no-explicit-any */
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAdminCategory } from "@/hooks/use-admin-category";
import type { Category } from "@/utils/interface";
import { handleImageChange, ImagePreview } from "@/utils/image";
import { useInsertCategory } from "@/tanstack/category.mutation";

interface CategoryFormInsertProps {
  setOpenInsert: (open: boolean) => void;
}
export default function CategoryFormInsert({
  setOpenInsert,
}: CategoryFormInsertProps) {
  const { register, handleSubmit, image, setImage } = useAdminCategory();

  const insertCategoryMutation = useInsertCategory();
  const submitForm = async (data: Category) => {
    try {
      await insertCategoryMutation.mutateAsync({ data, image });
      setOpenInsert(false);
    } catch (error) {
      console.log("Error in inserting category", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <div className="space-y-5">
        <div className="space-y-2">
          <Label>Image</Label>
          <label className="max-w relative block h-40 rounded-md shadow-xs hover:cursor-pointer">
            {image ? (
              <img
                src={ImagePreview(image)}
                alt=""
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
          <Label>Name</Label>
          <Input {...register("name", { required: true })} />
        </div>
        <div className="space-y-2">
          <Label>Description</Label>
          <Textarea {...register("description", { required: true })} />
        </div>
        <div>
          <Button
            className="w-full"
            disabled={insertCategoryMutation.isPending}
            type="submit"
          >
            {insertCategoryMutation.isPending ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </div>
    </form>
  );
}
