import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import RatingStars from "../../components/RatingStars/RatingStars";
import ConfirmPopup from "../../components/ConfirmPopup/ConfirmPopup";
import { bookAppointment } from "../../store/StudentsSlice";
import { useEffect } from "react";
import paymentImg from "../../assets/images/payment.png";

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
  const navigate = useNavigate();
  //Select the teacher from the Redux store using the ID from the URL
  const teachers = useSelector((state) => state.teachers.teachers);
  const teacher = teachers.find((t) => t.id === TeacherId);
  // steps
  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);
  const sessionType = watch("sessionType");
  const [showPopup, setShowPopup] = useState(false);
  // Current user
  const currentUser = useSelector((state) => state.users.currentUser);
  const handleFinish = (data) => {
    const roomName = `Session_${Date.now()}`;
    const jistsiLink = `https://meet.jit.si/${roomName}`;
    const bookingDetails = {
      id: Date.now(), // unique id
      teacherId: TeacherId,
      teacherImage: teacher?.Image,
      teacherName: teacher?.name,
      subject: teacher?.subject,
      sessionType: data.sessionType,
      date: data.selectedDate,
      time: data.selectedTime,
      meetingLink: jistsiLink,
      price:
        data.sessionType === "Group Session"
          ? teacher?.hourlyRate * 0.8
          : teacher?.hourlyRate,
      payment: {
        cardHolder: data.cardHolder,
        last4: data.cardNumber.slice(-4),
      },
      status: "Paid",
    };
    // using a confirm popup to confirm the booking
    setShowPopup({
      title: "Confirm Booking",
      message: `Are you sure you want to book a ${data.sessionType} session with
      ${teacher?.name}
       on ${data.selectedDate} at ${data.selectedTime}
        for EGP${bookingDetails.price}
       ?`,
      onConfirm: async() => {
        try {
          await dispatch(
            bookAppointment({
              studentId: currentUser?.uid,
              bookingDetails,
        })
          ).unwrap();

          setActiveStep(steps.length);
          setShowPopup(false);
        } catch (error) {
          console.error("Error booking appointment:", error);
          setShowPopup({
            title: "Booking Failed",
            message:
              "There was an error booking your appointment. Please try again.",
            onConfirm: () => setShowPopup(false),
          });
        }
      },
      onCancel: () => {
        setShowPopup(false);
      },
    });
  };
    // Navigate after booking
  useEffect(() => {
    if (activeStep === steps.length) {
      navigate("/successfulPayment");
    }
  }, [activeStep, navigate]);

  return (
    <div className="w-full p-4 mt-30">
      <div className="container">
        {/* Confirm Popup */}
        {showPopup && (
          <ConfirmPopup
            title={showPopup.title}
            description={showPopup.message}
            buttonTitle="Confirm"
            buttonFunction={showPopup.onConfirm}
            close={showPopup.onCancel}
          />
        )}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 shadow-[var(--box-shadow)] p-10 capitalize">
          {/* Stepper */}
          <div className="col-span-3">
            <ul className="steps w-full mb-2">
              {steps.map((label, index) => (
                <li
                  key={label}
                  className={`step ${
                    index <= activeStep
                      ? "step-accent after:!bg-[var(--secondary-color)] after:!border-none after:!text-white before:!border-none before:!bg-[var(--secondary-color)]"
                      : ""
                  } `}
                >
                  {label}
                </li>
              ))}
            </ul>
            {activeStep === steps.length ? (
              navigate("/successfulPayment")
            ) : (
              <form onSubmit={handleSubmit(handleFinish)}>
                {/* Step 1: Book */}
                {activeStep === 0 && (
                  <div>
                    {/* Teacher card */}
                    <div className="teacher-info p-5 shadow-[var(--box-shadow)] w-fit my-10 rounded-[var(--border-radius)]">
                      <h3 className="text-[var(--dark-color)] font-bold pb-3">teacher details</h3>
                      <div className="flex items-center gap-5">
                      <div className="w-24 rounded-full">
                        <img
                          src={teacher?.Image}
                          alt="Teacher"
                          className="rounded-full"
                        />
                      </div>
                      <div className="">
                          <h4 className="text-[var(--text-color)] mb-2">{teacher?.name}</h4>
                          {/* Rating */}
                          <RatingStars value={teacher?.rating || 0} />
                        </div>
                      </div>
                    </div>

                    

                    <div className="mt-2 space-y-3 ">
                      {/* Hourly Rate */}
                      <div className="flex join-horizontal">
                        <span className="mr-2 font-bold text-[var(--dark-color)]">Session price:</span>
                        {sessionType === "Group Session" ? (
                          <div>
                            <span className="text-[var(--text-color)] line-through mr-2">
                              EGP {teacher?.hourlyRate}
                            </span>
                            <span>EGP {teacher?.hourlyRate * 0.8}</span>
                          </div>
                        ) : (
                          <span>EGP {teacher?.hourlyRate}</span>
                        )}
                      </div>
                      {/* Session Type: Private or Group */}
                      <div className="flex gap-6 mb-6 mt-3">
                        <label className="label cursor-pointer">
                          <input
                            type="radio"
                            value="Private"
                            {...register("sessionType", {
                              required: "Session type is required.",
                            })}
                            className="radio bg-white border-[var(--secondary-color)]  checked:bg-white checked:text-[var(--secondary-color)] checked:border-[var(--secondary-color)]"
                          />
                          <span className="text-[var(--main-text-color)] ml-2">
                            Private
                          </span>
                        </label>
                        <label className="label cursor-pointer">
                          <input
                            type="radio"
                            value="Group Session"
                            {...register("sessionType", {
                              required: "Session type is required.",
                            })}
                            className="radio bg-white border-[var(--secondary-color)]  checked:bg-white checked:text-[var(--secondary-color)] checked:border-[var(--secondary-color)]"
                          />
                          <span className="text-[var(--main-text-color)] ml-2">
                            Group Session
                          </span>
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
                          <label className="label font-medium mb-1 text-[var(--dark-color)]">
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
                              : teacher?.availableGroupDates?.map(
                                  (date, index) => (
                                    <option key={index} value={date.day}>
                                      {date.day}
                                    </option>
                                  )
                                )}
                          </select>
                          {errors.selectedDate && (
                            <p className="text-[var(--error-color)] text-sm mb-4 mt-1">
                              {errors.selectedDate.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="label font-medium mb-1 text-[var(--dark-color)]">
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
                              : teacher?.availableGroupDates?.map(
                                  (time, index) => (
                                    <option
                                      key={index}
                                      value={` ${time.time} ${time.period}`}
                                    >
                                      {time.time} {time.period}
                                    </option>
                                  )
                                )}
                          </select>
                          {errors.selectedTime && (
                            <p className="text-[var(--error-color)] text-sm mb-4 mt-1">
                              {errors.selectedTime.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Your Details */}
                {activeStep === 1 && (
                  <div className=" shadow p-6 rounded-lg pt-20 pb-20">
                    <div className="flex gap-8 mb-4">
                      {/* FirstName input */}
                      <div className="flex flex-col w-full">
                        <label htmlFor="firstName">First Name</label>
                        <input
                          type="text"
                          className="input input-bordered"
                          {...register("firstName", {
                            required: "Please write your first name",
                            pattern: {
                              value: /^[a-zA-Z]+$/,
                              message: "Please enter a valid first name",
                            },
                          })}
                        />
                        {errors.firstName && (
                          <p className="text-[var(--error-color)] text-sm mb-4 mt-1">
                            {errors.firstName.message}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col w-full">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                          type="text"
                          className="input input-bordered"
                          {...register("lastName", {
                            required: "Please write your last name",
                            pattern: {
                              value: /^[a-zA-Z]+$/,
                              message: "Please enter a valid last name",
                            },
                          })}
                        />
                        {errors.lastName && (
                          <span className="text-[var(--error-color)] text-sm mb-4 mt-1">
                            {errors.lastName.message}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-8 mt-10">
                      <div className="flex flex-col w-full">
                        <label htmlFor="email">Email</label>
                        <input
                          type="email"
                          className="input input-bordered"
                          {...register("email", {
                            required: "Email is required",
                            pattern: {
                              value:
                                /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])/,
                              message: "Please enter a valid email address",
                            },
                          })}
                        />
                        {errors.email && (
                          <span className="text-[var(--error-color)] text-sm mb-4 mt-1">
                            {errors.email.message}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col w-full">
                        <label htmlFor="mobile">Mobile</label>
                        <input
                          type="tel"
                          className="input input-bordered"
                          {...register("mobile", {
                            required: "Phone number is required",
                            pattern: {
                              value: /^\d{11}$/,
                              message:
                                "Please enter a valid 11-digit phone number",
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
                  </div>
                )}
                {/* Step 3: Payment */}
                {activeStep === 2 && (
                  <div className="shadow p-6 rounded-lg pt-20 pb-20">
                    <div className="relative w-full">
                      <div>
                        <label htmlFor="cardNumber">Card Number</label>
                        <input
                          type="text"
                          className="input input-bordered w-full pr-20"
                          {...register("cardNumber", {
                            required: "Card number is required",
                            pattern: {
                              value: /^\d{16}$/,
                              message:
                                "Please enter a valid 16-digit card number",
                            },
                          })}
                        />
                      </div>
                      <div className="absolute bottom-1  right-3 flex items-center gap-2 pointer-events-none text-2xl text-gray-400">
                        <i className="fa-brands fa-cc-visa" />
                        <i className="fa-brands fa-cc-amex" />
                        <i className="fa-brands fa-cc-mastercard" />
                      </div>
                    </div>
                    {errors.cardNumber && (
                      <span className="text-[var(--error-color)] text-sm mb-3 mt-1">
                        {errors.cardNumber.message}
                      </span>
                    )}
                    {/* CVV and Expiry date */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="flex flex-col w-full">
                        <label htmlFor="cvv">Cvv</label>
                        <input
                          type="text"
                          className="input input-bordered"
                          {...register("cvv", {
                            required: "CVV is required",
                            pattern: {
                              value: /^\d{3}$/,
                              message: "Please enter a valid 3-digit CVV",
                            },
                          })}
                        />
                        {errors.cvv && (
                          <span className="text-[var(--error-color)] text-sm mb-3 mt-1">
                            {errors.cvv.message}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col w-full">
                        <label htmlFor="expiry">Expiry Date</label>
                        <input
                          type="text"
                          placeholder="(MM/YY)"
                          className="input input-bordered"
                          {...register("expiry", {
                            required: "Expiry Date is required",
                            pattern: {
                              value: /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/,
                              message:
                                "Please enter a valid expiry date (MM/YY)",
                            },
                          })}
                        />
                        {errors.expiry && (
                          <span className="text-[var(--error-color)] text-sm mb-3 mt-1">
                            {errors.expiry.message}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col w-full mt-4">
                      <label htmlFor="cardHolder">Card Holder</label>
                      <input
                        type="text"
                        className="input input-bordered w-full"
                        {...register("cardHolder", {
                          required: "Card Holder is required",
                          pattern: {
                            value: /^[a-zA-Z\s]+$/,
                            message: "Please enter a valid name",
                          },
                        })}
                      />
                      {errors.cardHolder && (
                        <span className="text-[var(--error-color)] text-sm mb-3 mt-1">
                          {errors.cardHolder.message}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-6">
                  <button
                    type="button"
                    className="btn  border-[var(--secondary-color)] text-[var(--secondary-color)]
               disabled:border-[var(--background-color)] disabled:text-[var(--background-color)] "
                    onClick={handleBack}
                    disabled={activeStep === 0}
                  >
                    Back
                  </button>
                  {activeStep === steps.length - 1 ? (
                    <button
                      type="submit"
                      className="btn bg-[var(--secondary-color)] border-[var(--secondary-color)] text-[var(--background-color)]"
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
          <div className="payment-img col-span-2">
            <img src={paymentImg} alt="payment" />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Payment;
