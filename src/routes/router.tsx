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
import UserOrder from "@/pages/user/order";
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
import AdminOrder from "@/pages/admin/order";
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
      { path: "/admin/order", element: <AdminOrder /> },
      { path: "/admin/feedback", element: <AdminFeedback /> },
      { path: "/admin/settings", element: <AdminSettings /> },
      { path: "/admin/analytics", element: <AdminAnalytics /> },

      // System Settings Routes
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
  {
    element: <UserProtectedRoutes />,
    children: [
      { path: "/user/dashboard", element: <UserDashboard /> },
      { path: "/user/order", element: <UserOrder /> },
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
