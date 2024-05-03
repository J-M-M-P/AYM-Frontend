import ProductDropDown from "./ProductDropDown";

function ProductNavbar() {
    return (
        <>
            {/* Filter Dropdowns & Off canvas menu when, width < navbar-expand-md */}
            <div className="row mb-2 px-1">
                <div className="col px-0">
                    <nav className="navbar navbar-expand-md py-0 h-100">
                        <button
                            className="navbar-toggler w-100 h-100"
                            type="button"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasNavbar"
                            aria-controls="offcanvasNavbar"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span>FILTRER EFTER</span>
                        </button>

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
                                            group={false}
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
                                            group={false}
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
                                            group={false}
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
                    </nav>
                </div>

                {/* Sorting Dropdown button */}
                <div className="col px-0">
                    <ProductDropDown
                        title="SORTER EFTER"
                        group={true}
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
                </div>
            </div>
        </>
    );
}

export default ProductNavbar;
