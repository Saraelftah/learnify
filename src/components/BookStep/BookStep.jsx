import { useEffect, useMemo, useState } from "react";
import RatingStars from "../RatingStars/RatingStars";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import paymentImg from "../../assets/images/payment.png";


function BookStep({
  teacher,
  sessionType,
  availableDates,
  availableGroupDates,
  availableTimes,
  register,
  errors,
  setValue,
  watch,
}) {
  const [isDateTimeDisabled, setIsDateTimeDisabled] = useState(true);
  const selectSession = watch("sessionType");

  useEffect(() => {
    if (selectSession) {
      setIsDateTimeDisabled(false);
    } else {
      setIsDateTimeDisabled(true);
    }
  }, [selectSession]);

  const datesToDisplay = useMemo(() => {
    const dates =
      sessionType === "Private" ? availableDates : availableGroupDates;
    if (!dates) return [];
    // return dates.map((d) => d.date);
    return [...new Set(dates.map((d) => d.date))];
  }, [sessionType, availableDates, availableGroupDates]);

  const allowedDates = useMemo(() => {
    return datesToDisplay.map((d) => new Date(d));
  }, [datesToDisplay]);

  const selectedDateValue = watch("selectedDate");
  const selectedDateObject = selectedDateValue
    ? new Date(selectedDateValue)
    : null;

  return (
    <>
      <div className="px-8">
        
        <div className="w-40 mx-auto"><img src={paymentImg} alt="payment" /></div>
        
        <div className="mt-2 space-y-3">
          {/* Session price */}
          <div className="flex">
            {/* <span className="mr-2 font-bold text-[var(--dark-color)]">
              Session price:
            </span>
            {sessionType === "Group Session" ? (
              <div>
                <span className="text-[var(--text-color)] line-through mr-2">
                  EGP {teacher?.hourlyRate}
                </span>
                <span className="text-[var(--stars-color)] font-semibold">
                  EGP {teacher?.hourlyRate * 0.8}
                </span>
              </div>
            ) : (
              <span>EGP {teacher?.hourlyRate}</span>
            )} */}

            {sessionType === "Group Session" ? (
              <div>
                <span className="text-[var(--text-color)] line-through mr-2">
                  EGP {teacher?.hourlyRate}
                </span>
                <span className="text-[var(--stars-color)] font-semibold">
                  EGP {teacher?.hourlyRate * 0.8}
                </span>
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
                className="radio bg-white border-[var(--secondary-color)] checked:bg-white checked:text-[var(--secondary-color)] checked:border-[var(--secondary-color)]"
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
                className="radio bg-white border-[var(--secondary-color)] checked:bg-white checked:text-[var(--secondary-color)] checked:border-[var(--secondary-color)]"
              />
              <span className="text-[var(--main-text-color)] ml-2">
                Group Session
              </span>
            </label>
          </div>
          {errors.sessionType && (
            <div className="text-red-500 mt-1">
              <i className="fa-solid fa-circle-exclamation text-sm"></i>
              <span className="text-sm">{errors.sessionType.message}</span>
            </div>
          )}

          {/* Date & Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Date Picker */}
            <div className="flex flex-col">
              <label className="label font-medium mb-1 text-[var(--dark-color)]">
                Available Dates
              </label>
              <DatePicker
                placeholderText="Select a date"
                disabled={isDateTimeDisabled}
                dateFormat="dd/MM/yyyy"
                className="border border-gray-300 rounded-md p-2 w-full shadow-md focus:ring-1 focus:ring-[var(--light-secondary-color)] focus:outline focus:outline-[var(--light-secondary-color)] focus:border-[var(--light-secondary-color)]
                bg-[var(--card-background)]"
                selected={selectedDateObject}
                onChange={(date) => {
                  const year = date.getFullYear();
                  const month = String(date.getMonth() + 1).padStart(2, "0");
                  const day = String(date.getDate()).padStart(2, "0");
                  const formattedDate = `${year}-${month}-${day}`;
                  setValue("selectedDate", formattedDate);
                }}
                filterDate={(date) =>
                  allowedDates.some(
                    (d) =>
                      d.getFullYear() === date.getFullYear() &&
                      d.getMonth() === date.getMonth() &&
                      d.getDate() === date.getDate()
                  )
                }
              />
              {errors.selectedDate && (
                <div className="text-red-500 mt-1">
                  <i className="fa-solid fa-circle-exclamation"></i>
                  <span className="text-sm">{errors.selectedDate.message}</span>
                </div>
              )}
            </div>

            {/* Time Select */}
            <div>
              <label className="label font-medium mb-1 text-[var(--dark-color)]">
                Available Times
              </label>
              <select
                className="border border-gray-300 rounded-md p-2 w-full shadow-md focus:ring-1 focus:ring-[var(--light-secondary-color)] focus:outline focus:outline-[var(--light-secondary-color)] focus:border-[var(--light-secondary-color)]"
                disabled={isDateTimeDisabled}
                {...register("selectedTime", {
                  required: "Time is required.",
                })}
              >
                <option value="">Select a time</option>
                {availableTimes?.map((time, index) => {
                  const dateObj = new Date(`2000-01-01T${time.time}`);
                  const formattedTime = dateObj.toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  });

                  return (
                    <option key={index} value={time.time}>
                      {formattedTime}
                    </option>
                  );
                })}
              </select>
              {errors.selectedTime && (
                <div className="text-red-500 mt-1">
                  <i className="fa-solid fa-circle-exclamation"></i>
                  <span className="text-sm">{errors.selectedTime.message}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookStep;

{
  /* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                {datesToDisplay.map((date, index) => (
                  <option key={index} value={date}>
                    {date}
                  </option>
                ))}
              </select>
              {errors.selectedDate && (
                <div className="text-red-500 text-sm lg:text-xl">
                  <i className="fa-solid fa-circle-exclamation"></i>
                  <span className="text-sm">{errors.selectedDate.message}</span>
                </div>
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
                {availableTimes?.map((time, index) => (
                  <option key={index} value={time.time}>
                    {time.time}
                  </option>
                ))}
              </select>
              {errors.selectedTime && (
                <div className="text-red-500 text-sm lg:text-xl">
                  <i className="fa-solid fa-circle-exclamation"></i>
                  <span className="text-sm">{errors.selectedTime.message}</span>
                </div>
              )}
            </div>
          </div> */
}

{
  /* Teacher info card */
}
{
  /* <div className="p-5 shadow-[var(--box-shadow)] w-fit my-10 rounded-[var(--border-radius)] bg-[var(--card-background)]">
          <h3 className="text-[var(--dark-color)] font-bold pb-3">
            Teacher Details
          </h3>
          <div className="flex items-center gap-5">
            <div className="w-24 rounded-full">
              <img
                src={teacher?.Image}
                alt="Teacher"
                className="rounded-full"
              />
            </div>
            <div>
              <h4 className="text-[var(--text-color)] mb-2">{teacher?.name}</h4>
              <RatingStars value={teacher?.rating || 0} />
              <p className="text-[var(--text-color)] mb-2">
                {teacher?.subject}
              </p>
            </div>
          </div>
        </div> */
}
