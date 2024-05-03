import { useState } from "react";

interface DropdownItem {
    label: string;
    value: string;
    href: string;
}

interface DropdownProps {
    group: boolean;
    title: string;
    items: DropdownItem[];
}

function ProductDropDown({ title, items, group }: DropdownProps) {
    const [dropDownGroup] = useState(group);

    return (
        <>
            {(dropDownGroup !== true && (
                <div className={`btn-group px-3`}>
                    <button
                        type="button"
                        className="btn btn-primary dropdown-toggle"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        {title}
                    </button>
                    <ul className="dropdown-menu">
                        {items.map((item, index) => (
                            <li key={index}>
                                <a className="dropdown-item" href={item.href}>
                                    <span>{item.label}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )) || (
                <div className={`btn-group w-100 h-100`}>
                    <button
                        type="button"
                        className="btn btn-dark dropdown-toggle "
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        {title}
                    </button>
                    <ul className="dropdown-menu end-0">
                        {items.map((item, index) => (
                            <li key={index}>
                                <a className="dropdown-item" href={item.href}>
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
