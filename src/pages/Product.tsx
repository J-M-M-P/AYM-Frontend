function Product() {
    return (
        <>
            <div className="container-fluid">
                {/* Brug container-fluid for at fjerne begrænsningerne af containeren */}
                {/* Første sektion med billedet */}
                <div className="row">
                    <div className="col position-relative p-0">
                        {" "}
                        {/* Fjern position-relative og padding */}
                        {/* Billede strækker sig fra kanten af hver side */}
                        <img
                            src="../../public/img/model-banner-products-001.png"
                            alt="placeholder"
                            className="img-fluid overflow position-absolute top-0 start-0 w-100"
                        />
                        {/* Tekst på billedet */}
                        <div className="position-absolute top-0 end-0 p-4 d-none d-md-block">
                            {/* d-none d-md-block skjuler teksten på mindre skærme */}
                            <h1>Product Name</h1>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam, libero nec
                                ultricies lacinia, felis sapien volutpat mauris, et fermentum nisl libero sed nunc.
                                Nullam in odio ultricies, ultricies enim sit amet, tempus libero. Nullam facilisis,
                                nulla nec ullamcorper ultricies, turpis erat fermentum justo, quis tincidunt nunc turpis
                                nec nisl. Nulla facilisi. In hac habitasse platea dictumst. Sed nec mi elementum,
                                interdum justo eget, ultricies libero. In hac habitasse platea dictumst. Sed nec mi
                                elementum, interdum justo eget, ultricies libero.
                            </p>
                        </div>
                    </div>
                </div>
                {/* Ny container til næste sektion */}
                <div className="container" style={{ marginTop: "calc((9/21 * 105vw))" }}>
                    {/* Anden sektion */}
                    <div className="row">
                        <div className="col">
                            {/* Indhold for næste sektion */}
                            <h2>Næste sektion</h2>
                            <p>Indhold for næste sektion her...</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Product;
