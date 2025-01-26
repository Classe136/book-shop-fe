import Stars from "./Stars";
export default function ReviewComponent({ review }) {
  const { id, text, vote, name } = review;
  return (
    <div key={id} className="card mb-4">
      <div className="card-body">
        <p className="card-text">{text}</p>
        {/* <strong>Vote: {vote}/5</strong> */}
        <strong>Vote: </strong> <Stars vote={vote} />
        <address>
          <i>By {name}</i>
        </address>
      </div>
    </div>
  );
}
