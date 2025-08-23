function DetailsStep({ register, errors }) {
  return (
    <div className="shadow p-6 rounded-lg pt-20 pb-20">
      <div className="flex gap-8 mb-4">
        {/* First Name input */}
        <div className="flex flex-col w-full">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            className="input input-bordered"
            {...register("firstName", {
              required: "Please write your first name",
              pattern: {
                value: /^[a-zA-Z]+$/,
                message: "Please enter a valid first name",
              },
            })}
          />
          {errors.firstName && (
            <p className="text-[var(--error-color)] text-sm mb-4 mt-1">
              {errors.firstName.message}
            </p>
          )}
        </div>
        {/* Last Name input */}
        <div className="flex flex-col w-full">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            className="input input-bordered"
            {...register("lastName", {
              required: "Please write your last name",
              pattern: {
                value: /^[a-zA-Z]+$/,
                message: "Please enter a valid last name",
              },
            })}
          />
          {errors.lastName && (
            <span className="text-[var(--error-color)] text-sm mb-4 mt-1">
              {errors.lastName.message}
            </span>
          )}
        </div>
      </div>
      {/* Email and Mobile inputs */}
      <div className="flex gap-8 mt-10">
        <div className="flex flex-col w-full">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="input input-bordered"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])/,
                message: "Please enter a valid email address",
              },
            })}
          />
          {errors.email && (
            <span className="text-[var(--error-color)] text-sm mb-4 mt-1">
              {errors.email.message}
            </span>
          )}
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="mobile">Mobile</label>
          <input
            type="tel"
            className="input input-bordered"
            {...register("mobile", {
              required: "Phone number is required",
              pattern: {
                value: /^\d{11}$/,
                message: "Please enter a valid 11-digit phone number",
              },
            })}
          />
          {errors.mobile && (
            <span className="text-[var(--error-color)] text-sm mb-4 mt-1">
              {errors.mobile.message}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetailsStep;
