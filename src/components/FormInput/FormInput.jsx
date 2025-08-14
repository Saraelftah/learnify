function FormInput({ label, type, placeholder, register, name, rules, error }) {
  return (
    <div className="flex flex-col py-3 md:py-4 gap-3 w-5/6 md:w-4/6">
<<<<<<< HEAD
      {/* <label className="text-sm md:text-xl">{label}</label> */}
=======
      <label className="text-sm md:text-xl">{label}</label>
>>>>>>> 44c5c17 (teacher Page with book now button to navigate to payment page)

      <label className="floating-label">
        <input
          type={type}
          placeholder={placeholder}
<<<<<<< HEAD
          className="input input-lg w-full rounded-xl shadow-md
=======
          className="input input-md lg:input-lg w-full rounded-xl shadow-md
>>>>>>> 44c5c17 (teacher Page with book now button to navigate to payment page)
          focus:ring-1 focus:ring-[var(--light-secondary-color)]
          focus:outline focus:outline-[var(--light-secondary-color)]
          focus:border-[var(--light-secondary-color)]
          "
          autoComplete="off"
          {...register(name, rules)}
        />
        <span>{label}</span>
      </label>
       {error && (
        <div className="text-red-500 text-sm lg:text-xl">
          <i className="fa-solid fa-circle-exclamation"></i>
          <span className="text-sm"> {error.message} </span>
        </div>
      )}
    </div>
  );
}

export default FormInput;
