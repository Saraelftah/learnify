const TeacherAvailability = ({ availableDates, availableGroupDates }) => {
  const formatDate = (dateString, timeString) => {
    const dateTimeString = `${dateString}T${timeString}:00`;
    const dateObj = new Date(dateTimeString);

    if (isNaN(dateObj.getTime())) {
      return "Invalid Date";
    }
    const dayOfWeek = dateObj.toLocaleDateString("en-US", { weekday: "long" });
    const dayOfMonth = dateObj.getDate();
    const month = dateObj.toLocaleDateString("en-US", { month: "short" });
    const time = dateObj.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    return `${dayOfWeek}, ${dayOfMonth} ${month} - ${time}`;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-[var(--dark-color)] mb-4">
        Available Times
      </h2>
      {/* Individual Lessons */}
      {availableDates?.length > 0 && (
        <div className="mb-10">
          <div className="divider">
            <div className="flex gap-2">
              <h3 className="text-lg font-semibold text-[var(--dark-color)] mb-3">
                Individual Lessons
              </h3>
              <i className="fa-solid fa-calendar-days text-2xl text-[var(--primary-color)]"></i>
            </div>
          </div>

          {/* grid grid-cols-2 sm:grid-cols-3 */}
          <div className="flex flex-wrap gap-3">
            {availableDates.map((slot, index) => (
              <div
                key={index}
                className="bg-[var(--light-background)] text-[var(--primary-color)] py-3 px-4 rounded-lg text-center text-sm font-medium border border-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-white transition-colors duration-500"
              >
                {formatDate(slot.date, slot.time)}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Group Lessons */}
      {availableGroupDates?.length > 0 && (
        <div>
        
            <div className="divider">
            <div className="flex gap-2">
              <h3 className="text-lg font-semibold text-[var(--dark-color)] mb-3">
                Group Lessons
              </h3>
              <i className="fa-solid fa-calendar-days text-2xl text-[var(--primary-color)]"></i>
              <i class="fa-solid fa-people-group text-2xl text-[var(--primary-color)]"></i>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {availableGroupDates.map((slot, index) => (
              <div
                key={index}
                className="bg-[var(--light-background)] text-[var(--primary-color)] py-3 px-4 rounded-lg text-center text-sm font-medium border border-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-white transition-colors duration-500"
              >
                {formatDate(slot.date, slot.time)}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherAvailability;
