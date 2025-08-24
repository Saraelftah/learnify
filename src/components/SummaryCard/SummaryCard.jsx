import RatingStars from "../RatingStars/RatingStars";

function SummaryCard({
  teacher,
  sessionType,
  selectedDate,
  selectedTime,
  sessionPrice,
}) {
  // format time
  const convertTo12HourFormat = (time24) => {
    if (!time24) return "";
    const [hours, minutes] = time24.split(":");
    const hour = parseInt(hours, 10);
    const suffix = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${suffix}`;
  };

  //   format date
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <div
        className="flex lg:flex-col lg:gap-5 lg:items-stretch p-5 shadow-[var(--box-shadow)] w-full items-center gap-10
              rounded-[var(--border-radius)] bg-[var(--card-background)] mx-auto text-xs sm:text-sm md:text-base"
      >
        <div>
          <h3 className="text-[var(--dark-color)] font-bold pb-3">
            Teacher Details
          </h3>
          {/* image */}
          <div className="w-20 md:w-40 mx-auto">
            <img src={teacher?.Image} alt="Teacher" className="rounded-lg" />
          </div>
          <div className="text-center">
            {/* name */}
            <h4 className="font-semibold mb-2">{teacher?.name}</h4>
            <RatingStars value={teacher?.rating || 0} />
          </div>
        </div>

        <div className="space-y-2 text-[var(--text-color)] ">
          {/* subject */}
          <p className="text-[var(--text-color)]">
            <b>Subject:</b> {teacher?.subject}
          </p>

          {/* Price Section */}
          <p>
            <b>Price:</b>
            {sessionType === "Group Session" ? (
              <span className="text-[var(--stars-color)] font-semibold">
                {" "}
                EGP {sessionPrice}
              </span>
            ) : (
              <span className="font-semibold"> EGP {sessionPrice}</span>
            )}
          </p>

          {/* session type */}
          {sessionType && (
            <p>
              <b>Session:</b> {sessionType}
            </p>
          )}
          {/* session date */}
          {selectedDate && (
            <p>
              <b>Date:</b> {formatDate(selectedDate)}
            </p>
          )}
          {selectedTime && (
            <p>
              <b>Time:</b> {convertTo12HourFormat(selectedTime)}
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default SummaryCard;
