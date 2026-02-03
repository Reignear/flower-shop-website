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
import UserProducts from "@/pages/user/products";
import UserSettings from "@/pages/user/settings";
import UserFavorites from "@/pages/user/favorites";
import UserDashboard from "@/pages/user/dashboard";
import AdminFeedback from "@/pages/admin/feedback";
import AdminSettings from "@/pages/admin/settings";
import AdminAnalytics from "@/pages/admin/analytics";
import AdminCategory from "@/pages/admin/category";
import AdminBrandingGeneral from "@/pages/admin/branding-general";
import AdminBrandingContact from "@/pages/admin/branding-contact";
import AdminBrandingStore from "@/pages/admin/branding-store";
import AdminBrandingPrivacy from "@/pages/admin/branding-privacy";
import AdminBrandingShipping from "@/pages/admin/branding-shipping";
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
    ],
  },
  {
    element: <UserProtectedRoutes />,
    children: [
      { path: "/user/dashboard", element: <UserDashboard /> },
      { path: "/user/order", element: <UserOrder /> },
      { path: "/user/products", element: <UserProducts /> },
      { path: "/user/favorites", element: <UserFavorites /> },
      { path: "/user/settings", element: <UserSettings /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
