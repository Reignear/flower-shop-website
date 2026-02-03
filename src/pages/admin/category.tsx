import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/layout/admin-layout";
import { Plus, Edit, Trash2, Eye, ImageOff } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import CustomDialog from "@/components/custom/custom-dialog";
import CategoryFormInsert from "@/components/form/category-form-insert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import type { Category } from "@/utils/interface";
import CategoryFormView from "@/components/form/category-form-view";
import CategoryFormEdit from "@/components/form/category-form-edit";
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
import { useCategory } from "@/tanstack/fetch.hook";
export default function Category() {
  const {
    openInsert,
    setOpenInsert,
    editCategory,
    setEditCategory,
    setDeleteCategory,
  } = useAdminCategory();

  const { data: categories = [] } = useCategory();

  return (
    <DashboardLayout>
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

        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="sticky z-10 overflow-hidden bg-gray-100">
                <TableRow>
                  <TableHead className="w-25 p-5">Image</TableHead>
                  <TableHead className="p-5">Name</TableHead>
                  <TableHead className="p-5 max-w-sm overflow-x-auto">
                    Description
                  </TableHead>
                  <TableHead className="text-right p-5 pr-15">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((category) => (
                  <TableRow key={category.id} className="">
                    <TableCell className="font-medium p-5">
                      {category.image_url !== null ? (
                        <img
                          src={category.image_url}
                          alt={category.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                      ) : (
                        <ImageOff className="h-8 w-8 text-muted-foreground" />
                      )}
                    </TableCell>
                    <TableCell className=" p-5 max-w-20 truncate overflow-hidden whitespace-nowrap">
                      <h1 className="font-bold">
                        {capitalizeFirstLetter(category.name)}
                      </h1>
                    </TableCell>
                    <TableCell className=" p-5 max-w-48 truncate overflow-hidden whitespace-nowrap">
                      {category.description}
                    </TableCell>
                    <TableCell className="text-right flex justify-end gap-1 p-5">
                      <CustomDialog
                        title={viewTitle}
                        description={viewDescription}
                        trigger={
                          <Button
                            variant={"ghost"}
                            className="   hover:text-green-500 text-green-500 cursor-pointer"
                          >
                            <Eye className="h-5 w-5" />
                          </Button>
                        }
                      >
                        <CategoryFormView category={category} />
                      </CustomDialog>

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
                            className="   hover:text-blue-500 text-blue-500 cursor-pointer"
                          >
                            <Edit className="h-5 w-5" />
                          </Button>
                        }
                      >
                        <CategoryFormEdit
                          category_id={category.id}
                          category={category}
                          old_path={category.image}
                          setEditCategory={setEditCategory}
                        />
                      </CustomDialog>
                      <CustomDialog
                        title={`${deleteTitle} ${capitalizeFirstLetter(category.name)}`}
                        description={deleteDescription}
                        trigger={
                          <Button
                            variant={"ghost"}
                            className="   hover:text-red-500 text-red-500 cursor-pointer"
                          >
                            <Trash2 className="h-5 w-5 " />
                          </Button>
                        }
                      >
                        <CategoryFormDelete
                          category={category}
                          setDeleteCategory={setDeleteCategory}
                        />
                      </CustomDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Separator />
          </div>
        </div>
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
