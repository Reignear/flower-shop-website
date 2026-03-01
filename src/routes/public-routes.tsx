import Landing from "@/pages/public/landing";
import Services from "@/pages/public/services";
import Products from "@/pages/public/product";
import Feedback from "@/pages/public/feedback";
import About from "@/pages/public/about";
import Contact from "@/pages/public/contact";
import Faq from "@/pages/public/faq";
import Shipping from "@/pages/public/shipping";
import Privacy from "@/pages/public/privacy";

export const PublicRoutes = [
  { path: "/", element: <Landing /> },
  { path: "/services", element: <Services /> },
  { path: "/products", element: <Products /> },
  { path: "/feedback", element: <Feedback /> },
  { path: "/about", element: <About /> },
  { path: "/contact", element: <Contact /> },
  { path: "/faq", element: <Faq /> },
  { path: "/shipping", element: <Shipping /> },
  { path: "/privacy", element: <Privacy /> },
];
