import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ProductProps } from "../service/ProductProps";
import { getSpecificProduct } from "../service/apiFacade";

function ProductDetailPage() {
    const storedItems = JSON.parse(localStorage.getItem("cart") || "[]");

    const { productId } = useParams<{ productId: string }>();
    const [product, setProduct] = useState<ProductProps | null>(null);
    const [cart, setCart] = useState<ProductProps[]>(storedItems);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const productsData = await getSpecificProduct(Number(productId));
                setProduct(productsData);
            } catch (error) {
                console.error("Failed to fetch product", error);
            }
        };

        fetchProduct();
    }, [productId]);

    // Hent kurven fra localStorage når komponenten mounts
    useEffect(() => {
        const loadedCart = localStorage.getItem("cart");
        setCart(loadedCart ? JSON.parse(loadedCart) : []);
    }, []);

    // Gem kurven til localStorage hver gang den opdateres
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    // Funktion til at tilføje produkter til kurven
    const addToCart = (productToAdd: ProductProps) => {
        setCart((prevCart) => [...prevCart, productToAdd]);
    };

    console.log(cart);

    if (!product) return <div>Loading...</div>;

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <h5>Images</h5>
                        <img src={product.image} alt={product.name} />
                    </div>
                    <div className="col-lg-4 p-0">
                        <div className="card rounded-0 px-4" style={{ paddingTop: "54px" }}>
                            <div className="card-body">
                                <h5 className="card-title fs-3">{product.name}</h5>
                                <p className="card-text">
                                    {product.materials.map((material) => material.name.toUpperCase() + ", ")}
                                    {product.sizes.map((size) => size.sizeName + ", ")}
                                    {product.colors.map((color) => color.colorName + ", ")}
                                </p>
                                <div className="card-text">
                                    {(product.onSale && (
                                        <div className="row">
                                            <div className="col">
                                                <p className="my-0 text-decoration-line-through fst-italic fw-lighter">
                                                    DKK {product.price},00
                                                </p>
                                                <p className="my-0 fw-bold">
                                                    DDK {product.price - product.discountPrice},00
                                                </p>
                                            </div>
                                        </div>
                                    )) || <p className="card-text fw-bold">DDK {product.price},00</p>}
                                </div>
                                <button className="btn rounded-0 w-100 btn-info" onClick={() => addToCart(product)}>
                                    LÆG I KURV
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductDetailPage;
