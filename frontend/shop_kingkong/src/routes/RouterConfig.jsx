import { createBrowserRouter } from "react-router-dom";
import HomePage from "../page/user/HomePage";
import ProductDetails from "../component/user/ProductDetails";
import MainLayout from "../layout/MainLayout";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/product/:id",
        element: <ProductDetails />,
      },
    ],
  },
]);

export default router;
