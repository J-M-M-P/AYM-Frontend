import { NavLink, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ProductProps } from "../service/ProductProps";
import { getSpecificProduct } from "../service/apiFacade";
import testCards from "../tests/testProductCardInfo";

function ProductDetailPage() {
    // Hent kurven fra localStorage
    const storedItems = JSON.parse(localStorage.getItem("basket") || "[]");
    // console.log(storedItems);

    const { productId } = useParams<{ productId: string }>();
    const [product, setProduct] = useState<ProductProps | null>(null);
    // State for kurv
    const [basket, setBasket] = useState<ProductProps[]>(storedItems);

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
        const loadedCart = localStorage.getItem("basket");
        setBasket(loadedCart ? JSON.parse(loadedCart) : []);
    }, []);

    // Gem kurven til localStorage hver gang den opdateres
    useEffect(() => {
        localStorage.setItem("basket", JSON.stringify(basket));
    }, [basket]);

    // Funktion til at tilføje produkter til kurven
    const addToBasket = (productToAdd: ProductProps) => {
        setBasket((prevBasket) => [...prevBasket, productToAdd]);
    };

    if (!product) return <div>Loading...</div>;

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-8 my-3 px-3">
                    {/* Indsæt istedet billeder fra backend */}
                    {/* Implementer at det bliver en carousel ved md eller mindre skærm forhold */}
                    {testCards.map((image, index) => (
                        <img
                            key={index}
                            src={image.imgSrc}
                            alt={product.name}
                            className="img-fluid object-fit-cover "
                            style={{ width: "50%", height: "calc(1/3 * 100vw)" }}
                        />
                    ))}
                </div>
                <div className="col-md-4 ps-0 py-5">
                    <div className="card h-100 border-0">
                        <div className="card-body">
                            {/* Beskrivelse af produkt materiale og farve */}
                            <p className="card-text playfair-display-font mb-0 mt-2" style={{ fontSize: "15px" }}>
                                {product.materials.map((material) => `${material.name.toUpperCase()} `)}
                            </p>
                            {/* Overskrift */}
                            <h5
                                className="card-title noto-serif-jp-semibold mt-3"
                                style={{ fontSize: "25px", marginBottom: "2.5rem" }}
                            >
                                {product.name}
                            </h5>
                            {/* Product farve*/}
                            <p className="card-text quicksand-font-btn mt-0 mb-1" style={{ fontSize: "14px" }}>
                                {product.colors.map((color) => `${color.colorName} `)}
                            </p>

                            {/* Dropdowns for forskellige muligheder */}
                            <p className="card-text">{product.sizes.map((size) => `${size.sizeName}, `)}</p>

                            <div className="lora-font">
                                {product.onSale ? (
                                    <div>
                                        <p className="text-decoration-line-through">DKK {product.price},00</p>
                                        <p>DDK {product.price - product.discountPrice},00</p>
                                    </div>
                                ) : (
                                    <p>DDK {product.price},00</p>
                                )}
                            </div>

                            {/* Link til breadcrums for eventuel notification af ting i kurv */}
                            {/* https://getbootstrap.com/docs/5.3/components/badge/#buttons */}

                            <button
                                className="btn w-100"
                                style={{ backgroundColor: "#BDB4BF", fontFamily: "Lora", fontWeight: "500" }}
                                onClick={() => addToBasket(product)}
                            >
                                LÆG I KURV
                            </button>
                            <NavLink
                                to="/basket"
                                className="btn w-100 mt-2"
                                style={{ backgroundColor: "#0DCAF0", fontFamily: "Lora", fontWeight: "500" }}
                            >
                                GÅ TIL KURV
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailPage;
