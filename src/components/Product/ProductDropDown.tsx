import { useState } from "react";

interface DropdownItem {
    label: string;
    value: string;
    href: string;
}

interface DropdownProps {
    group: boolean;
    smallScreen?: boolean;
    title: string;
    items: DropdownItem[];
    onSelect: (value: string) => void;
}

function ProductDropDown({ title, items, group, smallScreen, onSelect }: DropdownProps) {
    const [dropDownGroup] = useState(group);

    return (
        <>
            {(dropDownGroup !== true && (
                <div className={` w-100 h-100 dropdown-center `}>
                    <button
                        type="button"
                        className="btn dropdown-toggle border border-0 text-start"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        {title}
                    </button>
                    <ul className="dropdown-menu shadow-lg">
                        {items.map((item, index) => (
                            <li key={index}>
                                <a
                                    className="dropdown-item"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onSelect(item.value);
                                    }}
                                >
                                    <span>{item.label}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )) ||
                (smallScreen === true && (
                    <div>
                        <button
                            type="button"
                            className="btn dropdown-toggle w-100 h-100  text-end border-top border-bottom rounded-0"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            {title}
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end">
                            {items.map((item, index) => (
                                <li key={index}>
                                    <a
                                        className="dropdown-item"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            onSelect(item.value);
                                        }}
                                    >
                                        <span>{item.label}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )) || (
                    <div className="d-flex justify-content-end">
                        <button
                            type="button"
                            className="btn dropdown-toggle border rounded-0"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            {title}
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end shadow-lg">
                            {items.map((item, index) => (
                                <li key={index}>
                                    <a
                                        className="dropdown-item"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            onSelect(item.value);
                                        }}
                                    >
                                        <span>{item.label}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
        </>
    );
}

export default ProductDropDown;
