import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import ProductNavbar from "../components/Product/ProductNavbar";
import ProductPageCards from "../components/Product/ProductPageCards";
import { getProducts } from "../service/apiFacade";
import testCards from "../tests/testProductCardInfo";
import { ProductCategory, ProductColor, ProductSizes, ProductMaterial, ProductProps } from "../service/ProductProps.ts";
// import TopImageWithText from "../components/Product/TopImageWithText";

function ProductPage() {
    // State for products
    const [products, setProducts] = useState<ProductProps[]>([]);

    // Test cards for not yet implemented props
    const testCardsImages = testCards.map((card) => card.imgSrc);

    // Fetch products from API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const productsData = await getProducts();
                const transformedProducts = productsData.map((product: ProductProps) => ({
                    ...product,
                    categories: product.categories.map((cat: ProductCategory) => cat.name),
                    colors: product.colors.map((color: ProductColor) => color.colorName),
                    sizes: product.sizes.map((size: ProductSizes) => size.sizeName),
                    materials: product.materials.map((material: ProductMaterial) => material.name),
                }));
                setProducts(transformedProducts);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            {/* Showcase iamge with text component */}
            {/* <TopImageWithText /> */}

            {/* Ny container til næste sektion */}
            {/* style={{ marginTop: "calc(3/8 * 102vw)" }} */}
            <div className="container">
                {/* marginTop er sat til 9/21 dele af bredden på billedet, */}
                {/* således at næste container med content kommer frem under billedet */}

                {/* <div className="row d-sm-block d-md-none">
                    <div className="col text-center">
                        <h5 className="fs-4">Smukke Smykker</h5>
                        <p className="" style={{ fontSize: "14px" }}>
                            Med en sublim blanding af æstetik og håndværk inviterer vores smykker dig ind i en verden af
                            tidsløs elegance og personlig stil. Hvert stykke er nøje udformet med en forfinet sans for
                            detaljer og en lidenskab for at skabe unikke kunstværker, der udstråler skønhed og karakter.
                        </p>
                    </div>
                </div> */}

                {/* Sort/filter navbar */}
                <ProductNavbar />

                {/* Område til productcards */}
                <div className="row row-gap-3 gap-0" style={{ marginBottom: "10rem" }}>
                    {products.map((product, index) => (
                        <div className="col-6 col-sm-6 col-md-4 col-lg-3 px-2" key={product.id}>
                            <NavLink to={`/product/${product.id}`} className="link-underline link-underline-opacity-0">
                                <ProductPageCards
                                    cardName={product.name}
                                    cardPrice={product.price}
                                    // =============
                                    // CHANGE CARD IMAGE BACK TO product.image WHEN API IS WORKING
                                    // cardImage={product.image}
                                    cardImage={testCardsImages[index]}
                                    cardQty={product.qty}
                                    cardOnSale={product.onSale}
                                    cardDiscountPrice={product.discountPrice}
                                    cardCategory={product.categories}
                                    cardColors={product.colors}
                                    cardSizes={product.sizes}
                                    cardMaterials={product.materials}
                                />
                            </NavLink>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default ProductPage;
