import testImages from "../tests/testHomePageImages";

export default function ImageSlider() {
    return (
        <>
            <div className="carousel slide" id="imageCarouselAutoPlaying" data-bs-ride="carousel">
                <div className="carousel-inner">
                    {testImages.map((image, index) => (
                        <>
                            <div className={`carousel-item ${index == 0 && "active"}`}>
                                <img src={image.imgSrc} alt="" className="d-block w-100" />
                            </div>
                        </>
                    ))}
                </div>
                <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#imageCarouselAutoPlaying"
                    data-bs-slide="prev"
                >
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#imageCarouselAutoPlaying"
                    data-bs-slide="next"
                >
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </>
    );
}
