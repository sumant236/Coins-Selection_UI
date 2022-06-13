import "./Cards.module.css";

export default function Cards({ image, imgName, price, name }) {
  return (
    <>
      <div className="card">
        <img src={image} alt={imgName} />
        <div>
          <p>{name}</p>
          <p>{price}</p>
        </div>
      </div>
    </>
  );
}