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
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./pages/CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY!);

function App() {
    const options = {
        // passing the client secret obtained from the server
        clientSecret: '{{CLIENT_SECRET}}',
    };
    
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
                    <Route
                        path="/checkout"
                        element={
                            <Elements stripe={stripePromise} options={options}>
                                <CheckoutForm />
                            </Elements>
                        }/>
                </Routes>
            </Layout>
        </>
        
    );
}

export default App;
