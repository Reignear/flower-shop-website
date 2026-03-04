import { Navigate } from "react-router-dom";
import UserOrderAll from "@/pages/user/order-all";
import UserOrderFeedback from "@/pages/user/order-feedback";
import UserOrderDeclined from "@/pages/user/order-declined";
import UserOrderCancelled from "@/pages/user/order-cancelled";
import UserOrderDelivered from "@/pages/user/order-delivered";
import UserOrderOnProcess from "@/pages/user/order-on-process";
import UserOrderForPickup from "@/pages/user/order-for-pickup";
import UserOrderPending from "@/pages/user/order-pending";
import UserOrderReview from "@/pages/user/order-review";
import UserProducts from "@/pages/user/products";
import UserProductView from "@/pages/user/product-view";
import UserCart from "@/pages/user/cart";
import UserSettingsProfile from "@/pages/user/settings-profile";
import UserSettingsAddress from "@/pages/user/settings-address";
import UserSettingsNotification from "@/pages/user/settings-notification";
import UserSettingsSecurity from "@/pages/user/settings-security";
import UserSettingsDeletion from "@/pages/user/settings-delete";
import UserFavorites from "@/pages/user/favorites";
import UserDashboard from "@/pages/user/dashboard";
import UserOrderDeclinedView from "@/pages/user/order-declined-view";
import UserOrderDeliveredView from "@/pages/user/order-delivered-view";
import UserOrderPendingView from "@/pages/user/order-pending-view";
import UserOrderOnProcessView from "@/pages/user/order-on-process-view";
import UserOrderForPickupView from "@/pages/user/order-for-pickup-view";

export const UserRoutes = [
  { path: "/user/dashboard", element: <UserDashboard /> },
  { path: "/user/order", element: <Navigate to="/user/order/all" replace /> },
  { path: "/user/order/all", element: <UserOrderAll /> },
  { path: "/user/order/declined", element: <UserOrderDeclined /> },
  { path: "/user/order/cancelled", element: <UserOrderCancelled /> },
  { path: "/user/order/pending", element: <UserOrderPending /> },
  { path: "/user/order/for-pickup", element: <UserOrderForPickup /> },
  { path: "/user/order/on-process", element: <UserOrderOnProcess /> },
  { path: "/user/order/delivered", element: <UserOrderDelivered /> },
  { path: "/user/order/declined/:id", element: <UserOrderDeclinedView /> },
  { path: "/user/order/delivered/:id", element: <UserOrderDeliveredView /> },
  { path: "/user/order/pending/:id", element: <UserOrderPendingView /> },
  { path: "/user/order/on-process/:id", element: <UserOrderOnProcessView /> },
  { path: "/user/order/for-pickup/:id", element: <UserOrderForPickupView /> },

  { path: "/user/order/feedback/:id", element: <UserOrderFeedback /> },
  { path: "/user/order/review", element: <UserOrderReview /> },
  { path: "/user/products", element: <UserProducts /> },
  { path: "/user/products/:id", element: <UserProductView /> },
  { path: "/user/cart", element: <UserCart /> },
  { path: "/user/favorites", element: <UserFavorites /> },
  {
    path: "/user/settings",
    element: <Navigate to="/user/settings/profile" replace />,
  },
  { path: "/user/settings/profile", element: <UserSettingsProfile /> },
  { path: "/user/settings/address", element: <UserSettingsAddress /> },
  {
    path: "/user/settings/notification",
    element: <UserSettingsNotification />,
  },
  { path: "/user/settings/security", element: <UserSettingsSecurity /> },
  { path: "/user/settings/deletion", element: <UserSettingsDeletion /> },
];
