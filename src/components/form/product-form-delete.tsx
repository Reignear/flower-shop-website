/* eslint-disable @typescript-eslint/no-explicit-any */
import { capitalizeFirstLetter } from "@/utils/capitalize";
import type { Product } from "@/utils/interface";
import { Button } from "@/components/ui/button";
import { useDeleteProduct } from "@/tanstack/product.mutation";
import { useAdminProduct } from "@/hooks/use-admin-product";
import { CustomToast } from "@/components/custom/custom-toast";
import { toast } from "react-hot-toast";
interface ProductFormDeleteProps {
  product: Product;
  setOpenDelete: () => void;
}

export default function ProductFormDelete({
  product,
  setOpenDelete,
}: ProductFormDeleteProps) {
  const { handleSubmit } = useAdminProduct();
  const productDeleteMutation = useDeleteProduct();

  const onSubmit = async () => {
    try {
      await CustomToast(
        productDeleteMutation.mutateAsync({ product }),
        "delete",
      );
      setOpenDelete();
    } catch (error: any) {
         toast.error(error.message);
       }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-5">
        <p className=" text-sm">
          Are you sure do you want to delete{" "}
          <strong className="text-red-600">
            "{capitalizeFirstLetter(product.name)}"
          </strong>{" "}
          product?
        </p>
        <div className="grid grid-cols-2 gap-2">
          <Button onClick={() => setOpenDelete()} type="button">
            Cancel
          </Button>
          <Button
            variant={"destructive"}
            type="submit"
            disabled={productDeleteMutation.isPending}
          >
            {productDeleteMutation.isPending ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>
    </form>
  );
}
