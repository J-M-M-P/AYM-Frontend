import ProductDropDown from "../components/Product/ProductDropDown";
import ProductPageCards from "../components/Product/ProductPageCards";
import testCards from "../tests/testProductCardInfo";

function Product() {
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
                    {/* marginTop er sat til 9/21 dele af bredden på billedet, */}
                    {/* således at næste container med content kommer frem under billedet */}
                    <div className="row">
                        <div className="col px-0">
                            <nav className="navbar navbar-expand-lg">
                                <div className="container-fluid px-0">
                                    <div className="row ms-auto me-0">
                                        <button
                                            className="navbar-toggler"
                                            type="button"
                                            data-bs-toggle="offcanvas"
                                            data-bs-target="#offcanvasNavbar"
                                            aria-controls="offcanvasNavbar"
                                            aria-expanded="false"
                                            aria-label="Toggle navigation"
                                        >
                                            <span>FILTRER EFTER</span>
                                        </button>
                                    </div>
                                    <div
                                        className="offcanvas offcanvas-start"
                                        tabIndex={-1}
                                        id="offcanvasNavbar"
                                        aria-labelledby="offcanvasNavbarLabel"
                                    >
                                        <div className="offcanvas-body">
                                            <ul className="navbar-nav justify-content-start flex-grow-1 pe-3">
                                                <li className="nav-item">
                                                    <ProductDropDown
                                                        title="PRIS"
                                                        items={[
                                                            { label: "Kr 0 - 999", value: "0-999", href: "#" },
                                                            { label: "Kr 1000 - 1999", value: "1000-1999", href: "#" },
                                                            { label: "Kr 2000 - 3999", value: "2000-3999", href: "#" },
                                                            { label: "Kr 4000+", value: "4000+", href: "#" },
                                                        ]}
                                                    />
                                                </li>
                                                <li className="nav-item">
                                                    <ProductDropDown
                                                        title="PRODUKT TYPE"
                                                        items={[
                                                            { label: "Ring", value: "ring", href: "#" },
                                                            { label: "Ørering", value: "earing", href: "#" },
                                                            { label: "Halskæde", value: "necklace", href: "#" },
                                                        ]}
                                                    />
                                                </li>
                                                <li className="nav-item">
                                                    <ProductDropDown
                                                        title="MATERIALE"
                                                        items={[
                                                            { label: "Guld", value: "gold", href: "#" },
                                                            { label: "Sølv", value: "silver", href: "#" },
                                                            { label: "Platin", value: "platinum", href: "#" },
                                                            { label: "Genanvedt plastik", value: "plastic", href: "#" },
                                                        ]}
                                                    />
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </nav>
                        </div>
                        <div className="col px-0">
                            <nav className="navbar navbar-expand-lg">
                                <div className="container-fluid px-0">
                                    <div className="row ms-0 me-auto">
                                        <button
                                            className="navbar-toggler"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#navbarTogglerSorting"
                                            aria-controls="navbarTogglerSorting"
                                            aria-expanded="false"
                                            aria-label="Toggle navigation"
                                        >
                                            <span>Sorting</span>
                                        </button>
                                    </div>
                                    <div className="collapse navbar-collapse" id="navbarTogglerSorting">
                                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                            <li className="nav-item">
                                                <ProductDropDown
                                                    title="SORTER EFTER"
                                                    items={[
                                                        { label: "Nyheder", value: "news", href: "#" },
                                                        { label: "Mest populære", value: "most-popular", href: "#" },
                                                        {
                                                            label: "Pris lav til høj",
                                                            value: "pric-low-to-high",
                                                            href: "#",
                                                        },
                                                        {
                                                            label: "Pris høj til lav",
                                                            value: "price-high-to-low",
                                                            href: "#",
                                                        },
                                                    ]}
                                                />
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>

                    {/* Område til productcards */}
                    <div className="row row-cols-4 row-gap-5">
                        {testCards.map((card) => (
                            <ProductPageCards
                                cardTitle={card.title}
                                cardDescription={card.description}
                                cardImgSrc={card.imgSrc}
                                cardPrice={card.price}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Product;
