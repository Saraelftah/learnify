import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useSelector } from "react-redux";
import "./RecommendedTeachers.module.css";
import RatingStars from "../RatingStars/RatingStars";
import { NavLink } from "react-router-dom";

function RecommendedTeachers() {
  const teachers = useSelector((state) => state.teachers.teachers);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const CustomLeftArrow = ({ onClick }) => (
  <button 
    onClick={() => onClick()} 
    className="absolute left-5 top-1/2 transform -translate-y-1/2 w-[50px] h-[50px] bg-[var(--secondary-color)] hover:bg-[var(--background-color)] border-2 border-[var(--secondary-color)] rounded-full flex items-center justify-center cursor-pointer text-white hover:text-[var(--secondary-color)]"
  >
    <i className="fa-solid fa-chevron-left "></i>
  </button>
);

const CustomRightArrow = ({ onClick }) => (
  <button 
    onClick={() => onClick()} 
    className="absolute right-5 top-1/2 transform -translate-y-1/2 w-[50px] h-[50px] bg-[var(--secondary-color)] hover:bg-[var(--background-color)] border-2 border-[var(--secondary-color)] rounded-full flex items-center justify-center cursor-pointer text-white hover:text-[var(--secondary-color)]"
  >
    <i className="fa-solid fa-chevron-right"></i>
  </button>
);

  return (
    <>
      <div className="recommended-teachers py-[50px]">
        <h3 className="text-[var(--dark-color)] font-bold mb-5 text-[length:var(--title-font-size)]">
          recommended teachers
        </h3>
        <Carousel
          responsive={responsive}
          itemClass="px-2 py-10 bg-transparent"
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={2000}
          customTransition="all .5"
          transitionDuration={500}
          customLeftArrow={<CustomLeftArrow />} 
  customRightArrow={<CustomRightArrow />}
        >
          {teachers
            .filter((teacher) => teacher.rating > 4)
            .map((teacher) => (
              <div
                key={teacher.id}
                className="teacher-card p-4 rounded-[var(--border-radius)] shadow-lg flex flex-col items-center"
              >
                <img
                  className="rounded-full !w-50 mb-5"
                  src={teacher.Image}
                  alt={teacher.name}
                />
                <h3 className="text-[var(--primary-color)]  font-bold ">
                  {teacher.name}
                </h3>
                <p className="mb-2">{teacher.subject}</p>
                <span>
                  <RatingStars value={teacher.rating} />
                </span>
                <div className="flex gap-2 mt-2">
                <NavLink
                  to={`/payment/${teacher.id}`}>
                  <button className="btn btn-outline block border-[var(--secondary-color)] text-[var(--secondary-color)] w-fit hover:bg-[var(--secondary-color)] hover:text-white">
                  view more</button>
                </NavLink>
                <NavLink
                  to={`/payment/${teacher.id}`}>
                  <button className="btn btn-outline block border-[var(--secondary-color)] text-[var(--secondary-color)] w-fit hover:bg-[var(--secondary-color)] hover:text-white">
                  book now </button>
                </NavLink>
                </div>
              </div>
            ))}
        </Carousel>
      </div>
    </>
  );
}

export default RecommendedTeachers;
