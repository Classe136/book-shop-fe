import { useState, useEffect } from "react";
import axios from "axios";

import { useGlobalContext } from "../contexts/GlobalContext";
import CardComponent from "../components/CardComponent";

const apiUrl = import.meta.env.VITE_API_URL;
const bookEndPoint = "/books";

export const Books = () => {
  const [books, setBooks] = useState([]);
  const { setIsLoading } = useGlobalContext();
  useEffect(getData, []);

  function getData() {
    setIsLoading(true);
    axios
      .get(`${apiUrl}${bookEndPoint}`)
      .then((res) => {
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
      </div>
    </section>
  );
};
