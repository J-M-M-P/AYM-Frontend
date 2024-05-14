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
                <div className="card border border-0" style={{ height: "400px" }}>
                    {onSale && (
                        <div
                            className="position-absolute header text-center opacity-75"
                            style={{ backgroundColor: "green", width: "100%" }}
                        >
                            <span className="fs-1 fst-italic playfair-display-font">Sale</span>
                        </div>
                    )}
                    <img
                        src={cardImage}
                        className="card-img-top rounded-0 object-fit-cover"
                        alt={cardName}
                        style={{ height: "300px", width: "auto" }}
                    />
                    <div className="card-body p-0 pt-2 ">
                        <h5 className="card-title quicksand-font-header mb-1" style={{ fontSize: "15px" }}>
                            {cardName} {displayArray(cardCategory)}
                        </h5>

                        {/* Ikke vist men brug til sortinger/flitreing */}
                        <p className="card-text d-none">Farver: {displayArray(cardColors)}</p>
                        <p className="card-text d-none">Størrelser: {displayArray(cardSizes)}</p>

                        <p className="card-text playfair-display-font mb-2" style={{ fontSize: "13px" }}>
                            {displayArray(cardMaterials)}
                        </p>

                        {/* Tjek til at se om et produkt er på tilbud */}
                        {(onSale && (
                            <div className="hstack gap-2">
                                <p className="my-0 fw-bold lora-font" style={{ fontSize: "14px" }}>
                                    DDK {cardPrice - discountPrice},00
                                </p>

                                <p
                                    className="my-0 lora-font text-decoration-line-through fst-italic fw-lighter"
                                    style={{ fontSize: "13px" }}
                                >
                                    DKK {cardPrice},00
                                </p>
                            </div>
                        )) || (
                            <p className="card-text fw-bold lora-font" style={{ fontSize: "14px" }}>
                                DDK {cardPrice},00
                            </p>
                        )}
                    </div>

                    {/* Tjek for at se mængden af et produkt. */}
                    {cardQty < 10 && (
                        <div className="card-footer border border-0 p-0 ps-2" style={{ backgroundColor: "white" }}>
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
