import ProductNavbar from "../components/Product/ProductNavbar";
import ProductPageCards from "../components/Product/ProductPageCards";
import testCards from "../tests/testProductCardInfo";

function Product() {
    return (
        <>
            <div className="container-fluid">
                {/* Brug container-fluid for at fjerne begrænsningerne af containeren */}
                {/* Første sektion med billedet */}
                <div className="row">
                    <div className="col position-relative p-0">
                        {/* Billede strækker sig fra kanten af hver side */}
                        <img
                            src="../../img/model-banner-products-001.png"
                            alt="placeholder"
                            className="img-fluid overflow position-absolute top-0 start-0 w-100"
                        />
                        {/* Tekst på billedet */}
                        <div className="position-absolute top-0 end-0 p-0 d-none d-md-block">
                            {/* d-none d-md-block skjuler teksten på mindre skærme */}

                            <div className="row" style={{ height: "calc(9/21 * 90vw" }}>
                                <div className="col"></div>
                                <div className="col my-auto text-end" style={{ marginRight: "8rem" }}>
                                    <h1>Smukke Smykker</h1>
                                    <p style={{ maxWidth: "1200px" }}>
                                        Med en sublim blanding af æstetik og håndværk inviterer vores smykker dig ind i
                                        en verden af tidsløs elegance og personlig stil. Hvert stykke er nøje udformet
                                        med en forfinet sans for detaljer og en lidenskab for at skabe unikke
                                        kunstværker, der udstråler skønhed og karakter.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Ny container til næste sektion */}
            <div className="container" style={{ marginTop: "calc(9/21 * 105vw)" }}>
                {/* marginTop er sat til 9/21 dele af bredden på billedet, */}
                {/* således at næste container med content kommer frem under billedet */}

                <div className="row d-sm-block d-md-none">
                    <div className="col text-center">
                        <h5 className="fs-4">Smukke Smykker</h5>
                        <p className="" style={{ fontSize: "14px" }}>
                            Med en sublim blanding af æstetik og håndværk inviterer vores smykker dig ind i en verden af
                            tidsløs elegance og personlig stil. Hvert stykke er nøje udformet med en forfinet sans for
                            detaljer og en lidenskab for at skabe unikke kunstværker, der udstråler skønhed og karakter.
                        </p>
                    </div>
                </div>

                {/* Sort/filter navbar */}
                <ProductNavbar />

                {/* Område til productcards */}
                <div className="row row-gap-3 gap-0" style={{ marginBottom: "10rem" }}>
                    {testCards.map((card, index) => (
                        <div className="col-6 col-sm-6 col-md-4 col-lg-3 px-1" key={index}>
                            <ProductPageCards
                                cardTitle={card.title}
                                cardDescription={card.description}
                                cardImgSrc={card.imgSrc}
                                cardPrice={card.price}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Product;
