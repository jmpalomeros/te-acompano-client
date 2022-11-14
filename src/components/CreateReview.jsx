import { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createReviewService } from "../service/review.services";
import { AuthContext } from "../context/auth.context";

function CreateReview() {
  const { serviceId } = useParams();

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [reviewInput, setReviewInput] = useState("");
  const [ratingInput, setRatingInput] = useState("");

  const handleReviewChange = (event) => setReviewInput(event.target.value);
  const handleRatingChange = (event) => setRatingInput(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newReview = {
      reviewAuthor: user._id,
      reviewedService: serviceId,
      // ratedVolunteer:    , // entrar en offeredServices del serviceId
      review: reviewInput,
      rating: ratingInput,
    };

    try {
      await createReviewService(newReview);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  return (
    <div>
      <form>
        <label htmlFor="review">Reseña: </label>
        <input
          type="text"
          name="review"
          value={reviewInput}
          onChange={handleReviewChange}
        />
        <br />
        <label htmlFor="rating">Rating: </label>
        <input
          type="number"
          name="rating"
          value={ratingInput}
          onChange={handleRatingChange}
        />
        <br />
        <button onClick={handleSubmit}>Crear reseña</button>
      </form>
    </div>
  );
}

export default CreateReview;