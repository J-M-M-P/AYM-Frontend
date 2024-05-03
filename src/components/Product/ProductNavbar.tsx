import ProductDropDown from "./ProductDropDown";
import "./ProductNavbar.css";

function ProductNavbar() {
    return (
        <>
            {/* Filter Dropdowns & Off canvas menu when, width < navbar-expand-md */}
            <div className="row mb-2 px-3">
                <div className="col px-0">
                    <nav className="navbar navbar-expand-md py-0 h-100">
                        <button
                            className="navbar-toggler w-100 h-100 text-start border border-start-0 rounded-0 my-auto"
                            type="button"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasNavbar"
                            aria-controls="offcanvasNavbar"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="fs-6">FILTRER EFTER</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="15"
                                fill="black"
                                className="bi bi-caret-down-fill"
                                viewBox="-3 -3 19 25"
                            >
                                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                            </svg>
                        </button>

                        <div
                            className="offcanvas offcanvas-start"
                            tabIndex={-1}
                            id="offcanvasNavbar"
                            aria-labelledby="offcanvasNavbarLabel"
                            style={{ width: "300px" }}
                        >
                            <div className="offcanvas-body">
                                <ul className="navbar-nav justify-content-start">
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
