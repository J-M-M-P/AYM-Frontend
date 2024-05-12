import { useEffect, useState } from "react";
import { ProductProps } from "../service/ProductProps";

function Basket() {
    // State til at holde produkterne hentet fra localStorage
    const [basketItems, setBasketItems] = useState<ProductProps[]>([]);

    // Hent og opdater cart items fra localStorage når komponenten mounts
    useEffect(() => {
        loadBasketItems();
    }, []);

    // Funktion til at indlæse produkter fra localStorage
    const loadBasketItems = () => {
        const storedBasket = localStorage.getItem("basket");
        if (storedBasket) {
            setBasketItems(JSON.parse(storedBasket));
        }
    };

    // Funktion til at fjerne et produkt fra kurven
    const removeFromBasket = (productId: number) => {
        const updatedBasketItems = basketItems.filter((item) => item.id !== productId);
        setBasketItems(updatedBasketItems);
        localStorage.setItem("basket", JSON.stringify(updatedBasketItems));
    };

    return (
        <div>
            <h2>Din Kurv</h2>
            {basketItems.length > 0 ? (
                <ul>
                    {basketItems.map((item) => (
                        <li key={item.id}>
                            {item.name} - DKK {item.price},00
                            <button onClick={() => removeFromBasket(item.id)}>Fjern</button>
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
