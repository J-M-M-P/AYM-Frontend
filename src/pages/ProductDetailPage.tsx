import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getSpecificProduct } from "../service/apiFacade";
import { ProductProps } from "./ProductPage";

function ProductDetailPage() {
    const { productId } = useParams<{ productId: string }>();
    const [product, setProduct] = useState<ProductProps | null>(null);

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

    if (!product) return <div>Loading...</div>;

    return (
        <div className="product-detail">
            <h1>{product.name}</h1>
            <p>Price: ${product.price}</p>
            <img src={product.image} alt={product.name} />
            <p>Description: [Tilføj beskrivelse her eller anden relevant info]</p>
            <button>Add to Cart</button>
        </div>
    );
}

export default ProductDetailPage;
