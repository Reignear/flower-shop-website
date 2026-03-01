/* eslint-disable @typescript-eslint/no-explicit-any */
import AdminLayout from "@/components/layout/admin-layout";
import { Button } from "@/components/ui/button";
import { useFeedbackProduct } from "@/tanstack/fetch.hook";
import { capitalizeFirstLetter } from "@/utils/capitalize";
import { formatDate } from "@/utils/date";
import { getStatusBadgeColor } from "@/utils/status";
import {
  MessageCircle,
  Trash2,
  CheckCircle,
  Star,
  ClockCheck,
} from "lucide-react";
import CustomSkeleton from "@/components/custom/custom-skeleton";
import toast, { Toaster } from "react-hot-toast";
import CustomDialog from "@/components/custom/custom-dialog";
import { useAdminFeedbackProduct } from "@/hooks/use-admin-feedback-product";
import {
  deleteFeedbackDescription,
  deleteFeedbackTitle,
} from "@/data/admin-feedback-product-data";
import { CustomToast } from "@/components/custom/custom-toast";
import { useUpdateFeedbackProductStatus } from "@/tanstack/feedback.mutation";
import FeedbackProductFormDelete from "@/components/form/feedback-product-form-delete";

export default function FeedbackProduct() {
  const { data, isLoading } = useFeedbackProduct("all");
  const feedbackMutation = useUpdateFeedbackProductStatus();
  const { filter, setFilter } = useAdminFeedbackProduct();
  const filteredData =
    filter === "all"
      ? data
      : filter === "5-stars"
        ? data?.filter((f: any) => f.rating === 5)
        : filter === "4-stars-below"
          ? data?.filter((f: any) => f.rating <= 4)
          : data?.filter((f: any) => f.status === filter);

  const handleClick = (status: string) => {
    setFilter(status);
  };
  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      await CustomToast(
        feedbackMutation.mutateAsync({ id, status: newStatus }),
        "edit",
      );
    } catch (error: any) {
      toast.error(
        error.message || "An error occurred while updating feedback status.",
      );
    }
  };

  return (
    <AdminLayout>
      <Toaster position="bottom-right" />
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Feedback Management
          </h1>
          <p className="text-muted-foreground">
            Review and manage customer feedback
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-card rounded-lg p-6 border border-border">
            <p className="text-muted-foreground text-sm mb-2">
              Total Feedbacks
            </p>
            <p className="text-3xl font-bold text-foreground">487</p>
            <p className="text-xs text-muted-foreground mt-2">This month</p>
          </div>
          <div className="bg-card rounded-lg p-6 border border-border">
            <p className="text-muted-foreground text-sm mb-2">Avg Rating</p>
            <p className="text-3xl font-bold text-chart-5">4.7★</p>
            <p className="text-xs text-muted-foreground mt-2">Out of 5.0</p>
          </div>
          <div className="bg-card rounded-lg p-6 border border-border">
            <p className="text-muted-foreground text-sm mb-2">Published</p>
            <p className="text-3xl font-bold text-chart-4">412</p>
            <p className="text-xs text-muted-foreground mt-2">Live on site</p>
          </div>
          <div className="bg-card rounded-lg p-6 border border-border">
            <p className="text-muted-foreground text-sm mb-2">Pending Review</p>
            <p className="text-3xl font-bold text-chart-1">24</p>
            <p className="text-xs text-muted-foreground mt-2">
              Awaiting approval
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6 flex-wrap">
          <Button
            variant={`${filter === "all" ? "customized" : "outline"}`}
            onClick={() => handleClick("all")}
          >
            All Feedbacks
          </Button>
          <Button
            variant={`${filter === "published" ? "customized" : "outline"}`}
            onClick={() => handleClick("published")}
          >
            Published
          </Button>
          <Button
            variant={`${filter === "pending" ? "customized" : "outline"}`}
            onClick={() => handleClick("pending")}
          >
            Pending
          </Button>
          <Button
            variant={`${filter === "5-stars" ? "customized" : "outline"}`}
            onClick={() => handleClick("5-stars")}
          >
            5 Stars
          </Button>
          <Button
            variant={`${filter === "4-stars-below" ? "customized" : "outline"}`}
            onClick={() => handleClick("4-stars-below")}
          >
            4 Stars & Below
          </Button>
        </div>

        <div className="space-y-4">
          {filteredData?.map((feedback: any) => (
            <div
              key={feedback.id}
              className="bg-card rounded-lg border border-border p-6 hover:border-emerald-500/50 transition flex flex-row w-full gap-5"
            >
              <div className="shrink-0 h-35 w-35 bg-chart-1/20 rounded-md overflow-hidden">
                <img
                  src={feedback.product.image_url}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-chart-1/20 rounded-full flex items-center justify-center">
                        <MessageCircle className="w-5 h-5 text-chart-1" />
                      </div>
                      <div>
                        <p className="text-foreground font-semibold">
                          {capitalizeFirstLetter(feedback.user.first_name)}{" "}
                          {capitalizeFirstLetter(feedback.user.middle_name)}{" "}
                          {capitalizeFirstLetter(feedback.user.last_name)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {capitalizeFirstLetter(feedback.product.name)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={
                            i < feedback.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }
                        />
                      ))}
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeColor(feedback.status)}`}
                    >
                      {capitalizeFirstLetter(feedback.status)}
                    </span>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {capitalizeFirstLetter(feedback.feedback)}
                </p>

                <div className="flex justify-between items-center">
                  <p className="text-xs text-muted-foreground">
                    {formatDate(feedback.created_at)}
                  </p>
                  <div className="flex items-center gap-2">
                    <Button
                      disabled={feedback.status === "pending"}
                      variant={`${feedback.status === "pending" ? "outline" : "customized"}`}
                      onClick={() => handleStatusChange(feedback.id, "pending")}
                    >
                      <ClockCheck className="w-4 h-4" />
                      Set to Pending
                    </Button>
                    <Button
                      disabled={feedback.status === "published"}
                      variant={`${feedback.status === "published" ? "outline" : "customized"}`}
                      onClick={() =>
                        handleStatusChange(feedback.id, "published")
                      }
                    >
                      <CheckCircle className="w-4 h-4" />
                      Set to Published
                    </Button>
                    <CustomDialog
                      title={deleteFeedbackTitle}
                      description={deleteFeedbackDescription}
                      trigger={
                        <Button variant="destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      }
                    >
                      <FeedbackProductFormDelete id={feedback.id} />
                    </CustomDialog>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {isLoading && <CustomSkeleton type="description-text" height={12} />}
          {!isLoading && filteredData?.length === 0 && (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No feedbacks found.</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
