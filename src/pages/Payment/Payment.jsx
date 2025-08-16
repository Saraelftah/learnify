import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";

const steps = ["Book", "Your Details", "Payment"];

function Payment() {
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useDispatch();

  const { register, handleSubmit,watch } = useForm();
  const { id: TeacherId } = useParams();
  //Select the teacher from the Redux store using the ID from the URL
  const teachers = useSelector((state) => state.teachers.teachers);
  const teacher = teachers.find((t) => t.id === TeacherId);
  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);
  const sessionType = watch("sessionType");
    useEffect(() => {
    if (activeStep === steps.length) {
      toast.success(" You've completed payment successfully!");
    }
  }, [activeStep, steps.length]);
  const handleFinish = (data) => {
    console.log("Form submitted:", data);
    setActiveStep(steps.length);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 mt-30">
      {/* Stepper */}
      <ul className="steps w-full mb-8">
        {steps.map((label, index) => (
          <li
            key={label}
            className={`step ${index <= activeStep ? "step-accent" : ""}`}
          >
            {label}
          </li>
        ))}
      </ul>

      {activeStep === steps.length ? (
        <div className="text-center mt-20">
          <div className="text-center">
            <span>summary ! </span>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(handleFinish)}>
          {/* Step 1: Book */}
          {activeStep === 0 && (
            <div className=" shadow p-6 rounded-lg">
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
                    className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-[var(--secondary-color)]"
                    {...register("selectedDate", { required: true })}
                  >
                    <option value="">Select a day</option>
                    {watch("sessionType") === "Private"
                      ? teacher?.availableDates?.map((date, index) => (
                          <option key={index} value={date.day}>
                            {date.day}
                          </option>
                        ))
                      : teacher?.availableGroupDates?.map((date, index) => (
                          <option key={index} value={date.day}>
                            {date.day}
                          </option>
                        ))}
                  </select>
                </div>
                <div>
                  <label className="label font-medium">Available Times</label>
                  <select className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-[var(--secondary-color)]">
                    <option value="">Select a time</option>
                    {watch("sessionType") === "Private"
                      ? teacher?.availableDates?.map((time, index) => (
                        <option
                          key={index}
                          value={`${time.time} ${time.period}`}
                        >
                          {time.time} {time.period}
                        </option>
                      ))
                      :teacher?.availableGroupDates?.map((time, index) => (
                      <option
                        key={index}
                        value={` ${time.time} ${time.period}`}
                      >
                        {time.time} {time.period}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Your Details */}
          {activeStep === 1 && (
            <div className=" shadow p-6 rounded-lg">
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
            <div className=" shadow p-6 rounded-lg">
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
              className="btn bg-[var(--secondary-color)] border-[var(--secondary-color)]"
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
                onClick={handleSubmit(()=> {
                  handleNext()})}
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
