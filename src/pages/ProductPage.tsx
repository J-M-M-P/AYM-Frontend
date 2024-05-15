import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import ProductNavbar from "../components/Product/ProductNavbar";
import ProductPageCards from "../components/Product/ProductPageCards";
import { getProducts } from "../service/apiFacade";
import testCards from "../tests/testProductCardInfo";
import { ProductCategory, ProductColor, ProductSizes, ProductMaterial, ProductProps } from "../service/ProductProps.ts";

// CSS
import "../components/Product/ProductPage.css";

function ProductPage() {
    // State for products
    const [products, setProducts] = useState<ProductProps[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<ProductProps[]>([]);
    const [, setSortOption] = useState<string>("");
    const [, setFilters] = useState<{ [key: string]: string }>({
        price: "",
        category: "",
        material: "",
    });

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
                setFilteredProducts(transformedProducts);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchData();
    }, []);

    // Function to handle sorting
    const handleSort = (sortOption: string) => {
        const sortedProducts = [...filteredProducts];
        if (sortOption === "price-low-to-high") {
            sortedProducts.sort((a, b) => a.price - b.price);
        } else if (sortOption === "price-high-to-low") {
            sortedProducts.sort((a, b) => b.price - a.price);
        }
        setFilteredProducts(sortedProducts);
        setSortOption(sortOption);
    };

    // Function to handle filtering
    const handleFilter = (filterKey: string, filterValue: string) => {
        const newFilters: { [key: string]: string } = { price: "", category: "", material: "" };
        newFilters[filterKey] = filterValue;
        let filteredProducts = products;

        if (newFilters.price) {
            const [min, max] = newFilters.price.split("-").map(Number);
            filteredProducts = filteredProducts.filter(
                (product) => product.price >= min && (max ? product.price <= max : true)
            );
        }

        if (newFilters.category) {
            filteredProducts = filteredProducts.filter((product) =>
                product.categories.includes(newFilters.category as unknown as ProductCategory)
            );
        }

        if (newFilters.material) {
            filteredProducts = filteredProducts.filter((product) =>
                product.materials.includes(newFilters.material as unknown as ProductMaterial)
            );
        }

        setFilteredProducts(filteredProducts);
        setFilters(newFilters);
    };
    return (
        <>
            <div className="container ">
                {/* Sort/filter navbar */}
                <ProductNavbar handleSort={handleSort} handleFilter={handleFilter} />

                {/* Område til productcards */}
                <div className="row row-gap-3 gap-0 " style={{ marginBottom: "10rem" }}>
                    {filteredProducts.map((product, index) => (
                        <div className="col-6 col-sm-6 col-md-4 col-lg-3 px-1 " key={product.id}>
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
