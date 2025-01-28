import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";

import { useGlobalContext } from "../contexts/GlobalContext";
import ReviewComponent from "../components/ReviewComponent";
import Stars from "../components/Stars";
import FormReview from "../components/FormReview";

const apiUrl = import.meta.env.VITE_API_URL;
const bookEndPoint = "/books";
const imgPath = "http://localhost:3000/img/books/";
export default function BookDetail() {
  const [book, setBook] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const { setIsLoading } = useGlobalContext();
  useEffect(getData, [id]);
  function getData() {
    setIsLoading(true);
    axios
      .get(`${apiUrl}${bookEndPoint}/${id}`)
      .then((res) => {
        setBook(res.data);
      })
      .catch((error) => {
        console.log(error);
        // setAlertData({
        //   type: "danger",
        //   message: "La pizza che cerci non esiste",
        // });
        navigate("/notfound"); //navigate("/books");
      })
      .finally(() => {
        console.log("Finito");
        setIsLoading(false);
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
        <div className="d-flex justify-content-between">
          <h4>Our community reviews</h4>
          <div>
            <strong>Vote average </strong>
            <Stars vote={book?.vote_average} />
          </div>
        </div>

        <div className="row">{renderReviews()}</div>
      </section>
      <section className="container-fluid py-4">
        <FormReview book_id={book?.id} reloadReviews={getData} />
      </section>
    </>
  );
}
