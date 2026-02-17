import toast from "react-hot-toast";
import { motion } from "framer-motion";

const getMessages = (action?: "edit" | "delete" | "insert") => {
  switch (action) {
    // case "transition":
    //   return {
    //     loading: "Transitioning...",
    //   };
    case "edit":
      return {
        loading: "Updating...",
        success: "Updated successfully!",
        error: "Update failed",
      };
    case "delete":
      return {
        loading: "Deleting...",
        success: "Deleted successfully!",
        error: "Delete failed",
      };
    case "insert":
      return {
        loading: "Inserting...",
        success: "Inserted successfully!",
        error: "Insert failed",
      };
    default:
      return { loading: "Loading...", success: "Success!", error: "Error" };
  }
};

export const CustomToast = (
  promise: Promise<unknown>,
  action?: "edit" | "delete" | "insert",
) => {
  const { loading, success, error } = getMessages(action);

  const toastStyles = {
    base: "flex items-center gap-3 p-4 rounded-lg shadow-lg text-sm font-medium",
    loading: "bg-yellow-100 text-yellow-800 border border-yellow-300",
    success: "bg-green-100 text-green-800 border border-green-300",
    error: "bg-red-100 text-red-800 border border-red-300",
    icon: "w-5 h-5 animate-spin",
  };

  return toast.promise(
    promise,
    {
      loading: (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={`${toastStyles.base} ${toastStyles.loading}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`size-6 ${toastStyles.icon}`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>

          <span>{loading}</span>
        </motion.div>
      ),
      success: (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={`${toastStyles.base} ${toastStyles.success}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 text-green-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>

          <span>{success}</span>
        </motion.div>
      ),
      error: (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={`${toastStyles.base} ${toastStyles.error}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 text-red-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>

          <span>{error}</span>
        </motion.div>
      ),
    },
    {
      position: "bottom-right",
      style: {
        background: "transparent",
        boxShadow: "none",
        padding: 0,
        cursor: "pointer",
      },
      icon: null,
      ariaProps: { role: "status", "aria-live": "polite" },
      success: { duration: 3000 },
      error: { duration: 5000 },
    },
  );
};
