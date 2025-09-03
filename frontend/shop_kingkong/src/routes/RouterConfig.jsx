import { createBrowserRouter } from "react-router-dom";
import Layout from "../component/Layout";
import HomePage from "../component/HomeContent";
import ProductDetails from "../component/ProductDetails";

const router = createBrowserRouter([
  {
    element: <Layout />,
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
