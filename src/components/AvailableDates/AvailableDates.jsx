import { useFieldArray } from "react-hook-form";

function AvailableDates({ control, register, name }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: name,
  });
  return (
    <>
      <div>
        <label htmlFor={name}>{name === "availableDates" ? "Available Private Dates" : "Available Group Dates"}</label>

        <div className="space-y-2 lg:w-5/6 w-full">
          {fields.map((field, idx) => (
            <div
              key={field.id}
              className="flex justify-center gap-2 p-3 bg-gray-50 rounded-xl shadow-sm items-end"
            >
                {/* date */}
              <div className="w-full">
                <label className="text-sm">Date</label>
                <input
                  type="date"
                  className="input input-sm md:input-md
                           focus:border-[var(--light-secondary-color)] focus:ring-1 focus:ring-[var(--light-secondary-color)] focus:outline focus:outline-[var(--light-secondary-color)]"
                  {...register(`${name}.${idx}.date`)}
                />
              </div>
              {/* time */}
              <div className="w-full">
                <label className="text-sm">Time</label>
                <input
                  type="time"
                  className="input input-sm md:input-md focus:border-[var(--light-secondary-color)] focus:ring-1 focus:ring-[var(--light-secondary-color)] focus:outline focus:outline-[var(--light-secondary-color)]"
                  {...register(`${name}.${idx}.time`)}
                />
              </div>

              {/* remove */}
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => remove(idx)}
              >
                <i className="fa-regular fa-trash-can text-red-500"></i>
              </button>
            </div>
          ))}

          <button
            type="button"
            className="btn w-full rounded-lg shadow-md mt-2
                        text-[var(--light-primary-color)] bg-transparent border-dashed border-[var(--light-primary-color)]
                        hover:bg-[var(--light-primary-color)] hover:text-white transition-colors duration-300"
            onClick={() =>
              append({ date: "", time: "" })
            }
          >
            + Add Date
          </button>
        </div>
      </div>
    </>
  );
}

export default AvailableDates;
