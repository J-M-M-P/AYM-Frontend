import ProductDropDown from "./ProductDropDown";
import { useEffect, useState } from "react";
import { getCategories, getMaterials } from "../../service/apiFacade";

interface ProductNavbarProps {
    handleSort: (sortOption: string) => void;
    handleFilter: (filterKey: string, filterValue: string) => void;
}

function ProductNavbar({ handleSort, handleFilter }: ProductNavbarProps) {
    const [categories, setCategories] = useState<string[]>([]);
    const [materials, setMaterials] = useState<string[]>([]);

    // Fetch categories & materials from API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoriesData = await getCategories();
                setCategories(categoriesData);
                const materialsData = await getMaterials();
                setMaterials(materialsData);
            } catch (error) {
                console.error("Error fetching categories & materials:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            {/* Filter Dropdowns & Off canvas menu when, width < navbar-expand-md */}
            <div className="row my-4 px-3 quicksand-font-btn">
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
                                            onSelect={(value) => handleFilter("price", value)}
                                        />
                                    </li>
                                    <li className="nav-item">
                                        <ProductDropDown
                                            title="PRODUKT TYPE"
                                            group={false}
                                            items={categories.map((category) => ({
                                                label: category.name.toString(),
                                                value: category.name.toString(),
                                                href: "#",
                                            }))}
                                            onSelect={(value) => handleFilter("category", value)}
                                        />
                                    </li>
                                    <li className="nav-item">
                                        <ProductDropDown
                                            title="MATERIALE"
                                            group={false}
                                            items={materials.map((material) => ({
                                                label: material.name.toString(),
                                                value: material.name.toString(),
                                                href: "#",
                                            }))}
                                            onSelect={(value) => handleFilter("material", value)}
                                        />
                                    </li>
                                    <button
                                        className="btn quicksand-font-btn align-self-end py-0"
                                        style={{ fontSize: "14px" }}
                                        onClick={() => handleFilter("price", "")}
                                    >
                                        Fjern filter
                                    </button>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>

                {/* Sorting Dropdown button Small Screen*/}
                <div className="col px-0 d-block d-md-none">
                    <ProductDropDown
                        title="SORTER EFTER"
                        group={true}
                        smallScreen={true}
                        items={[
                            { label: "Nyheder", value: "news", href: "#" },
                            { label: "Mest populære", value: "most-popular", href: "#" },
                            {
                                label: "Pris lav til høj",
                                value: "price-low-to-high",
                                href: "#",
                            },
                            {
                                label: "Pris høj til lav",
                                value: "price-high-to-low",
                                href: "#",
                            },
                        ]}
                        onSelect={handleSort}
                    />
                </div>

                {/* Sorting Dropdown Large Screen */}
                <div className="col px-0 d-none d-md-block ">
                    <ProductDropDown
                        title="SORTER EFTER"
                        group={true}
                        smallScreen={false}
                        items={[
                            { label: "Nyheder", value: "news", href: "#" },
                            { label: "Mest populære", value: "most-popular", href: "#" },
                            {
                                label: "Pris lav til høj",
                                value: "price-low-to-high",
                                href: "#",
                            },
                            {
                                label: "Pris høj til lav",
                                value: "price-high-to-low",
                                href: "#",
                            },
                        ]}
                        onSelect={handleSort}
                    />
                </div>
            </div>
        </>
    );
}

export default ProductNavbar;
