export default function TopImageWithText() {
    return (
        <>
            <div className="container-fluid">
                {/* Brug container-fluid for at fjerne begrænsningerne af containeren */}
                {/* Mulig ændring kan laves gennem Image Overlays */}
                {/* https://getbootstrap.com/docs/5.3/components/card/#image-overlays */}
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

                            <div className="row mx-0" style={{ height: "calc(3/8 * 90vw" }}>
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
        </>
    );
}
