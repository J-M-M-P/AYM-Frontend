import { NavLink, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Alert, Dropdown, DropdownButton } from "react-bootstrap";
import { ProductProps } from "../service/ProductProps";
import { getSpecificProduct } from "../service/apiFacade";
import testCards from "../tests/testProductCardInfo";

function ProductDetailPage() {
    // Hent kurven fra localStorage
    const storedItems = JSON.parse(localStorage.getItem("basket") || "[]");
    const { productId } = useParams<{ productId: string }>();
    const [product, setProduct] = useState<ProductProps | null>(null);
    const [basket, setBasket] = useState<ProductProps[]>(storedItems);
    const [showAlert, setShowAlert] = useState(false);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);

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

    useEffect(() => {
        const loadedCart = localStorage.getItem("basket");
        setBasket(loadedCart ? JSON.parse(loadedCart) : []);
    }, []);

    useEffect(() => {
        localStorage.setItem("basket", JSON.stringify(basket));
    }, [basket]);

    const addToBasket = (productToAdd: ProductProps) => {
        if (!selectedSize) {
            alert("Vælg venligst en størrelse før du tilføjer produktet til kurven.");
            return;
        }
        const timestamp = String(Date.now());
        const productWithId = { ...productToAdd, uniqueId: timestamp, chosenSize: selectedSize };
        setBasket((prevBasket) => [...prevBasket, productWithId]);
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 2000);
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
                            <p className="card-text playfair-display-font mb-0 mt-2" style={{ fontSize: "15px" }}>
                                {product.materials.map((material) => `${material.name.toUpperCase()} `)}
                            </p>
                            <h5
                                className="card-title noto-serif-jp-semibold mt-3"
                                style={{ fontSize: "25px", marginBottom: "2.5rem" }}
                            >
                                {product.name}
                            </h5>
                            <p className="card-text quicksand-font-btn mt-0 mb-1" style={{ fontSize: "14px" }}>
                                {product.colors.map((color) => `${color.colorName} `)}
                            </p>

                            <DropdownButton
                                id="dropdown-basic-button"
                                variant=""
                                title={selectedSize ? selectedSize : "Vælg størrelse"}
                                onSelect={(e) => setSelectedSize(e as string)}
                                className="mb-3"
                            >
                                {product.sizes.map((size) => (
                                    <Dropdown.Item key={size.id} eventKey={size.sizeName}>
                                        {size.sizeName}
                                    </Dropdown.Item>
                                ))}
                            </DropdownButton>

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
                            {showAlert && <Alert variant="success">Produktet er lagt i kurven!</Alert>}
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
