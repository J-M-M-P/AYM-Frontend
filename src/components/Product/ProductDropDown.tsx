interface DropdownItem {
    label: string;
    value: string;
    href: string;
}

interface DropdownProps {
    position?: string;
    title: string;
    items: DropdownItem[];
}

function ProductDropDown({ title, items }: DropdownProps) {
    return (
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
    );
}

export default ProductDropDown;
