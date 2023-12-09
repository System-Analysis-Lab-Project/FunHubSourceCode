import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { store } from "./store";
import { Provider } from "react-redux";
// components
import Layout from "./components/Layout";
import AdminRoute from "./components/AdminRoute";
// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import Products from "./pages/products/Products";
import ProductDetails from "./pages/products/ProductDetails";
import ProductList from "./pages/admin/ProductList";
import ProductEdit from "./pages/admin/ProductEdit";
import Error from "./pages/Error";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<Error />}>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="profile" element={<Profile />} />
      <Route path="cart" element={<Cart />} />
      <Route path="products" element={<Products />} />
      <Route path="products/:id" element={<ProductDetails />} />
      <Route path="admin" element={<AdminRoute />}>
        <Route index element={<ProductList />} />
        <Route path="product/:id/edit" element={<ProductEdit />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);
function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
