import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import Layout from "./components/Layout";
import Product from "./pages/Product";
import Basket from "./pages/Basket";
import MyPage from "./pages/MyPage";
import Inventory from "./pages/Inventory";
import Login from "./pages/Login";

function App() {
    return (
        <>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/shop" element={<Product />} />
                    <Route path="*" element={<NoPage />} />
                    <Route path="/basket" element={<Basket />} />
                    <Route path="/mypage" element={<MyPage />} />
                    <Route path="/inventory" element={<Inventory />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </Layout>
        </>
    );
}

export default App;
