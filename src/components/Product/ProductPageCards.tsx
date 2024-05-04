type props = {
    cardTitle: string;
    cardDescription: string;
    cardImgSrc: string;
    cardPrice: number;
};

function ProductPageCards({ cardTitle, cardDescription, cardImgSrc, cardPrice }: props) {
    return (
        <>
            <div className="col">
                <div className="card h-100">
                    <img src={cardImgSrc} className="card-img-top" alt={cardTitle} />
                    <div className="card-body">
                        <h5 className="card-title">{cardTitle}</h5>
                        <p className="card-text">{cardDescription}</p>
                        <p className="card-text fst-bold">{cardPrice}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductPageCards;
