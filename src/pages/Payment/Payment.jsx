import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";
import RatingStars from "../../components/RatingStars/RatingStars";
const steps = ["Book", "Your Details", "Payment"];

function Payment() {
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
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
              {/* Teacher Image */}
              <div className="avatar">
                <div className="w-24 rounded-full">
                  <img
                    src={teacher?.Image}
                    alt="Teacher"
                    className="w-16 h-16 object-cover"
                  />
                </div>
              </div>
              {/* Rating */}
              <div className="flex mt-2">
                <RatingStars value={teacher?.rating || 0} />
              </div>
              <h2 className="mt-3 text-lg font-semibold">
                Teacher Name: {teacher?.name}
              </h2>
              {/* Hourly Rate */}
              <div className="mt-4 space-y-3 text-gray-700">
                <p>
                  <span className="font-medium">Hourly Rate: </span>
                  <span className="text-yellow-600 font-semibold">
                    ${teacher?.hourlyRate}
                  </span>
                </p>
                <p>
                  <span className="font-medium">Session Type: </span>
                  <span>
                    {sessionType || "Select a type"}
                    {sessionType === "Group Session" && teacher?.hourlyRate && (
                      <span className="ml-2 text-sm text-gray-500">
                        ({teacher?.hourlyRate / 3}$/student)
                      </span>
                    )}
                  </span>
                </p>
              </div>
              {/* Session Type: Private or Group */}
              <div className="flex gap-6 mb-6 mt-5">
                <label className="label cursor-pointer">
                  <input
                    type="radio"
                    value="Private"
                    {...register("sessionType", {
                      required: "Session type is required.",
                    })}
                    className="radio radio-warning"
                  />
                  <span className="label-text ml-2">Private</span>
                </label>
                <label className="label cursor-pointer">
                  <input
                    type="radio"
                    value="Group Session"
                    {...register("sessionType", {
                      required: "Session type is required.",
                    })}
                    className="radio radio-warning"
                  />
                  <span className="label-text ml-2">Group Session</span>
                </label>
              </div>
              {errors.sessionType && (
                <p className="text-[var(--error-color)] text-sm mb-4 mt-1">
                  {errors.sessionType.message}
                </p>
              )}
              {/* Date & Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label font-medium mb-1">
                    Available Dates
                  </label>
                  <select
                    className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-[var(--secondary-color)]"
                    {...register("selectedDate", {
                      required: "Date is required.",
                    })}
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
                  {errors.selectedDate && (
                    <p className="text-[var(--error-color)] text-sm mb-4 mt-1">
                      {errors.selectedDate.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="label font-medium mb-1">
                    Available Times
                  </label>
                  <select
                    className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-[var(--secondary-color)]"
                    {...register("selectedTime", {
                      required: "Time is required.",
                    })}
                  >
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
                      : teacher?.availableGroupDates?.map((time, index) => (
                          <option
                            key={index}
                            value={` ${time.time} ${time.period}`}
                          >
                            {time.time} {time.period}
                          </option>
                        ))}
                  </select>
                  {errors.selectedTime && (
                    <p className="text-[var(--error-color)] text-sm mb-4 mt-1">
                      {errors.selectedTime.message}
                    </p>
                  )}
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
                  {...register("title", { required: "Title is required" })}
                >
                  <option value="">Title</option>
                  <option value="Mr">Mr</option>
                  <option value="Ms">Ms</option>
                </select>
                {errors.title && (
                  <span className="text-[var(--error-color)] text-sm mb-4 mt-1">
                    {errors.title.message}
                  </span>
                )}
                <input
                  type="text"
                  placeholder="First Name"
                  className="input input-bordered"
                  {...register("firstName", {
                    required: "Please write your first name",
                    pattern: {
                      value: /^[a-zA-Z]+$/,
                      message: "Please enter a valid first name",
                    },
                  })}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="input input-bordered"
                  {...register("lastName", {
                    required: "Please write your last name",
                    pattern: {
                      value: /^[a-zA-Z]+$/,
                      message: "Please enter a valid last name",
                    },
                  })}
                />
                {errors.firstName && (
                  <span className="text-[var(--error-color)] text-sm mb-4 mt-1">
                    {errors.firstName.message}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="input input-bordered"
                  {...register("email", { required: "Email is required",
                    pattern: {
                      value: /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])/,
                      message: "Please enter a valid email address",
                    },
                   })}
                />
                {errors.email && (
                  <span className="text-[var(--error-color)] text-sm mb-4 mt-1">
                    {errors.email.message}
                  </span>
                )}
                <input
                  type="tel"
                  placeholder="Mobile"
                  className="input input-bordered"
                  {...register("mobile", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^\d{11}$/,
                      message: "Please enter a valid 11-digit phone number",
                    },
                  })}
                />
                {errors.mobile && (
                  <span className="text-[var(--error-color)] text-sm mb-4 mt-1">
                    {errors.mobile.message}
                  </span>
                )}
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
                {...register("cardNumber", { required: "Card number is required",
                  pattern: {
                    value: /^\d{16}$/,
                    message: "Please enter a valid 16-digit card number",
                  },
                 })}
              />
              {errors.cardNumber && (
                <span className="text-[var(--error-color)] text-sm mb-4 mt-1">
                  {errors.cardNumber.message}
                </span>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 mt-2">
                <input
                  type="text"
                  placeholder="CVV"
                  className="input input-bordered"
                  {...register("cvv", { required: "CVV is required",
                    pattern: {
                      value: /^\d{3}$/,
                      message: "Please enter a valid 3-digit CVV",
                    },
                   })}
                />
                {errors.cvv && (
                  <span className="text-[var(--error-color)] text-sm mb-4 mt-1">
                    {errors.cvv.message}
                  </span>
                )}
                <input
                  type="text"
                  placeholder="Expiry Date (MM/YY)"
                  className="input input-bordered"
                  {...register("expiry", { required: "Expiry Date is required",
                    pattern: {
                      value: /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/,
                      message: "Please enter a valid expiry date (MM/YY)",
                    },
                   })}
                />
                {errors.expiry && (
                  <span className="text-[var(--error-color)] text-sm mb-4 mt-1">
                    {errors.expiry.message}
                  </span>
                )}
              </div>
              <input
                type="text"
                placeholder="Card Holder (Your Name)"
                className="input input-bordered w-full"
                {...register("cardHolder", { required: "Card Holder is required",
                  pattern: {
                    value: /^[a-zA-Z\s]+$/,
                    message: "Please enter a valid name",
                  },
                 })}
              />
              {errors.cardHolder && (
                <span className="text-[var(--error-color)] text-sm mb-1">
                  {errors.cardHolder.message}
                </span>
              )}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            <button
              type="button"
              className="btn bg-[var(--secondary-color)] border-[var(--secondary-color)] text-[var(--background-color)]"
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
                className="btn bg-[var(--secondary-color)] border-[var(--secondary-color)] text-[var(--background-color)]"
                onClick={handleSubmit(() => {
                  handleNext();
                })}
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
