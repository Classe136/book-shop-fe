import { useState, useEffect } from "react";
import axios from "axios";

import { useGlobalContext } from "../contexts/GlobalContext";
import CardComponent from "../components/CardComponent";

const apiUrl = import.meta.env.VITE_API_URL;
const bookEndPoint = "/books";

export const Books = () => {
  const [books, setBooks] = useState([]);
  const { setIsLoading } = useGlobalContext();
  const [numPages, setNumPages] = useState(0);
  const [page, setPage] = useState(1);
  useEffect(getData, [page]);
  function handleClick(page) {
    console.log(page);
    setPage(page);
  }
  function getData() {
    setIsLoading(true);
    axios
      .get(`${apiUrl}${bookEndPoint}`, { params: { page } })
      .then((res) => {
        setNumPages(Math.ceil(res.data.count / 2));
        setBooks(res.data.items);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        console.log("Finito");
        setIsLoading(false);
      });
  }

  return (
    <section className="container-fluid">
      <h1>All Books</h1>
      <div className="row gy-4 ">
        {books.map((book) => (
          <div className="col-12 col-md-4 col-lg-3" key={book.id}>
            <CardComponent data={book} />
          </div>
        ))}
        <nav className="col-12">
          <ul className="pagination">
            <li className={`page-item ${page <= 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => handleClick(page - 1)}
              >
                Previous
              </button>
            </li>
            {new Array(numPages).fill("").map((num, index) => (
              <li
                className={`page-item ${page === index + 1 ? "active" : ""} `}
                aria-current="page"
                key={index + 1}
              >
                <button
                  className="page-link"
                  onClick={() => handleClick(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${page >= numPages ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => handleClick(page + 1)}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
};
