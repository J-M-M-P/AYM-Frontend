type props = {
    cardName: string;
    cardPrice: number;
    cardImage: string;
    cardQty: number;
    cardOnSale: boolean;
    cardDiscountPrice: number;
    cardDescription: string;
    cardCategory: string;
};

function ProductPageCards({ cardName, cardDescription, cardImage, cardPrice }: props) {
    return (
        <>
            <div className="col">
                <div className="card h-100">
                    <img src={cardImage} className="card-img-top" alt={cardName} />
                    <div className="card-body">
                        <h5 className="card-title">{cardName}</h5>
                        <p className="card-text">{cardDescription}</p>
                        <p className="card-text fst-bold">{cardPrice}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductPageCards;
