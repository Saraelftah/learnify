function RatingStars({ value }) {
  return (
    <>
      {[1, 2, 3, 4, 5].map((i) => (
        <i
          key={i}
          className={
            value >= i
              ? "fa-solid fa-star text-yellow-400"
              : value >= i - 0.5
              ? "fa-solid fa-star-half text-yellow-400"
              : "fa-regular fa-star text-gray-400"
          }
        ></i>
      ))}
    </>
  );
}


export default RatingStars;
