import { useState, useEffect } from "react";
import ProductNavbar from "../components/Product/ProductNavbar";
import ProductPageCards from "../components/Product/ProductPageCards";
// import testCards from "../tests/testProductCardInfo";
import { getProducts } from "../service/apiFacade";
import testCards from "../tests/testProductCardInfo";

// Interface for Product properties
interface ProductProps {
    id: number;
    name: string;
    price: number;
    image: string;
    qty: number;
    onSale: boolean;
    discountPrice: number;
}

function ProductPage() {
    // State for products
    const [products, setProducts] = useState<ProductProps[]>([]);

    // Test cards for not yet implemented props
    const testCardsImages = testCards.map((card) => card.imgSrc);
    const testCardsDiscription = testCards.map((card) => card.description);

    console.log(testCardsImages);

    // Fetch products from API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const productsData = await getProducts();
                setProducts(productsData);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <div className="container-fluid">
                {/* Brug container-fluid for at fjerne begrænsningerne af containeren */}
                {/* Første sektion med billedet */}
                <div className="row">
                    <div className="col position-relative p-0">
                        {/* Billede strækker sig fra kanten af hver side */}
                        <img
                            src="../../img/model-banner-products-001.png"
                            alt="placeholder"
                            className="img-fluid overflow position-absolute top-0 start-0 w-100"
                        />
                        {/* Tekst på billedet */}
                        <div className="position-absolute top-0 end-0 p-0 d-none d-md-block">
                            {/* d-none d-md-block skjuler teksten på mindre skærme */}

                            <div className="row" style={{ height: "calc(9/21 * 90vw" }}>
                                <div className="col"></div>
                                <div className="col my-auto text-end" style={{ marginRight: "8rem" }}>
                                    <h1>Smukke Smykker</h1>
                                    <p style={{ maxWidth: "1200px" }}>
                                        Med en sublim blanding af æstetik og håndværk inviterer vores smykker dig ind i
                                        en verden af tidsløs elegance og personlig stil. Hvert stykke er nøje udformet
                                        med en forfinet sans for detaljer og en lidenskab for at skabe unikke
                                        kunstværker, der udstråler skønhed og karakter.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Ny container til næste sektion */}
            <div className="container" style={{ marginTop: "calc(9/21 * 105vw)" }}>
                {/* marginTop er sat til 9/21 dele af bredden på billedet, */}
                {/* således at næste container med content kommer frem under billedet */}

                <div className="row d-sm-block d-md-none">
                    <div className="col text-center">
                        <h5 className="fs-4">Smukke Smykker</h5>
                        <p className="" style={{ fontSize: "14px" }}>
                            Med en sublim blanding af æstetik og håndværk inviterer vores smykker dig ind i en verden af
                            tidsløs elegance og personlig stil. Hvert stykke er nøje udformet med en forfinet sans for
                            detaljer og en lidenskab for at skabe unikke kunstværker, der udstråler skønhed og karakter.
                        </p>
                    </div>
                </div>

                {/* Sort/filter navbar */}
                <ProductNavbar />

                {/* Område til productcards */}
                <div className="row row-gap-3 gap-0" style={{ marginBottom: "10rem" }}>
                    {products.map((product, index) => (
                        <div className="col-6 col-sm-6 col-md-4 col-lg-3 px-2" key={product.id}>
                            <ProductPageCards
                                cardName={product.name}
                                cardPrice={product.price}
                                // cardImage={product.image}
                                cardImage={testCardsImages[index]}
                                // CHANGE CARD IMAGE BACK TO product.image WHEN API IS WORKING
                                cardQty={product.qty}
                                cardOnSale={product.onSale}
                                cardDiscountPrice={product.discountPrice}
                                cardDescription={testCardsDiscription[index]}
                                cardCategory="Not yet implemented"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default ProductPage;
