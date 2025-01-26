import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

import ReviewComponent from "../components/ReviewComponent";

const apiUrl = import.meta.env.VITE_API_URL;
const bookEndPoint = "/books";
const imgPath = "http://localhost:3000/img/books/";
export default function BookDetail() {
  const [book, setBook] = useState(null);
  const { id } = useParams();
  useEffect(getData, [id]);
  function getData() {
    axios
      .get(`${apiUrl}${bookEndPoint}/${id}`)
      .then((res) => {
        setBook(res.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        console.log("Finito");
      });
  }
  function renderReviews() {
    if (book?.reviews.length > 0) {
      return book.reviews.map((review) => (
        <div className="col-12" key={review.id}>
          <ReviewComponent review={review} />
        </div>
      ));
    } else {
      return <div className="col-12">No yet Reviews for this book</div>;
    }
  }
  return (
    <>
      <section className="container-fluid py-4">
        <div className="row">
          <div className="col-12 col-md-3">
            <img
              src={`${imgPath}${book?.image} `}
              alt=""
              className="img-fluid"
            />
          </div>
          <div className="col-12 col-md-9">
            <h1>{book?.title}</h1>
            <h3 className="text-muted">
              <i>By {book?.author}</i>
            </h3>

            <p>{book?.abstract}</p>
          </div>
        </div>
      </section>
      <section className="container-fluid py-4">
        <h4>Our community reviews</h4>
        <div className="row">{renderReviews()}</div>
      </section>
    </>
  );
}
