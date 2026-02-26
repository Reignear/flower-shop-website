import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/layout/admin-layout";
import { Plus, Edit, Trash2, Eye, Ellipsis } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import CustomDialog from "@/components/custom/custom-dialog";
import CategoryFormInsert from "@/components/form/category-form-insert";

import type { Category } from "@/utils/interface";
import CategoryFormSelect from "@/components/form/category-form-select";
import CategoryFormUpdate from "@/components/form/category-form-update";
import CategoryFormDelete from "@/components/form/category-form-delete";
import { capitalizeFirstLetter } from "@/utils/capitalize";
import { useAdminCategory } from "@/hooks/use-admin-category";
import {
  insertTitle,
  insertDescription,
  viewTitle,
  viewDescription,
  updateTitle,
  updateDescription,
  deleteTitle,
  deleteDescription,
} from "@/data/admin-category-data";
import { categoryBreadCrumb } from "@/data/admin-layout-data";
import { useCategory } from "@/tanstack/fetch.hook";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CustomSkeleton from "@/components/custom/custom-skeleton";
export default function Category() {
  const {
    openInsert,
    setOpenInsert,
    editCategory,
    setEditCategory,
    setDeleteCategory,
  } = useAdminCategory();
  const { data: categories = [], isLoading: isCategoryLoading } = useCategory();

  return (
    <DashboardLayout breadCrumbs={categoryBreadCrumb}>
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Category Management
            </h1>
            <p className="text-muted-foreground">
              Manage all product categories
            </p>
          </div>
          <CustomDialog
            title={insertTitle}
            description={insertDescription}
            trigger={
              <Button>
                <Plus className="w-5 h-5" />
                Add New Category
              </Button>
            }
            open={openInsert}
            openChange={setOpenInsert}
          >
            <CategoryFormInsert setOpenInsert={setOpenInsert} />
          </CustomDialog>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent>
              <p className="text-muted-foreground text-sm mb-2">
                Total Categories
              </p>
              <p className="text-3xl font-bold text-foreground">
                {categories.length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <p className="text-muted-foreground text-sm mb-2">
                Active Categories
              </p>
              <p className="text-3xl font-bold text-foreground"></p>
              <p className="text-xs text-muted-foreground mt-2">
                Currently listed
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <p className="text-muted-foreground text-sm mb-2">
                Total Products
              </p>
              <p className="text-3xl font-bold text-foreground">sdsds</p>
              <p className="text-xs text-muted-foreground mt-2">
                All categories
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <p className="text-muted-foreground text-sm mb-2">
                Total Revenue
              </p>
              <p className="text-3xl font-bold text-foreground"></p>
              <p className="text-xs text-muted-foreground mt-2">
                All categories
              </p>
            </CardContent>
          </Card>
        </div>
        {isCategoryLoading && (
          <div className="grid grid-cols-3 gap-5">
            {Array.from({ length: 3 }).map((_, index) => (
              <CustomSkeleton key={index} type={"category-card"} />
            ))}
          </div>
        )}
        <div className="grid grid-cols-3 gap-5">
          {categories.map((category) => (
            <div
              className="border border-border rounded-lg h-100 relative"
              key={category.id}
            >
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant={"secondary"}
                    className="z-10 absolute top-2 right-2 "
                  >
                    <Ellipsis />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40" align="end">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>Menu</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <CustomDialog
                        title={viewTitle}
                        description={viewDescription}
                        trigger={
                          <Button
                            variant={"ghost"}
                            className="font-normal cursor-pointer flex items-center justify-between w-full"
                          >
                            View
                            <Eye className="h-5 w-5 text-green-500" />
                          </Button>
                        }
                      >
                        <CategoryFormSelect category={category} />
                      </CustomDialog>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <CustomDialog
                        title={`${updateTitle} ${capitalizeFirstLetter(category.name)} category`}
                        description={updateDescription}
                        open={editCategory === category.id}
                        openChange={(open) =>
                          setEditCategory(open ? category.id : null)
                        }
                        trigger={
                          <Button
                            variant={"ghost"}
                            className="font-normal flex items-center justify-between w-full  cursor-pointer"
                          >
                            Edit <Edit className="h-5 w-5 text-blue-500" />
                          </Button>
                        }
                      >
                        <CategoryFormUpdate
                          category_id={category.id}
                          category={category}
                          old_path={category.image}
                          setEditCategory={setEditCategory}
                        />
                      </CustomDialog>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <CustomDialog
                        title={`${deleteTitle} ${capitalizeFirstLetter(category.name)}`}
                        description={deleteDescription}
                        trigger={
                          <Button
                            variant={"ghost"}
                            className="  font-normal flex items-center justify-between w-full  cursor-pointer"
                          >
                            Delete <Trash2 className="h-5 w-5 text-red-500" />
                          </Button>
                        }
                      >
                        <CategoryFormDelete
                          category={category}
                          setDeleteCategory={setDeleteCategory}
                        />
                      </CustomDialog>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="h-60 w-full overflow-hidden rounded-t-lg flex items-center justify-center">
                <img
                  src={category.image_url}
                  alt={category.name}
                  className="h-full w-full object-cover rounded-t-lg"
                />
              </div>

              <div className="p-5 text-center">
                <h3 className="text-lg font-semibold">{category.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-4">
                  {category.description}
                </p>
              </div>
            </div>
          ))}
        </div>{" "}
        {categories.length === 0 && (
          <div className="mt-12 text-center py-12">
            <span className="text-muted-foreground">
              No categories at the moment.
            </span>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
