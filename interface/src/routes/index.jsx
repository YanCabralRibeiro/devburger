import { Route, Routes } from "react-router-dom";
import { Home } from "../containers/Home";
import { Menu } from "../containers/Menu";
import { Cart } from "../containers/Cart";
import { Checkout } from "../containers/Checkout";
import { CompletePayment } from "../containers/CompletePayment";
import { Login } from "../containers/Login";
import { Register } from "../containers/Register";
import { UserLayout } from "../layouts/UserLayout";
import { AdminLayout } from "../layouts/AdminLayout";
import { Orders } from "../containers/Admin/Orders";
import { NewProduct } from "../containers/Admin/NewProduct";
import { EditProduct } from "../containers/Admin/EditProduct";
import { Products } from "../containers/Admin/Products";

export function Router() {

    return(
        <Routes>

            <Route element={<UserLayout/>}>
                <Route path="/home" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/carrinho" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/complete" element={<CompletePayment />} />
            </Route>

            <Route path="/admin" element={<AdminLayout />}>
                <Route path="/admin/pedidos" element={<Orders />} />
                <Route path="/admin/novo-produto" element={<NewProduct />} />
                <Route path="/admin/editar-produto" element={<EditProduct />} />
                <Route path="/admin/produtos" element={<Products />} />
            </Route>

            <Route path="/login" element={<Login />}/>
            <Route path="/cadastro" element={<Register />}/>

        </Routes>
    );
}


/* export const router = createBrowserRouter([
    {
        path: "/home",
        element: (<> <Header /> <Home /> <Footer /> </>),
    },
    {
        path: "/menu",
        element: (<> <Header /> <Menu /> <Footer /> </>),
    },
    {
        path: "/carrinho",
        element: (<> <Header /> <Cart /> <Footer /> </>),
    },
    {
        path: "/checkout",
        element: (<> <Header /> <Checkout /> <Footer /> </>),
    },
    {
        path: "/complete",
        element: (<> <Header /> <CompletePayment /> <Footer /> </>),
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/cadastro",
        element: <Register />,
    }
]); */