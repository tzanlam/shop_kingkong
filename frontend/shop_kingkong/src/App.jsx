import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "react-toastify/dist/ReactToastify.css";
import "antd/dist/reset.css";
import { store, persistor } from "./redux/store";
import router from "./routes/RouterConfig";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
      <ToastContainer position="top-right" autoClose={3000} />
      <ToastContainer />
    </Provider>

  );
}

export default App;
