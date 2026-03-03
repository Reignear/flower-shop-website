/* eslint-disable @typescript-eslint/no-explicit-any */
import AdminLayout from "@/components/layout/admin-layout";
import { Button } from "@/components/ui/button";
import { useFeedbackOrder } from "@/tanstack/fetch.hook";
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
import { useUpdateFeedbackOrderStatus } from "@/tanstack/feedback.mutation";
import toast, { Toaster } from "react-hot-toast";
import { CustomToast } from "@/components/custom/custom-toast";
import CustomDialog from "@/components/custom/custom-dialog";
import FeedbackOrderFormDelete from "@/components/form/feedback-order-form-delete";
import { useAdminFeedbackOrder } from "@/hooks/use-admin-feedback-order";
import {
  deleteFeedbackDescription,
  deleteFeedbackTitle,
  feedbackOrderBreadcrumbs,
} from "@/data/admin-feedback-order-data";
import { averageRating } from "@/utils/rating";

export default function FeedbackOrder() {
  const { data, isLoading } = useFeedbackOrder("all");
  const feedbackMutation = useUpdateFeedbackOrderStatus();
  const { filter, setFilter } = useAdminFeedbackOrder();
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
    <AdminLayout breadCrumbs={feedbackOrderBreadcrumbs}>
      <Toaster position="bottom-right" />
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2">
            Feedback Management
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Review and manage customer feedback
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 sm:mb-8">
          <div className="bg-card rounded-lg p-4 sm:p-6 border border-border">
            <p className="text-muted-foreground text-xs sm:text-sm mb-2">
              Total Feedbacks
            </p>
            <p className="text-2xl sm:text-3xl font-bold text-foreground">
              {data?.length || 0}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Since website launch
            </p>
          </div>
          <div className="bg-card rounded-lg p-4 sm:p-6 border border-border">
            <p className="text-muted-foreground text-xs sm:text-sm mb-2">
              Avg Rating
            </p>
            <p className="text-2xl sm:text-3xl font-bold fill-yellow-400 text-yellow-400">
              {(
                averageRating(data?.map((feedback) => feedback.rating) || []) ||
                0
              ).toFixed(1)}{" "}
              ★
            </p>
            <p className="text-xs text-muted-foreground mt-2">Out of 5.0</p>
          </div>
          <div className="bg-card rounded-lg p-4 sm:p-6 border border-border">
            <p className="text-muted-foreground text-xs sm:text-sm mb-2">
              Published
            </p>
            <p className="text-2xl sm:text-3xl font-bold text-chart-4">
              {data?.filter((f: any) => f.status === "published").length || 0}
            </p>
            <p className="text-xs text-muted-foreground mt-2">Live on site</p>
          </div>
          <div className="bg-card rounded-lg p-4 sm:p-6 border border-border">
            <p className="text-muted-foreground text-xs sm:text-sm mb-2">
              Pending Review
            </p>
            <p className="text-2xl sm:text-3xl font-bold text-chart-1">
              {data?.filter((f: any) => f.status === "pending").length || 0}
            </p>
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
            size="sm"
            className="text-xs sm:text-sm"
          >
            All Feedbacks
          </Button>
          <Button
            variant={`${filter === "published" ? "customized" : "outline"}`}
            onClick={() => handleClick("published")}
            size="sm"
            className="text-xs sm:text-sm"
          >
            Published
          </Button>
          <Button
            variant={`${filter === "pending" ? "customized" : "outline"}`}
            onClick={() => handleClick("pending")}
            size="sm"
            className="text-xs sm:text-sm"
          >
            Pending
          </Button>
          <Button
            variant={`${filter === "5-stars" ? "customized" : "outline"}`}
            onClick={() => handleClick("5-stars")}
            size="sm"
            className="text-xs sm:text-sm"
          >
            5 Stars
          </Button>
          <Button
            variant={`${filter === "4-stars-below" ? "customized" : "outline"}`}
            onClick={() => handleClick("4-stars-below")}
            size="sm"
            className="text-xs sm:text-sm"
          >
            4 Stars & Below
          </Button>
        </div>

        <div className="space-y-4">
          {filteredData?.map((feedback: any, index: number) => (
            <div
              key={index}
              className="bg-card rounded-lg border border-border p-4 sm:p-6 hover:border-primary/50 transition"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                <div className="flex-1 w-full">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-chart-1/20 rounded-full flex items-center justify-center shrink-0">
                      <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-chart-1" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm sm:text-base text-foreground font-semibold truncate">
                        {capitalizeFirstLetter(feedback.user.first_name)}{" "}
                        {capitalizeFirstLetter(feedback.user.middle_name)}{" "}
                        {capitalizeFirstLetter(feedback.user.last_name)}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        Order # {feedback.order.reference_number}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                  <div className="flex gap-0.5 sm:gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 sm:w-4 sm:h-4 ${
                          i < feedback.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span
                    className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeColor(feedback.status)}`}
                  >
                    {capitalizeFirstLetter(feedback.status)}
                  </span>
                </div>
              </div>

              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                {capitalizeFirstLetter(feedback.feedback)}
              </p>

              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-3">
                <p className="text-xs text-muted-foreground">
                  {formatDate(feedback.created_at)}
                </p>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <Button
                    disabled={feedback.status === "pending"}
                    variant={`${feedback.status === "pending" ? "outline" : "customized"}`}
                    onClick={() => handleStatusChange(feedback.id, "pending")}
                    size="sm"
                    className="w-full sm:w-auto text-xs sm:text-sm"
                  >
                    <ClockCheck className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Set to </span>Pending
                  </Button>
                  <Button
                    disabled={feedback.status === "published"}
                    variant={`${feedback.status === "published" ? "outline" : "customized"}`}
                    onClick={() => handleStatusChange(feedback.id, "published")}
                    size="sm"
                    className="w-full sm:w-auto text-xs sm:text-sm"
                  >
                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Set to </span>Published
                  </Button>
                  <CustomDialog
                    title={deleteFeedbackTitle}
                    description={deleteFeedbackDescription}
                    trigger={
                      <Button
                        variant="destructive"
                        size="sm"
                        className="w-full sm:w-auto"
                      >
                        <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="ml-1 sm:hidden"> Delete</span>
                      </Button>
                    }
                  >
                    <FeedbackOrderFormDelete id={feedback.id} />
                  </CustomDialog>
                </div>
              </div>
            </div>
          ))}
          {isLoading && <CustomSkeleton type="description-text" height={12} />}
          {!isLoading && filteredData?.length === 0 && (
            <div className="text-center py-10">
              <p className="text-muted-foreground text-sm sm:text-base">
                No feedbacks found.
              </p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
