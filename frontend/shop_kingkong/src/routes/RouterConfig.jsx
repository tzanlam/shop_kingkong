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
import AccountManagement from "../page/admin/AccountManagement";
import AccountDetails from "../page/admin/AccountDetails";

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
        children: [
          { path: "dashboard", element: <div>Dashboard Content</div> },
          { path: "products", element: <div>Products Content</div> },
          { path: "orders", element: <div>Orders Content</div> },
          { path: "customers", element: <AccountManagement /> },
          { path: "customers/account-details/:id", element: <AccountDetails /> },
          { path: "reviews", element: <div>Reviews Content</div> },
          { path: "settings", element: <div>Settings Content</div> },
        ],
      },
    ],
  },
]);

export default router;