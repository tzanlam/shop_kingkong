import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Provider, PersistGate } from "react-redux";
import { store, persistor } from "./redux/store";
import router from "./routes/RouterConfig";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
      <ToastContainer position="top-right" autoClose={3000} />
    </Provider>
  );
}

export default App;
