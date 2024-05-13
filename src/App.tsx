import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import Layout from "./components/Layout";
import ProductPage from "./pages/ProductPage";
import Basket from "./pages/Basket";
import MyPage from "./pages/MyPage";
import Admin from "./pages/Admin";
import Login from "./pages/Login";

function App() {
    return (
        <>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/shop" element={<ProductPage />} />
                    <Route path="*" element={<NoPage />} />
                    <Route path="/basket" element={<Basket />} />
                    <Route path="/mypage" element={<MyPage />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </Layout>
        </>
    );
}

export default App;
