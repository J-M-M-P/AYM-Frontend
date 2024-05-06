import { useState } from "react";

type props = {
    cardName: string;
    cardPrice: number;
    cardImage: string;
    cardQty: number;
    cardOnSale: boolean;
    cardDiscountPrice: number;
    cardCategory: string;
};

function ProductPageCards({
    cardName,
    cardPrice,
    cardImage,
    cardQty,
    cardOnSale,
    cardDiscountPrice,
    cardCategory,
}: props) {
    const [onSale] = useState(cardOnSale);
    const [discountPrice] = useState(cardDiscountPrice);

    return (
        <>
            <div className="col">
                <div className="card border border-0 " style={{ height: "400px" }}>
                    {onSale && (
                        <>
                            <div
                                className="position-absolute header text-center"
                                style={{ backgroundColor: "green", width: "100%" }}
                            >
                                <span className="fs-1">Sale</span>
                            </div>
                        </>
                    )}
                    <img
                        src={cardImage}
                        className="card-img-top rounded-0"
                        alt={cardName}
                        style={{ height: "250px", objectFit: "cover" }}
                    />
                    <div className="card-body pb-0">
                        <h5 className="card-title">{cardName}</h5>
                        <p className="card-text d-none">{cardCategory}</p>
                        {(onSale && (
                            <>
                                <div className="row row-col-3">
                                    <div className="col">
                                        <p className="my-0 text-decoration-line-through fst-italic fw-lighter">
                                            {cardPrice},00
                                        </p>
                                        <p className="my-0 fw-bold ">DDK {cardPrice - discountPrice},00 </p>
                                    </div>
                                </div>
                            </>
                        )) || (
                            <>
                                <p className="card-text fw-bold">DDK {cardPrice},00 </p>
                            </>
                        )}
                    </div>

                    {cardQty < 10 && (
                        <>
                            <div className="card-footer border border-0 p-0 ps-3" style={{ backgroundColor: "white" }}>
                                <p className="card-text">
                                    <small className="text-body-secondary">Kun {cardQty} tilbage</small>
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default ProductPageCards;
