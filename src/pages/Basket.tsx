import { useEffect, useState } from "react";
import { ProductProps } from "../service/ProductProps";

interface GroupedProductProps extends ProductProps {
    quantity: number;
}

function Basket() {
    const [basketItems, setBasketItems] = useState<GroupedProductProps[]>([]);

    useEffect(() => {
        loadBasketItems();
    }, []);

    const loadBasketItems = () => {
        const storedBasket = localStorage.getItem("basket");
        if (storedBasket) {
            const parsedItems: ProductProps[] = JSON.parse(storedBasket);
            const groupedItems = groupBasketItems(parsedItems);
            setBasketItems(groupedItems);
        }
    };

    const groupBasketItems = (items: ProductProps[]): GroupedProductProps[] => {
        const grouped = items.reduce((acc, item) => {
            const existingItem = acc.find((i) => i.id === item.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                acc.push({ ...item, quantity: 1 });
            }
            return acc;
        }, [] as GroupedProductProps[]);
        return grouped;
    };

    const updateLocalStorage = (items: GroupedProductProps[]) => {
        const flattenedItems = items.reduce((acc, item) => {
            for (let i = 0; i < item.quantity; i++) {
                acc.push({ ...item, uniqueId: `${item.id}-${i}` });
            }
            return acc;
        }, [] as ProductProps[]);
        localStorage.setItem("basket", JSON.stringify(flattenedItems));
    };

    const incrementQuantity = (productId: number) => {
        const updatedBasketItems = basketItems.map((item) =>
            item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
        setBasketItems(updatedBasketItems);
        updateLocalStorage(updatedBasketItems);
    };

    const decrementQuantity = (productId: number) => {
        const updatedBasketItems = basketItems
            .map((item) => (item.id === productId ? { ...item, quantity: item.quantity - 1 } : item))
            .filter((item) => item.quantity > 0);
        setBasketItems(updatedBasketItems);
        updateLocalStorage(updatedBasketItems);
    };

    return (
        <div>
            <h2>Din Kurv</h2>
            {basketItems.length > 0 ? (
                <ul>
                    {basketItems.map((item) => (
                        <li key={item.id}>
                            {item.name} - DKK {item.price},00
                            <div>
                                <button onClick={() => decrementQuantity(item.id)}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => incrementQuantity(item.id)}>+</button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Din kurv er tom.</p>
            )}
        </div>
    );
}

export default Basket;
