import ProductDropDown from "../components/Product/ProductDropDown";

function Product() {
    return (
        <>
            <div className="container-fluid">
                {/* Brug container-fluid for at fjerne begrænsningerne af containeren */}
                {/* Første sektion med billedet */}
                <div className="row">
                    <div className="col position-relative p-0">
                        {" "}
                        {/* Fjern position-relative og padding */}
                        {/* Billede strækker sig fra kanten af hver side */}
                        <img
                            src="../../img/model-banner-products-001.png"
                            alt="placeholder"
                            className="img-fluid overflow position-absolute top-0 start-0 w-100"
                        />
                        {/* Tekst på billedet */}
                        <div className="position-absolute top-0 end-0 p-4 d-none d-md-block">
                            {/* d-none d-md-block skjuler teksten på mindre skærme */}
                            <h1>Product Name</h1>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam, libero nec
                                ultricies lacinia, felis sapien volutpat mauris, et fermentum nisl libero sed nunc.
                                Nullam in odio ultricies, ultricies enim sit amet, tempus libero. Nullam facilisis,
                                nulla nec ullamcorper ultricies, turpis erat fermentum justo, quis tincidunt nunc turpis
                                nec nisl. Nulla facilisi. In hac habitasse platea dictumst. Sed nec mi elementum,
                                interdum justo eget, ultricies libero. In hac habitasse platea dictumst. Sed nec mi
                                elementum, interdum justo eget, ultricies libero.
                            </p>
                        </div>
                    </div>
                </div>
                {/* Ny container til næste sektion */}
                <div className="container" style={{ marginTop: "calc(9/21 * 105vw)" }}>
                    <div className="row">
                        <div className="col justify-content-between">
                            <div>
                                <ProductDropDown
                                    title="PRIS"
                                    items={[
                                        { label: "Kr 0 - 999", value: "0-999", href: "#" },
                                        { label: "Kr 1000 - 1999", value: "1000-1999", href: "#" },
                                        { label: "Kr 2000 - 3999", value: "2000-3999", href: "#" },
                                        { label: "Kr 4000+", value: "4000+", href: "#" },
                                    ]}
                                />

                                <ProductDropDown
                                    title="PRODUKT TYPE"
                                    items={[
                                        { label: "Ring", value: "ring", href: "#" },
                                        { label: "Ørering", value: "earing", href: "#" },
                                        { label: "Halskæde", value: "necklace", href: "#" },
                                    ]}
                                />

                                <ProductDropDown
                                    title="MATERIALE"
                                    items={[
                                        { label: "Guld", value: "gold", href: "#" },
                                        { label: "Sølv", value: "silver", href: "#" },
                                        { label: "Platin", value: "platinum", href: "#" },
                                        { label: "Genanvedt plastik", value: "plastic", href: "#" },
                                    ]}
                                />
                            </div>
                            <div className="end-0">
                                <ProductDropDown
                                    title="SORTER EFTER"
                                    position=""
                                    items={[
                                        { label: "Nyheder", value: "news", href: "#" },
                                        { label: "Mest populære", value: "most-popular", href: "#" },
                                        { label: "Pris lav til høj", value: "pric-low-to-high", href: "#" },
                                        { label: "Pris høj til lav", value: "price-high-to-low", href: "#" },
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Product;
