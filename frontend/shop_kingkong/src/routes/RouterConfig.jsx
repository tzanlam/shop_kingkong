import { createBrowserRouter } from "react-router-dom";
import HomePage from "../page/user/HomePage";
import ProductDetails from "../component/user/ProductDetails";
import MainLayout from "../layout/MainLayout";
import Profile from "../page/user/Profile";
import VerificationPage from "../page/both/VerificationPage";

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
        path: "/product/:id",
        element: <ProductDetails />,
      },
      {
        path: "/verify",
        element: <VerificationPage />
      }
    ],
  },
]);

export default router;
