import React from "react";

function AvailableDatesDisplay({ dates, title }) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {dates?.map((date, index) => {
          if (date.date) {
            const fullDate = new Date(date.date);
            const options = {
              weekday: "long",
              month: "short",
              day: "numeric",
            };
            const formattedDate = fullDate.toLocaleDateString("en-US", options);

            return (
              <span
                key={index}
                className="px-4 py-2 bg-gray-100 rounded-full font-medium text-sm"
              >
                {formattedDate} - {date.time} {date.period}
              </span>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}

export default AvailableDatesDisplay;
