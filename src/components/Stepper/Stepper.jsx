function Stepper({ steps = [], activeStep = 0 }) {
  return (
    <ul className="steps w-full mb-2">
      {steps.map((label, index) => (
        <li
          key={label}
          className={`step ${
            index <= activeStep
              ? "step-accent after:!bg-[var(--secondary-color)] after:!border-none after:!text-white before:!border-none before:!bg-[var(--secondary-color)]"
              : ""
          } `}
        >
          {label}
        </li>
      ))}
    </ul>
  );
}

export default Stepper;
