import ProductDropDown from "./ProductDropDown";

function ProductNavbar() {
    return (
        <>
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
        </>
    );
}

export default ProductNavbar;
