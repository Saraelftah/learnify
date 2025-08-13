function SignBtn({ label }) {
  return (
    <button
      type="submit"
      className="w-3/6 md:w-4/6 btn mt-5 mb-9 py-6 rounded-full md:rounded-xl text-white bg-[var(--secondary-color)]
              hover:bg-[var(--primary-color)]
              transition duration-300 ease-in-out"
    >
      {label}
    </button>
  );
}

export default SignBtn;
