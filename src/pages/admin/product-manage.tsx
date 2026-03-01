/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomDialog from "@/components/custom/custom-dialog";
import ProductFormDelete from "@/components/form/product-form-delete";
import ProductFormUpdate from "@/components/form/product-form-update";
import AdminLayout from "@/components/layout/admin-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AdminProductManageBreadCrumb,
  deleteDescription,
  deleteTitle,
  editDescription,
  editTitle,
  insertDescription,
  insertTitle,
} from "@/data/admin-product-manage-data";
import { useAdminProductManage } from "@/hooks/use-admin-product-manage";
import { useCategory, useProduct } from "@/tanstack/fetch.hook";
import { capitalizeFirstLetter } from "@/utils/capitalize";
import { filterProducts } from "@/utils/filter";
import { Edit, Eye, Search, Trash2, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import ProductFormInsert from "@/components/form/product-form-insert";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast, { Toaster } from "react-hot-toast";
import { CustomToast } from "@/components/custom/custom-toast";
import { useUpdateProductStatus } from "@/tanstack/product.mutation";

export default function ProductManage() {
  const { data: product = [] } = useProduct();
  const { data: category = [] } = useCategory();
  const updateProductStatusMutation = useUpdateProductStatus();
  const {
    openDelete,
    setOpenDelete,
    openUpdate,
    setOpenUpdate,
    activeCategory,
    setActiveCategory,
    search,
    setSearch,
    openInsert,
    setOpenInsert,
  } = useAdminProductManage();

  const filteredProducts =
    activeCategory === "all"
      ? filterProducts(product, search)
      : filterProducts(
          product.filter((p) => p.category === activeCategory),
          search,
        );

  const handleStatusChange = async (id: number, status: string) => {
    try {
      await CustomToast(
        updateProductStatusMutation.mutateAsync({ id, status }),
        "edit",
      );
    } catch (error: any) {
      toast.error(error.message || "Failed to update status");
    }
  };
  return (
    <AdminLayout breadCrumbs={AdminProductManageBreadCrumb}>
      <Toaster position="bottom-right" />
      <div className="p-8 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Products Management
            </h1>
            <p className="text-muted-foreground">
              Manage all products and inventory
            </p>
          </div>
          <CustomDialog
            open={openInsert}
            openChange={setOpenInsert}
            width="md:max-w-4xl"
            title={insertTitle}
            description={insertDescription}
            trigger={
              <Button variant={"customized"}>
                <Plus className="w-5 h-5" /> Add New Product
              </Button>
            }
          >
            <ProductFormInsert setOpenInsert={setOpenInsert} />
          </CustomDialog>
        </div>

        <div className="space-y-2">
          <div className="flex gap-1">
            <Button
              variant={activeCategory === "all" ? "customized" : "outline"}
              onClick={() => setActiveCategory("all")}
            >
              All
            </Button>
            {category?.map((cat) => (
              <Button
                key={cat.id}
                variant={activeCategory === cat.name ? "customized" : "outline"}
                onClick={() => setActiveCategory(cat.name)}
              >
                {capitalizeFirstLetter(cat.name)}
              </Button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Search className="text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div>
          <div className="bg-card rounded-lg border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="text-left py-4 px-6 font-semibold text-muted-foreground">
                      Product
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-muted-foreground">
                      Code
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-muted-foreground">
                      Category
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-muted-foreground">
                      Price
                    </th>

                    <th className="text-left py-4 px-6 font-semibold text-muted-foreground">
                      Status
                    </th>
                    <th className="text-center  py-4 px-6 font-semibold text-muted-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts?.map((product) => (
                    <tr
                      key={product.id}
                      className="border-b border-border hover:bg-muted/30 transition"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-10">
                          <img
                            src={product.image_url}
                            alt={capitalizeFirstLetter(product.name)}
                            className="w-10 h-10 rounded object-cover"
                          />
                          <span className="text-foreground font-medium">
                            {capitalizeFirstLetter(product.name)}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-muted-foreground">
                        {product.code}
                      </td>
                      <td className="py-4 px-6 text-muted-foreground">
                        {capitalizeFirstLetter(product.category)}
                      </td>
                      <td className="py-4 px-6 text-foreground font-semibold">
                        ₱ {product.price}
                      </td>

                      <td className="py-4 px-6">
                        <Select
                          value={product.status}
                          onValueChange={async (value) => {
                            handleStatusChange(product.id, value);
                          }}
                        >
                          <SelectTrigger
                            className={`w-32 ${
                              product.status === "available"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectGroup className="space-y-1">
                                <SelectItem
                                  value="available"
                                  className="bg-green-100 text-green-700 hover:text-green-800 hover:bg-green-200"
                                >
                                  Available
                                </SelectItem>
                                <SelectItem
                                  value="unavailable"
                                  className="bg-red-100 text-red-700 hover:text-red-800 hover:bg-red-200"
                                >
                                  Unavailable
                                </SelectItem>
                              </SelectGroup>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center gap-2">
                          <Link to={`/admin/products/${product.id}`}>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-border text-muted-foreground hover:bg-muted p-2 bg-transparent"
                              title="View"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </Link>
                          <CustomDialog
                            width="md:max-w-3xl"
                            title={editTitle}
                            description={editDescription}
                            open={openUpdate === product.id}
                            openChange={(open) =>
                              setOpenUpdate(open ? product.id : null)
                            }
                            trigger={
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-border text-muted-foreground hover:bg-muted p-2 bg-transparent"
                                title="Edit"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                            }
                          >
                            <ProductFormUpdate
                              product_id={product.id}
                              product={product}
                              old_path={product.image}
                              setOpenUpdate={() => setOpenUpdate(null)}
                            />
                          </CustomDialog>
                          <CustomDialog
                            title={deleteTitle}
                            description={deleteDescription}
                            open={openDelete === product.id}
                            openChange={(open) =>
                              setOpenDelete(open ? product.id : null)
                            }
                            trigger={
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-border text-destructive hover:bg-destructive/20 p-2 bg-transparent"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            }
                          >
                            <ProductFormDelete
                              product={product}
                              setOpenDelete={() => setOpenDelete(null)}
                            />
                          </CustomDialog>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
