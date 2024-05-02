type props = {
    cardTitle: string;
    cardDescription: string;
    cardImgSrc: string;
};

function ProductPageCards({ cardTitle, cardDescription, cardImgSrc }: props) {
    return (
        <>
            <div className="col">
                <div className="card h-100">
                    <img src={cardImgSrc} className="card-img-top" alt={cardTitle} />
                    <div className="card-body">
                        <h5 className="card-title">{cardTitle}</h5>
                        <p className="card-text">{cardDescription}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductPageCards;
