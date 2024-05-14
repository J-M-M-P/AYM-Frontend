import { useEffect, useState } from "react";
//interface
import { ProductProps } from "../service/ProductProps";
//css
import "../components/Product/ProductPage.css";
import "../components/Product/Basket.css";

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

    const formatPrice = (price: number): string => {
        const formattedPrice = price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return formattedPrice.replace(".", ",");
    };

    const totalPrice = formatPrice(basketItems.reduce((acc, item) => acc + item.price * item.quantity, 0));
    const totalMoms = formatPrice(basketItems.reduce((acc, item) => acc + item.price * item.quantity, 0) * 0.2);

    return (
        <div className="container">
            <div className="row">
                <h1 className="text-center mt-5 mb-4">Kurv</h1>
            </div>

            <hr />
            <div className="row">
                {/* Producter */}
                {/* <h4 className="text-center">Valgte produkter</h4> */}
                {basketItems.length > 0 ? (
                    <div className="col-md-12">
                        {basketItems.map((item) => (
                            <div className="card border-0 border-bottom rounded-0" key={item.id}>
                                <div className="row g-0">
                                    <div className="col-md-2">
                                        <img src={item.image} alt={item.name} className="img-fluid" />
                                    </div>
                                    <div className="col-md-6">
                                        <div className="card-body">
                                            <h5 className="card-title">{item.name}</h5>
                                            <p className="card-text">
                                                {item.materials.map((material) => `${material.name.toUpperCase()} `)}
                                            </p>
                                            <p className="card-text">Størrelse: {item.chosenSize}</p>
                                            {item.qty <= 10 && <p className="card-text">Kun {item.qty} tilbage</p>}
                                        </div>
                                    </div>
                                    <div className="col-md-2">
                                        <div className="card-body">
                                            <div>
                                                <span>{item.quantity}</span>
                                                <button
                                                    className="btn border rounded-0"
                                                    onClick={() => decrementQuantity(item.id)}
                                                >
                                                    -
                                                </button>
                                                <button
                                                    className="btn border rounded-0"
                                                    onClick={() => incrementQuantity(item.id)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-2">
                                        <div className="card-body">
                                            <p className="card-text text-end">DKK {formatPrice(item.price)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center">Din kurv er tom.</p>
                )}
            </div>

            {/* Pris total med moms og levering*/}
            <div className="row justify-content-center">
                <div className="col-md-8 ">
                    <div className="card border-0 rounded-0 ">
                        <div className="card-body">
                            <div className="row justify-content-between">
                                <div className="col-sm-4">
                                    <p className="card-text">Subtotal: </p>
                                </div>
                                <div className="col-sm-4">
                                    <p className="card-text text-end">DDK {totalPrice} </p>
                                </div>
                            </div>
                            <div className="row justify-content-between">
                                <div className="col-4">
                                    <p className="card-text">Levering: </p>
                                </div>
                                <div className="col-4">
                                    <p className="card-text text-end"> Gratis</p>
                                </div>
                            </div>
                            <div className="row justify-content-between">
                                <div className="col-4">
                                    <p className="card-text">Moms: </p>
                                </div>
                                <div className="col-4">
                                    <p className="card-text text-end">DDK {totalMoms}</p>
                                </div>
                            </div>
                            <hr />
                            <div className="row justify-content-between">
                                <div className="col-4">
                                    <h5 className="card-title">Total:</h5>
                                </div>
                                <div className="col-4">
                                    <h5 className="card-title text-end"> DKK {totalPrice}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row justify-content-end">
                <div className="col-md-3">
                    <button className="btn btn-info w-100">
                        <span>TIL KASSEN</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Basket;
