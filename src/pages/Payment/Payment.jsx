<<<<<<< HEAD
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";
=======
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { clearBookingTeacher } from "../../store/BookedTeacherSlice";
>>>>>>> 44c5c17 (teacher Page with book now button to navigate to payment page)

const steps = ["Book", "Your Details", "Payment"];

function Payment() {
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useDispatch();
<<<<<<< HEAD

  const { register, handleSubmit } = useForm();
  const { id: TeacherId } = useParams();
  //Select the teacher from the Redux store using the ID from the URL
  const teachers = useSelector((state) => state.teachers.teachers);
  const teacher = teachers.find((t) => t.id === TeacherId);
  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);
    useEffect(() => {
    if (activeStep === steps.length) {
      toast.success(" You've completed payment successfully!");
    }
  }, [activeStep, steps.length]);
  const handleFinish = (data) => {
    console.log("Form submitted:", data);
    setActiveStep(steps.length);
  };

=======
  const teacher = useSelector((state) => state.bookedTeacher.selectedTeacher);

  const { register, handleSubmit } = useForm();

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleFinish = (data) => {
    console.log("Form submitted:", data);
    setActiveStep(steps.length);
    dispatch(clearBookingTeacher());
  };

  // if (!teacher) {
  //   return (
  //     <div className="text-center">
  //       Choose a teacher to proceed with booking.
  //     </div>
  //   );
  // }

>>>>>>> 44c5c17 (teacher Page with book now button to navigate to payment page)
  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      {/* Stepper */}
      <ul className="steps w-full mb-8">
        {steps.map((label, index) => (
          <li
            key={label}
<<<<<<< HEAD
            className={`step ${index <= activeStep ? "step-accent" : ""}`}
=======
            className={`step ${index <= activeStep ? "step-primary" : ""}`}
>>>>>>> 44c5c17 (teacher Page with book now button to navigate to payment page)
          >
            {label}
          </li>
        ))}
      </ul>

      {activeStep === steps.length ? (
<<<<<<< HEAD
        <div className="text-center mt-20">
          <div className="text-center">
            <span>summary ! </span>
=======
        <div className="text-center">
          <div role="alert" className="alert alert-success">
            <span>You 've completed payment successfully! </span>
>>>>>>> 44c5c17 (teacher Page with book now button to navigate to payment page)
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(handleFinish)}>
          {/* Step 1: Book */}
          {activeStep === 0 && (
            <div className="bg-base-100 shadow p-6 rounded-lg">
              <h3 className="text-lg font-bold text-center uppercase mb-6">
                Schedule
              </h3>
              <p className="mb-4">
                <strong>Teacher Name:</strong> {teacher?.name}
              </p>
              {/* Session Type */}
              <div className="flex gap-6 mb-6">
                <label className="label cursor-pointer">
                  <input
                    type="radio"
                    value="Private"
                    {...register("sessionType", { required: true })}
                    className="radio radio-warning"
                  />
                  <span className="label-text ml-2">Private</span>
                </label>
                <label className="label cursor-pointer">
                  <input
                    type="radio"
                    value="Group Session"
                    {...register("sessionType", { required: true })}
                    className="radio radio-warning"
                  />
                  <span className="label-text ml-2">Group Session</span>
                </label>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label font-medium">Available Dates</label>
                  <select
                    className="select select-bordered w-full"
                    {...register("selectedDate", { required: true })}
                  >
                    <option value="">Select a day</option>
                    <option value="2025-09-12">12 Sep 2025</option>
                    <option value="2025-09-13">13 Sep 2025</option>
                    <option value="2025-09-14">14 Sep 2025</option>
                  </select>
                </div>
                <div>
                  <label className="label font-medium">Available Times</label>
<<<<<<< HEAD
                  <select className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-[var(--secondary-color)]">
                    <option value="">Select a time</option>
                    {teacher?.availableDates?.map((slot, index) => (
                      <option
                        key={index}
                        value={`${slot.day} ${slot.time} ${slot.period}`}
                      >
                        {slot.day} - {slot.time} {slot.period}
                      </option>
                    ))}
                  </select>
=======
                  {/* <select>
                    <option value="">Select a time</option>
                    {teacher.availableTimes.map((time, index) => (
                      <option key={index} value={time}>
                        {time}
                      </option>
                    ))}
                  </select> */}
>>>>>>> 44c5c17 (teacher Page with book now button to navigate to payment page)
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Your Details */}
          {activeStep === 1 && (
            <div className="bg-base-100 shadow p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-6">Your Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <select
                  className="select select-bordered"
                  {...register("title", { required: true })}
                >
                  <option value="">Title</option>
                  <option value="Mr">Mr</option>
                  <option value="Ms">Ms</option>
                </select>
                <input
                  type="text"
                  placeholder="First Name"
                  className="input input-bordered"
                  {...register("firstName", { required: true })}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="input input-bordered"
                  {...register("lastName", { required: true })}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="input input-bordered"
                  {...register("email", { required: true })}
                />
                <input
                  type="tel"
                  placeholder="Mobile"
                  className="input input-bordered"
                  {...register("mobile", { required: true })}
                />
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {activeStep === 2 && (
            <div className="bg-base-100 shadow p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-6">Payment Details</h3>
              <input
                type="text"
                placeholder="Card Number"
                className="input input-bordered w-full mb-4"
                {...register("cardNumber", { required: true })}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="CVV"
                  className="input input-bordered"
                  {...register("cvv", { required: true })}
                />
                <input
                  type="text"
                  placeholder="Expiry Date"
                  className="input input-bordered"
                  {...register("expiry", { required: true })}
                />
              </div>
              <input
                type="text"
                placeholder="Card Holder"
                className="input input-bordered w-full"
                {...register("cardHolder", { required: true })}
              />
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            <button
              type="button"
<<<<<<< HEAD
              className="btn bg-[var(--secondary-color)] border-[var(--secondary-color)]"
=======
              className="btn"
              style={{
                backgroundColor: "var(--light-secondary-color)",
                borderColor: "var(--light-secondary-color)",
              }}
>>>>>>> 44c5c17 (teacher Page with book now button to navigate to payment page)
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              Back
            </button>

            {activeStep === steps.length - 1 ? (
              <button
                type="submit"
                className="btn"
                style={{
                  backgroundColor: "var(--secondary-color)",
                  borderColor: "var(--secondary-color)",
                }}
              >
                Finish
              </button>
            ) : (
              <button
                type="button"
                className="btn"
                style={{
                  backgroundColor: "var(--secondary-color)",
                  borderColor: "var(--secondary-color)",
                }}
<<<<<<< HEAD
                onClick={handleSubmit(()=> {
                  handleNext()})}
=======
                onClick={handleNext}
>>>>>>> 44c5c17 (teacher Page with book now button to navigate to payment page)
              >
                Next
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
}

export default Payment;
