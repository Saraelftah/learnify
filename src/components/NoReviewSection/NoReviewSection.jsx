import React from "react";
import feedback from "../../assets/images/feedback-animate (4).svg";

function NoReviewSection() {
  return (
    <>
      <h3 className="text-xl font-bold mb-2 text-shadow-md">Reviews <i className="fa-solid fa-star text-[var(--secondary-color)]"></i> </h3>
      <div className="flex justify-center gap-3 p-8 items-center">
        <div>
          <img src={feedback} alt="" />
        </div>
        <p className="text-[var(--text-color)] text-center font-semibold">
          No reviews yet. <br></br> Be the first to review this teacher!
        </p>
      </div>
    </>
  );
}

export default NoReviewSection;
