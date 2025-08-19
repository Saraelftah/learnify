import React from "react";
import { NavLink } from "react-router-dom";
function ChooseTeacher() {
  // This component is a placeholder for when no teacher is selected
  return (
    <>
      <div className="flex flex-col gap-8 justify-center mt-30 mb-30 items-center">
        <span>Choose a teacher to proceed with booking.</span>
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
