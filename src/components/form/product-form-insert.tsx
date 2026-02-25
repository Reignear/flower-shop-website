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
import { useInsertProduct } from "@/tanstack/product.mutation";
import { useCategory } from "@/tanstack/fetch.hook";
import { generateCode } from "@/utils/code";
interface ProductFormInsertProps {
  setOpenInsert: (open: boolean) => void;
}

export default function ProductFormInsert({
  setOpenInsert,
}: ProductFormInsertProps) {
  const { image, setImage, register, handleSubmit, control } =
    useAdminProduct();

  const insertProductMutation = useInsertProduct();
  const generatedCode = generateCode();
  const { data: category = [] } = useCategory();

  const onSubmit = async (product: Product) => {
    try {
      await insertProductMutation.mutateAsync({ product, image });
      setOpenInsert(false);
    } catch (error) {
      console.log("Error in inserting product", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <main className="grid grid-cols-2 gap-5">
        <div className="h-full">
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
            <Input {...register("name")} required></Input>
          </div>
          <div className="space-y-2">
            <Label>Code</Label>
            <Input
              placeholder="ex. SF-001"
              {...register("code")}
              value={generatedCode}
              disabled
            ></Input>
          </div>
          <div className="space-y-2 col-span-2">
            <Label>Description</Label>
            <Textarea {...register("description")}></Textarea>
          </div>
          <div className="space-y-2 col-span-2">
            <Label>Category</Label>
            <Controller
              name="category"
              control={control}
              defaultValue={""}
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
            <Input type="number" {...register("price")} required></Input>
          </div>
          <div className="space-y-2 ">
            <Label>Status</Label>
            <Controller
              name="status"
              control={control}
              defaultValue={"available"}
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
              disabled={insertProductMutation.isPending}
            >
              {insertProductMutation.isPending ? "Loading..." : "Add Product"}
            </Button>
          </div>
        </div>
      </main>
    </form>
  );
}
