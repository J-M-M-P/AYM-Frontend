import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductProps } from "../service/ProductProps";

export interface GroupedProductProps extends ProductProps {
  quantity: number;
}

function Basket() {
  const [basketItems, setBasketItems] = useState<GroupedProductProps[]>([]);
  const navigate = useNavigate();

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
      const existingItem = acc.find(
        (i) => i.id === item.id && i.chosenSize === item.chosenSize
      );
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
        acc.push({ ...item, uniqueId: `${item.id}-${item.chosenSize}-${i}` });
      }
      return acc;
    }, [] as ProductProps[]);
    localStorage.setItem("basket", JSON.stringify(flattenedItems));
  };

  const incrementQuantity = (productId: number, chosenSize: string) => {
    const updatedBasketItems = basketItems.map((item) =>
      item.id === productId && item.chosenSize === chosenSize
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setBasketItems(updatedBasketItems);
    updateLocalStorage(updatedBasketItems);
  };

  const decrementQuantity = (productId: number, chosenSize: string) => {
    const updatedBasketItems = basketItems
      .map((item) =>
        item.id === productId && item.chosenSize === chosenSize
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);
    setBasketItems(updatedBasketItems);
    updateLocalStorage(updatedBasketItems);
  };

  const formatPrice = (price: number): string => {
    const formattedPrice = price
      .toFixed(2)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return formattedPrice.replace(".", ",");
  };

  const totalPrice = formatPrice(
    basketItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  );

  const handleCheckout = () => {
    console.log("Handle Checkout called");
    navigate("/checkout");
  };

  return (
    <div className="container">
      <div className="row">
        <h1 className="text-center mt-5 mb-4 playfair-display-font">Kurv</h1>
      </div>

      <hr className="mb-0" />
      <div className="row">
        {/* Producter */}
        {/* <h4 className="text-center">Valgte produkter</h4> */}
        {basketItems.length > 0 ? (
          <div className="col-md-12">
            {basketItems.map((item, index) => (
              <div className="card border-0 border-bottom rounded-0" key={index}>
                <div className="row g-0 my-5">
                  <div className="col-md-2">
                    <img src={item.image} alt={item.name} className="img-fluid" />
                  </div>
                  <div className="col-md-6">
                    <div className="card-body">
                      <h5
                        className="card-title quicksand-font-header"
                        style={{ fontSize: "18px" }}
                      >
                        {item.name}
                      </h5>
                      <p
                        className="card-text playfair-display-font mb-1"
                        style={{ fontSize: "15px" }}
                      >
                        {item.materials.map((material) => `${material.name.toUpperCase()} `)}
                      </p>
                      <p className="card-text lora-font mb-1" style={{ fontSize: "15px" }}>
                        Størrelse: {item.chosenSize}
                      </p>
                      {item.qty <= 10 && (
                        <p
                          className="card-text lora-font"
                          style={{ fontSize: "13px", color: "gray" }}
                        >
                          Kun {item.qty} tilbage
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="card-body">
                      <div className="hstack">
                        <div className=" text-center" style={{ width: "50%" }}>
                          <span className="text-center">{item.quantity}</span>
                        </div>
                        <div className="vstack">
                          <button
                            className="btn border rounded-0 p-0 "
                            onClick={() =>
                              incrementQuantity(item.id, item.chosenSize ?? "")
                            }
                          >
                            +
                          </button>
                          <button
                            className="btn border rounded-0 p-0"
                            onClick={() =>
                              decrementQuantity(item.id, item.chosenSize ?? "")
                            }
                          >
                            -
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="card-body">
                      <p className="card-text text-end noto-serif-jp-semibold">
                        DKK {formatPrice(item.price)}
                      </p>
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
      <div className="row justify-content-center mt-3">
        <div className="col-md-8 ">
          <div className="card border-0 rounded-0 ">
            <div className="card-body">
              <div className="row justify-content-between">
                <div className="col-sm-4">
                  <p className="card-text lora-font" style={{ fontSize: "18px" }}>
                    Subtotal:{" "}
                  </p>
                </div>
                <div className="col-sm-4">
                  <p className="card-text text-end noto-serif-jp-semibold">DDK {totalPrice} </p>
                </div>
              </div>
              <div className="row justify-content-between">
                <div className="col-4">
                  <p className="card-text lora-font " style={{ fontSize: "18px" }}>
                    Levering:{" "}
                  </p>
                </div>
                <div className="col-4">
                  <p className="card-text text-end noto-serif-jp-semibold"> Gratis</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row justify-content-end">
        <div className="col-md-3">
          {/* Ændre her når der senere skal inkluderes stripe */}
          {basketItems.length > 0 ? (
            <button
            className="btn btn-info w-100 my-5"
            onClick={handleCheckout}
            disabled={basketItems.reduce((acc, item) => acc + item.quantity, 0) === 0}
          >
            <span className="quicksand-font-btn">TIL KASSEN</span>
          </button>
          
          ) : (
            <button
              className="btn w-100 my-5 user-select-none unclickable-button"
              aria-disabled
              style={{ backgroundColor: "#799496" }}
            >
              <span className="quicksand-font-btn">TIL KASSEN</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Basket;
