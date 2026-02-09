import CustomDialog from "@/components/custom/custom-dialog";
import AdminLayout from "@/components/layout/admin-layout";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  List,
  LayoutGrid,
  ArrowUpRight,
} from "lucide-react";
import {
  insertTitle,
  insertDescription,
  deleteTitle,
  deleteDescription,
  editTitle,
  editDescription,
} from "@/data/admin-product-data";
import ProductFormInsert from "@/components/form/product-form-insert";
import { useAdminProduct } from "@/hooks/use-admin-product";
import { capitalizeFirstLetter } from "@/utils/capitalize";
import { Link } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCategory, useProduct } from "@/tanstack/fetch.hook";
import ProductFormDelete from "@/components/form/product-form-delete";
import ProductFormUpdate from "@/components/form/product-form-update";
import { productBreadCrumb } from "@/data/admin-layout-data";

export default function Product() {
  const {
    openInsert,
    setOpenInsert,
    layout,
    setLayout,
    activeCategory,
    setActiveCategory,
    openDelete,
    setOpenDelete,
    openUpdate,
    setOpenUpdate,
  } = useAdminProduct();

  const { data: product = [] } = useProduct();
  const { data: category = [] } = useCategory();
  const totalProducts = product?.length || 0;
  const filteredProducts =
    activeCategory === "all"
      ? product
      : product?.filter((p) => p.category_id === activeCategory);

  return (
    <AdminLayout breadCrumbs={productBreadCrumb}>
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
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
              <Button>
                <Plus className="w-5 h-5" /> Add New Product
              </Button>
            }
          >
            <ProductFormInsert setOpenInsert={setOpenInsert} />
          </CustomDialog>
        </div>
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-card rounded-lg p-6 border border-border">
            <p className="text-muted-foreground text-sm mb-2">Total Products</p>
            <p className="text-3xl font-bold text-foreground">
              {totalProducts}
            </p>
            <p className="text-xs text-muted-foreground mt-2">8 variants</p>
          </div>
          <div className="bg-card rounded-lg p-6 border border-border">
            <p className="text-muted-foreground text-sm mb-2">
              Active Listings
            </p>
            <p className="text-3xl font-bold text-foreground">46</p>
            <p className="text-xs text-muted-foreground mt-2">2 archived</p>
          </div>
          <div className="bg-card rounded-lg p-6 border border-border">
            <p className="text-muted-foreground text-sm mb-2">
              Low Stock Items
            </p>
            <p className="text-3xl font-bold text-chart-5">3</p>
            <p className="text-xs text-muted-foreground mt-2">
              Needs restocking
            </p>
          </div>
          <div className="bg-card rounded-lg p-6 border border-border">
            <p className="text-muted-foreground text-sm mb-2">
              Total Inventory Value
            </p>
            <p className="text-3xl font-bold text-foreground">$18,450</p>
            <p className="text-xs text-muted-foreground mt-2">
              Current stock value
            </p>
          </div>
        </div>
        <div className="flex justify-between w-full">
          <div className="flex gap-2 mb-6 flex-wrap">
            <Select value={activeCategory} onValueChange={setActiveCategory}>
              <SelectTrigger className="w-full min-w-2xs max-w-xs">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>List of Category</SelectLabel>
                  <SelectItem value="all">All Categories</SelectItem>
                  {category?.map((cat) => (
                    <SelectItem
                      key={cat.id}
                      value={cat.name}
                      onClick={() => {
                        setActiveCategory(cat.name);
                      }}
                    >
                      {capitalizeFirstLetter(cat.name)}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex mb-6 items-center justify-center gap-2">
            <Button
              variant={`${layout === "grid" ? "default" : "outline"}`}
              onClick={() => setLayout("grid")}
            >
              <LayoutGrid />
            </Button>
            <Button
              variant={`${layout === "list" ? "default" : "outline"}`}
              onClick={() => setLayout("list")}
            >
              <List />
            </Button>
          </div>
        </div>
        {layout === "list" && (
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
                          {capitalizeFirstLetter(product.category_id)}
                        </td>
                        <td className="py-4 px-6 text-foreground font-semibold">
                          ₱ {product.price}
                        </td>

                        <td className="py-4 px-6">
                          <span
                            className={`px-5 py-2 rounded-full text-xs font-semibold ${
                              product.status === "available"
                                ? "bg-green-500/20 text-green-500"
                                : "bg-chart-5/20 text-chart-5"
                            }`}
                          >
                            {capitalizeFirstLetter(product.status)}
                          </span>
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
            {product?.length === 0 && (
              <div className=" p-5">
                <h1 className="text-center text-sm text-muted-foreground">
                  No products found
                </h1>
              </div>
            )}
          </div>
        )}
        {layout === "grid" && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {filteredProducts?.map((prod) => (
                <div
                  className="rounded-lg max-w-2xs h-full overflow-hidden border border-border"
                  key={prod.id}
                >
                  <div className="h-70">
                    <img
                      src={prod.image_url}
                      alt={capitalizeFirstLetter(prod.name)}
                      className="h-full w-full object-cover rounded-tl-lg rounded-tr-lg hover:scale-102 transition-transform duration-300"
                    />
                  </div>
                  <div className="text-start p-2">
                    <h1 className="text-xl font-bold">
                      {capitalizeFirstLetter(prod.name)}
                    </h1>
                    <h5 className="text-sm text-muted-foreground">
                      {capitalizeFirstLetter(prod.category_id)}
                    </h5>
                    <h2 className="text-lg font-semibold">₱ {prod.price}</h2>
                    <div className="mt-4">
                      <Link to={`/admin/products/${prod.id}`}>
                        <Button className="w-full mt-2">
                          View details <ArrowUpRight />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {filteredProducts?.length === 0 && (
              <div className=" p-5">
                <h1 className="text-center text-muted-foreground">
                  No products found
                </h1>
              </div>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
