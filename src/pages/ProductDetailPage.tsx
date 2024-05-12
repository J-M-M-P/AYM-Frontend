import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getSpecificProduct } from "../service/apiFacade";
import { ProductProps } from "../service/ProductProps";

function ProductDetailPage() {
    const { productId } = useParams<{ productId: string }>();
    const [product, setProduct] = useState<ProductProps | null>(null);
    const [onSale] = useState(product?.onSale || false);

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
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <h5>Images</h5>
                        {/* TODO: lav dette så det er en carousel når skærmen bliver lille */}
                        {/* Benyt carousel men med en collapse feature */}
                        <img src={product.image} alt={product.name} />
                    </div>
                    <div className="col-lg-4 p-0">
                        <div className="card rounded-0 px-4" style={{ paddingTop: "54px" }}>
                            <div className="card-body">
                                <h5 className="card-title fs-3">{product.name}</h5>
                                <p className="card-text">
                                    {/* Lav arrays til dropdown menuer, hvis flere mulige løsning findes */}
                                    {/* f.eks. lav dropdown hvis en ring er i flere størrelser */}
                                    {product.materials.map((material) => material.name.toUpperCase() + ", ")}
                                    {product.sizes.map((size) => size.sizeName + ", ")}
                                    {product.colors.map((color) => color.colorName + ", ")}
                                </p>
                                <div className="card-text">
                                    {(onSale && (
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
                                <button className="btn rounded-0 w-100 btn-info">LÆG I KURV</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>{" "}
        </>
    );
}

export default ProductDetailPage;
