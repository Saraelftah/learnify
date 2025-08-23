function FormInput({ label, type, placeholder, register, name, rules, error, min}) {
  return (
    <>
        <label className="floating-label">
          <input
            type={type}
            placeholder={placeholder}
            className="input input-md lg:input-lg w-full rounded-xl shadow-md
                        focus:ring-1 focus:ring-[var(--light-secondary-color)]
                        focus:outline focus:outline-[var(--light-secondary-color)]
                        focus:border-[var(--light-secondary-color)]
                        "
            style={{ backgroundColor: "var(--card-background)" }}
            autoComplete="off"
            min={min}
            {...register(name, rules)}
          />
          <span style={{ backgroundColor: "var(--background-color)" }}>
            {label}
          </span>
        </label>
        {error && (
          <div className="text-red-500 text-sm lg:text-xl">
            <i className="fa-solid fa-circle-exclamation"></i>
            <span className="text-sm"> {error.message} </span>
          </div>
        )}
    </>
  );
}

export default FormInput;
