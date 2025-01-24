export default function CardComponent({ data, onDeleteBook }) {
  // function canc(e) {
  //   e.preventDefault();
  //   onDeleteBook(data.id);
  // }
  const imgPath = "http://localhost:3000/img/books/" + data.image;
  return (
    <div className="card">
      <img src={`${imgPath}`} className="card-img-top" alt="immagine-libro" />
      <div className="card-body">
        <h5 className="card-title">{data.title}</h5>
        <p className="card-text">{data.abstract.substring(0, 60) + "..."}</p>
        <a href="#" className="btn btn-primary" onClick={onDeleteBook}>
          Cancella
        </a>
      </div>
    </div>
  );
}
