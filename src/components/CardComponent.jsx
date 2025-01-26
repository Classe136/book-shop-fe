import { Link } from "react-router-dom";
export default function CardComponent({ data }) {
  const imgPath = "http://localhost:3000/img/books/" + data.image;
  return (
    <div className="card">
      <img src={`${imgPath}`} className="card-img-top" alt="immagine-libro" />
      <div className="card-body">
        <h5 className="card-title">{data.title}</h5>
        <h6 className="text-muted">
          <i>By {data.author || "Anonymous"}</i>
        </h6>
        <p className="card-text">{data.abstract.substring(0, 60) + "..."}</p>
        <Link to={`/books/${data.id}`} className="btn btn-primary">
          See more
        </Link>
      </div>
    </div>
  );
}
