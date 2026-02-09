/* eslint-disable @typescript-eslint/no-explicit-any */
import { handleImageChange, ImagePreview } from "@/utils/image";
import { Input } from "@/components/ui/input";
import { useAdminProduct } from "@/hooks/use-admin-product";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import type { Product } from "@/utils/interface";
import { capitalizeFirstLetter } from "@/utils/capitalize";
import { Controller } from "react-hook-form";
import { useUpdateProduct } from "@/tanstack/product.mutation";
import { useCategory } from "@/tanstack/fetch.hook";
import { useEffect } from "react";
interface ProductFormInsertProps {
  product_id: string;
  product: Product;
  old_path: string | null;
  setOpenUpdate: (open: boolean) => void;
}

export default function ProductFormUpdate({
  product_id,
  product,
  old_path,
  setOpenUpdate,
}: ProductFormInsertProps) {
  const { image, setImage, register, handleSubmit, control } =
    useAdminProduct();

  const updateProductMutation = useUpdateProduct();
  const { data: category = [] } = useCategory();

  const onSubmit = async (product: Product) => {
    try {
      await updateProductMutation.mutateAsync({
        product_id,
        product,
        image,
        old_path,
      });
      setOpenUpdate(false);
    } catch (error) {
      console.log("Error in updating product", error);
    }
  };

  useEffect(() => {
    setImage(product.image_url);
  }, [product.image_url, setImage]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <main className="grid grid-cols-2 gap-5">
        <div>
          <label className="max-w relative block h-full rounded-md shadow-xs hover:cursor-pointer">
            {image ? (
              <img
                src={ImagePreview(image)}
                alt=""
                className="h-full w-full rounded-md object-cover"
              />
            ) : (
              <div className="h-full">
                <div className="flex h-full w-full items-center justify-center rounded-md bg-gray-200">
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
        <div className="space-y-2 grid grid-cols-2 gap-2">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input
              {...register("name")}
              defaultValue={product.name}
              required
            ></Input>
          </div>
          <div className="space-y-2">
            <Label>Code</Label>
            <Input defaultValue={product.code} disabled></Input>
          </div>
          <div className="space-y-2 col-span-2">
            <Label>Description</Label>
            <Textarea
              {...register("description")}
              defaultValue={product.description}
            ></Textarea>
          </div>
          <div className="space-y-2 col-span-2">
            <Label>Category</Label>
            <Controller
              name="category_id"
              control={control}
              defaultValue={
                category
                  .find((cat) => cat.name === product.category_id)
                  ?.id?.toString() || ""
              }
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value || ""}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {category?.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id.toString()}>
                        {capitalizeFirstLetter(cat.name)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="space-y-2 ">
            <Label>Price</Label>
            <Input
              type="number"
              {...register("price")}
              defaultValue={product.price}
              required
            ></Input>
          </div>
          <div className="space-y-2 ">
            <Label>Status</Label>
            <Controller
              name="status"
              control={control}
              defaultValue={product.status}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unavailable">Unavailable</SelectItem>
                    <SelectItem value="available">Available</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="col-span-2">
            <Button
              className="w-full"
              type="submit"
              disabled={updateProductMutation.isPending}
            >
              {updateProductMutation.isPending
                ? "Loading..."
                : "Update Product"}
            </Button>
          </div>
        </div>
      </main>
    </form>
  );
}
