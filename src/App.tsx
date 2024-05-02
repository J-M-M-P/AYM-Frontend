import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import Layout from "./components/Layout";
import Product from "./pages/Product";

function App() {
    return (
        <>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/product" element={<Product />} />
                    <Route path="*" element={<NoPage />} />
                </Routes>
            </Layout>
        </>
    );
}

export default App;
