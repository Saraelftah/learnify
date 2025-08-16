import React from "react";
import { NavLink } from "react-router-dom";
function ChooseTeacher() {
    // This component is a placeholder for when no teacher is selected
  return (
    <>
        <div className="text-center mt-50 ">
          Choose a teacher to proceed with booking.
        </div>
        <div className="flex justify-center mt-20">
          <NavLink
            to={"/"}
            className="btn border-[var(--secondary-color)] bg-white text-[var(--secondary-color)] w-fit"
          >
            Back to Home
          </NavLink>
        </div>
    </>
  );
}

export default ChooseTeacher;
