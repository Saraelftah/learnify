import React from "react";

function PendingImg() {
  return (
    <div className="lg:w-2/6" data-aos="fade-left">
      <div className="text-center text-2xl font-semibold text-shadow-lg">
        <h2 className="text-base md:text-lg lg:text-2xl">
          Welcome aboard! We’re excited to have you here! Fill in your details
          and begin your teaching journey.
        </h2>
      </div>
      <div className="w-50 mx-auto lg:w-full">
        <img
          src="/images/online-learning-animate.svg"
          alt="online learning image"
        />
      </div>
    </div>
  );
}

export default PendingImg;
