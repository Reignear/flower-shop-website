import { Navigate } from "react-router-dom";
import AdminProductFeedback from "@/pages/admin/feedback-product";
import AdminOrderFeedback from "@/pages/admin/feedback-order";
import AdminSettings from "@/pages/admin/settings";
import AdminAnalytics from "@/pages/admin/analytics";
import AdminCategory from "@/pages/admin/category";
import AdminOrderAll from "@/pages/admin/order-all";
import AdminOrderDelivered from "@/pages/admin/order-delivered";
import AdminOrderOnProcess from "@/pages/admin/order-on-process";
import AdminOrderForPickup from "@/pages/admin/order-for-pickup";
import AdminOrderPending from "@/pages/admin/order-pending";
import AdminOrderPendingView from "@/pages/admin/order-pending-view";
import AdminOrderDeclinedView from "@/pages/admin/order-declined-view";
import AdminOrderDeliveredView from "@/pages/admin/order-delivered-view";
import AdminOrderOnProcessView from "@/pages/admin/order-on-process-view";
import AdminOrderForPickupView from "@/pages/admin/order-for-pickup-view";
import AdminOrderDeclined from "@/pages/admin/order-declined";
import AdminBrandingGeneral from "@/pages/admin/branding-general";
import AdminBrandingContact from "@/pages/admin/branding-contact";
import AdminBrandingStore from "@/pages/admin/branding-store";
import AdminBrandingPrivacy from "@/pages/admin/branding-privacy";
import AdminBrandingShipping from "@/pages/admin/branding-shipping";
import AdminBrandingBilling from "@/pages/admin/branding-billing";
import AdminDashboard from "@/pages/admin/dashboard";
import AdminProduct from "@/pages/admin/products";
import AdminProductManage from "@/pages/admin/product-manage";
import AdminProductView from "@/pages/admin/product-view";

export const AdminRoutes = [
  { path: "/admin/dashboard", element: <AdminDashboard /> },
  { path: "/admin/products", element: <AdminProduct /> },
  { path: "/admin/products/manage", element: <AdminProductManage /> },
  { path: "/admin/products/:id", element: <AdminProductView /> },
  { path: "/admin/category", element: <AdminCategory /> },
  {
    path: "/admin/order",
    element: <Navigate to="/admin/order/all" replace />,
  },
  { path: "/admin/order/all", element: <AdminOrderAll /> },
  { path: "/admin/order/on-process", element: <AdminOrderOnProcess /> },
  { path: "/admin/order/delivered", element: <AdminOrderDelivered /> },
  { path: "/admin/order/for-pickup", element: <AdminOrderForPickup /> },
  { path: "/admin/order/pending", element: <AdminOrderPending /> },
  { path: "/admin/order/pending/:id", element: <AdminOrderPendingView /> },
  {
    path: "/admin/order/on-process/:id",
    element: <AdminOrderOnProcessView />,
  },
  {
    path: "/admin/order/for-pickup/:id",
    element: <AdminOrderForPickupView />,
  },
  {
    path: "/admin/order/delivered/:id",
    element: <AdminOrderDeliveredView />,
  },
  {
    path: "/admin/order/declined/:id",
    element: <AdminOrderDeclinedView />,
  },
  { path: "/admin/order/declined", element: <AdminOrderDeclined /> },
  { path: "/admin/feedback/order", element: <AdminOrderFeedback /> },
  { path: "/admin/feedback/product", element: <AdminProductFeedback /> },
  { path: "/admin/settings", element: <AdminSettings /> },
  { path: "/admin/analytics", element: <AdminAnalytics /> },
  {
    path: "/admin/branding",
    element: <Navigate to="/admin/branding/general" replace />,
  },
  { path: "/admin/branding/general", element: <AdminBrandingGeneral /> },
  { path: "/admin/branding/store", element: <AdminBrandingStore /> },
  { path: "/admin/branding/contact", element: <AdminBrandingContact /> },
  { path: "/admin/branding/shipping", element: <AdminBrandingShipping /> },
  { path: "/admin/branding/privacy", element: <AdminBrandingPrivacy /> },
  { path: "/admin/branding/billing", element: <AdminBrandingBilling /> },
];
