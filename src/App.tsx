import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import Layout from "./components/Layout";
import ProductPage from "./pages/ProductPage";
import Basket from "./pages/Basket";
import MyPage from "./pages/MyPage";
import Inventory from "./pages/Inventory";
import ProductDetailPage from "./pages/ProductDetailPage";
import Login from "./security/Login";
import RequireAuth from "./security/RequireAuth";

function App() {
    return (
        <>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/shop" element={<ProductPage />} />
                    <Route path="/product/:productId" element={<ProductDetailPage />} />
                    <Route path="*" element={<NoPage />} />
                    <Route path="/basket" element={<Basket />} />
                    <Route path="/mypage" element={<MyPage />} />
                    <Route
                        path="/inventory"
                        element={
                            <RequireAuth roles={["ADMIN"]}>
                                <Inventory />
                            </RequireAuth>
                        }
                    />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </Layout>
        </>
    );
}

export default App;
