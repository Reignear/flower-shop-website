import { createBrowserRouter, Navigate } from "react-router-dom";
import AdminProtectedRoutes from "@/routes/admin-protected-routes";
import AdminDashboard from "@/pages/admin/dashboard";
import AdminProduct from "@/pages/admin/products";
import AdminProductView from "@/pages/admin/product-view";
import Landing from "@/pages/public/landing";
import Services from "@/pages/public/services";
import Products from "@/pages/public/product";
import Feedback from "@/pages/public/feedback";
import About from "@/pages/public/about";
import Contact from "@/pages/public/contact";
import Faq from "@/pages/public/faq";
import Shipping from "@/pages/public/shipping";
import Privacy from "@/pages/public/privacy";
import NotFound from "@/pages/unavailable/not-found";
import UserProtectedRoutes from "@/routes/user-protected-routes";
import UserOrderAll from "@/pages/user/order-all";
import UserOrderFeedback from "@/pages/user/order-feedback";
import UserOrderDeclined from "@/pages/user/order-declined";
import UserOrderDelivered from "@/pages/user/order-delivered";
import UserOrderOnProcess from "@/pages/user/order-on-process";
import UserOrderForPickup from "@/pages/user/order-for-pickup";
import UserOrderPending from "@/pages/user/order-pending";
import UserOrderView from "@/pages/user/order-view";
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
import AdminFeedback from "@/pages/admin/feedback";
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
import AdminSignin from "@/pages/auth/admin/signin";
import UserSignin from "@/pages/auth/user/signin";
import UserSignup from "@/pages/auth/user/signup";

export const router = createBrowserRouter([
  // Public route
  { path: "/", element: <Landing /> },
  { path: "/services", element: <Services /> },
  { path: "/products", element: <Products /> },
  { path: "/feedback", element: <Feedback /> },
  { path: "/about", element: <About /> },
  { path: "/contact", element: <Contact /> },
  { path: "/faq", element: <Faq /> },
  { path: "/shipping", element: <Shipping /> },
  { path: "/privacy", element: <Privacy /> },

  // Auth Route
  { path: "/admin/signin", element: <AdminSignin /> },
  { path: "/user/signin", element: <UserSignin /> },
  { path: "/user/signup", element: <UserSignup /> },
  {
    element: <AdminProtectedRoutes />,
    children: [
      { path: "/admin/dashboard", element: <AdminDashboard /> },
      { path: "/admin/products", element: <AdminProduct /> },
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
      { path: "/admin/feedback", element: <AdminFeedback /> },
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
    ],
  },

  // For User routes
  {
    element: <UserProtectedRoutes />,
    children: [
      { path: "/user/dashboard", element: <UserDashboard /> },
      {
        path: "/user/order",
        element: <Navigate to="/user/order/all" replace />,
      },
      { path: "/user/order/all", element: <UserOrderAll /> },
      { path: "/user/order/declined", element: <UserOrderDeclined /> },
      { path: "/user/order/pending", element: <UserOrderPending /> },
      { path: "/user/order/for-pickup", element: <UserOrderForPickup /> },
      { path: "/user/order/on-process", element: <UserOrderOnProcess /> },
      { path: "/user/order/delivered", element: <UserOrderDelivered /> },
      { path: "/user/order/:id", element: <UserOrderView /> },
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
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
