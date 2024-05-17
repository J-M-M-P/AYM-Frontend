import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import Layout from "./components/Layout";
import ProductPage from "./pages/ProductPage";
import Basket from "./pages/Basket";
import MyPage from "./pages/MyPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import Admin from "./pages/Admin";
import Login from "./security/Login";
import RequireAuth from "./security/RequireAuth";
import About from "./pages/About";
import Faq from "./pages/Faq";
import Contact from "./pages/Contact";

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
                        path="/admin"
                        element={
                            <RequireAuth roles={["ADMIN"]}>
                                <Admin />
                            </RequireAuth>
                        }
                    />

                    <Route path="/login" element={<Login />} />
                    <Route path="/faq" element={<Faq />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </Layout>
        </>
    );
}

export default App;
