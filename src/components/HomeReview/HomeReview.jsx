import React, { useState } from 'react'
import Carousel from "react-multi-carousel";
import RatingStars from '../RatingStars/RatingStars';
function HomeReview({teachers}) {

    const [currentSlide, setCurrentSlide] = useState(0);
    const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    }
  }

  // arrows for review section
  const CustomButtonGroup = ({ next, previous }) => (
    <div className="flex justify-center gap-5 mt-5">
        <button
            onClick={previous}
            className="btn btn-circle btn-outline p-3 border-2 border-[var(--secondary-color)] bg-[var(--background-color)] text-[var(--secondary-color)] hover:bg-[var(--secondary-color)] hover:text-white transition-colors"
        >
            <i className="fa-solid fa-chevron-left"></i>
        </button>
        <button
            onClick={next}
            className="btn btn-circle btn-outline p-3 border-2 border-[var(--secondary-color)] bg-[var(--background-color)] text-[var(--secondary-color)] hover:bg-[var(--secondary-color)] hover:text-white transition-colors"
        >
            <i className="fa-solid fa-chevron-right"></i>
        </button>
    </div>
  )


  return (
    <>
        {/* reviews section */}
      <section className="reviews my-[50px] py-[50px] relative">
        <div className="container">
        <h3 className="text-[var(--dark-color)] text-[length:var(--title-font-size)] font-bold capitalize mb-2">testiomonials</h3>
        <p>what students say about us?</p>
        <Carousel
        responsive={responsive}
        itemClass="px-2"
        arrows={false}
        showDots={false}
        containerClass="carousel-container py-15"
        afterChange={(previousSlide, { currentSlide }) => setCurrentSlide(currentSlide)}
        customButtonGroup={<CustomButtonGroup />}
        renderButtonGroupOutside={true}
        >
        {teachers.filter((teacher) => teacher.rating > 4)
        .map((item, i) => {
        const isCenter = i === currentSlide + Math.floor(responsive.desktop.items / 2);


        return(
          <div 
            key={item.id}
            className={` shadow-[var(--box-shadow)] !h-full rounded-[var(--border-radius)] p-5 text-center items-stretch transition-all duration-300 
            ${isCenter ? "scale-y-120 border-2 border-[var(--secondary-color)] shadow-lg" : "scale-95 opacity-80"} `} >
            <i className="fa-solid fa-quote-right text-4xl items-end text-[var(--light-primary-color)] mb-2"></i>
            <div className="flex items-center justify-center">
              <div>
                <h4 className="text-[var(--dark-color)]">{item.reviews[0]?.studentName}</h4>
                <p className="leading-[var(--line-height] my-2">{item.reviews[0]?.comment}</p>
                <RatingStars value={item.reviews[0]?.rating}/>
              </div>
            </div>
          </div>
        )})}
        
        
      </Carousel>
      </div>
      </section>
    </>
  )
}

export default HomeReview