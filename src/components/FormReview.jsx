import { useState } from "react";
import axios from "axios";

const initialData = {
  name: "",
  text: "",
  vote: "",
};
const apiUrl = import.meta.env.VITE_API_URL;
const bookEndPoint = "/books";

export default function FormReview({ book_id, reloadReviews }) {
  const [formData, setFormData] = useState(initialData);
  const [isFormValidated, setIsFormValideted] = useState(true);

  // function validateForm() {
  //   if (!formData.text || !formData.name) return false;
  //   if (isNaN(formData.vote) || formData.vote < 1 || formData.vote > 10)
  //     return false;
  //   return true;
  // }
  function handleSubmit(e) {
    e.preventDefault();
    console.log(e);
    setIsFormValideted(true);
    if (!e.target.checkValidity()) {
      return;
    }
    // console.log("dati form ", formData);
    // console.log("id del libro ", book_id);
    axios
      .post(`${apiUrl}${bookEndPoint}/${book_id}/reviews`, formData)
      .then((res) => {
        console.log(res);
        setFormData(initialData);
        setIsFormValideted(false);
        reloadReviews();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        console.log("Finito");
      });

    //http://localhost:3000/api/books/:id/reviews
    //prendere formData e fare una chiamata in post verso backend usando book_id
  }
  function setFieldValue(e) {
    console.log(e.target.value, e.target.name);
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }
  //"was-validated"
  return (
    <div className="card">
      <header className="card-header">
        <h5>Add your review</h5>
      </header>
      <div className="card-body">
        {/* {!isFormValid && (
          <div className="alert alert-danger mb-3">
            The data in the form is not valid
          </div>
        )} */}
        <form
          onSubmit={handleSubmit}
          className={` ${
            isFormValidated ? "was-validated" : "needs-validation"
          }`}
          noValidate
        >
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={setFieldValue}
              required
            />
            <div className="valid-feedback">Looks good!</div>
            <div className="invalid-feedback">Please choose a username.</div>
          </div>
          <div className="form-group">
            <label>Review</label>
            <textarea
              className="form-control"
              name="text"
              value={formData.text}
              onChange={setFieldValue}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label>Voto</label>
            <input
              type="number"
              min="1"
              max="10"
              step="1"
              name="vote"
              className="form-control"
              value={formData.vote}
              onChange={setFieldValue}
              required
            />
          </div>
          <div className="d-flex justify-content-end pt-3">
            <button type="submit" className="btn btn-primary">
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
