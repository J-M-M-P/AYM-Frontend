import NavHeader from "../Nav/NavHeader";
import ImageSlider from "./ImageSlider";

function Home() {
  return (
    <div>
      <NavHeader />
      <ImageSlider/>
      <div className="container">
        <h1 className="text-center">Home</h1>
        <p className="text-center mx-auto" style={{ maxWidth: "50vh" }}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil in itaque recusandae laborum repellendus,
          earum cum repellat numquam ipsa distinctio voluptate doloremque consectetur saepe quis facere error ab
          inventore eius eligendi tempore sit quas fuga magnam. Aperiam, hic quidem corporis id aut, autem nisi maxime
          corrupti aspernatur delectus laborum. Adipisci.
        </p>
      </div>
    </div>
  );
}

export default Home;
