import { useState } from "react";

type props = {
    cardName: string;
    cardPrice: number;
    cardImage: string;
    cardQty: number;
    cardOnSale: boolean;
    cardDiscountPrice: number;
    cardCategory: object[];
    cardColors: object[];
    cardSizes: object[];
    cardMaterials: object[];
};

function ProductPageCards({
    cardName,
    cardPrice,
    cardImage,
    cardQty,
    cardOnSale,
    cardDiscountPrice,
    cardCategory,
    cardColors,
    cardSizes,
    cardMaterials,
}: props) {
    const [onSale] = useState(cardOnSale);
    const [discountPrice] = useState(cardDiscountPrice);

    // Helper function to display array as comma-separated values
    const displayArray = (arr: object[]) => arr.join(", ");

    return (
        <>
            <div className="col">
                <div className="card border border-0 " style={{ height: "400px" }}>
                    {onSale && (
                        <div
                            className="position-absolute header text-center"
                            style={{ backgroundColor: "green", width: "100%" }}
                        >
                            <span className="fs-1">Sale</span>
                        </div>
                    )}
                    <img
                        src={cardImage}
                        className="card-img-top rounded-0"
                        alt={cardName}
                        style={{ height: "250px", objectFit: "cover" }}
                    />
                    <div className="card-body pb-0">
                        <h5 className="card-title">{cardName}</h5>

                        <p className="card-text">Kategorier: {displayArray(cardCategory)}</p>
                        <p className="card-text">Farver: {displayArray(cardColors)}</p>
                        <p className="card-text">Størrelser: {displayArray(cardSizes)}</p>
                        <p className="card-text">Materialer: {displayArray(cardMaterials)}</p>

                        {(onSale && (
                            <div className="row row-col-3">
                                <div className="col">
                                    <p className="my-0 text-decoration-line-through fst-italic fw-lighter">
                                        DKK {cardPrice},00
                                    </p>
                                    <p className="my-0 fw-bold">DDK {cardPrice - discountPrice},00</p>
                                </div>
                            </div>
                        )) || <p className="card-text fw-bold">DDK {cardPrice},00</p>}
                    </div>

                    {cardQty < 10 && (
                        <div className="card-footer border border-0 p-0 ps-3" style={{ backgroundColor: "white" }}>
                            <p className="card-text">
                                <small className="text-body-secondary">Kun {cardQty} tilbage</small>
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default ProductPageCards;
