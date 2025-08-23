function SignBtn({ label }) {
  return (
    <button
      type="submit"
      className="w-3/6 md:w-4/6 btn mt-5 md:mb-5 py-6 rounded-full md:rounded-xl
       border-[var(--secondary-color)] bg-[var(--secondary-color)] text-white 
        hover:text-[var(--secondary-color)] hover:bg-[var(--card-background)]
              
              transition duration-300 ease-in-out"
    >
      {label}
    </button>
  );
}

export default SignBtn;
