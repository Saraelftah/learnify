function SignBtn({ label }) {
  return (
    <button
      type="submit"
<<<<<<< HEAD
      className="w-3/6 md:w-4/6 btn mt-5 mb-5 py-6 rounded-full md:rounded-xl text-white bg-[var(--secondary-color)]
=======
      className="w-3/6 md:w-4/6 btn mt-5 mb-9 py-6 rounded-full md:rounded-xl text-white bg-[var(--secondary-color)]
>>>>>>> 44c5c17 (teacher Page with book now button to navigate to payment page)
              hover:bg-[var(--primary-color)]
              transition duration-300 ease-in-out"
    >
      {label}
    </button>
  );
}

export default SignBtn;
