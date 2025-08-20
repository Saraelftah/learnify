function FormSelector({ name, label, options = [], register, rules, error }) {
  return (
    <>
      <div>
          <select
            className="select select-lg rounded-xl shadow-md focus:ring-1 
            focus:ring-[var(--light-secondary-color)]
            focus:outline focus:outline-[var(--light-secondary-color)]
            focus:border-[var(--light-secondary-color)] w-full"
            defaultValue=""
            {...register(name, rules)}
          >
            <option value="" className="text-gray-300" disabled>
              Select {label}
            </option>
            {options.map((opt, idx) => (
              <option key={idx} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        {error && (
          <div className="text-red-500 text-sm lg:text-xl">
            <i className="fa-solid fa-circle-exclamation"></i>
            <span className="text-sm"> {error.message} </span>
          </div>
        )}
      </div>
    </>
  );
}

export default FormSelector;
