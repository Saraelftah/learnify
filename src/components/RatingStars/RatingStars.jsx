import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function RatingStars({ value }) {
  return (
    <>
      <div className="flex gap-1 m-5">
      {[1, 2, 3, 4, 5].map((i) => (
        value >= i ? (
          <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-400" />
        ) : value >= i - 0.5 ? (
          <FontAwesomeIcon key={i} icon={faStarHalf} className="text-yellow-400" />
        ) : (
          <FontAwesomeIcon key={i} icon={faStar} className="text-gray-400" />
        )
      ))}
      </div>
    </>
  );
}

export default RatingStars;
