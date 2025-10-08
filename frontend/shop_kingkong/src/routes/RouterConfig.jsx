import { createBrowserRouter } from "react-router-dom";
import HomePage from "../page/user/HomePage";
import ProductDetails from "../component/user/ProductDetails";
import MainLayout from "../layout/MainLayout";
import Profile from "../page/user/Profile";
import VerificationPage from "../page/both/VerificationPage";
import Product from "../component/user/Product";
import Cart from "../component/user/Cart";
import PrivateRoute from "./PrivateRouter";
import AdminLayout from "../layout/AdminLayout";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/product",
        element: <Product />,
      },
      {
        path: "/product/:id",
        element: <ProductDetails />,
      },
      {
        path: "/verify",
        element: <VerificationPage />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
  {
    element: <PrivateRoute requiredPosition="ADMIN" />,
    children: [
      {
        path: "/admin",
        element: <AdminLayout />,
      },
    ],
  },
]);

export default router;