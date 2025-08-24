import FormInput from "../FormInput/FormInput";

function DetailsStep({ register, errors }) {
  return (
    <div className="px-6 py-20 rounded-lg flex flex-col items-center gap-3 lg:gap-8">
      <div className="flex flex-col gap-3 lg:flex-row lg:gap-15 justify-between items-center w-full">
        <div className="w-full">
          {/* First Name input */}
          <FormInput
            label="First name"
            type="text"
            placeholder="First Name..."
            name="firstName"
            register={register}
            rules={{
              required: "First name is required!",
              pattern: {
                value: /^[a-zA-Z]+$/,
                message: "Please enter a valid first name",
              },
            }}
            error={errors.firstName}
          />
        </div>

        {/* Last Name input */}
        <div className=" w-full">
          <FormInput
            label="Last name"
            type="text"
            placeholder="Last Name..."
            name="lastName"
            register={register}
            rules={{
              required: "Last name is required!",
              pattern: {
                value: /^[a-zA-Z]+$/,
                message: "Please enter a valid last name",
              },
            }}
            error={errors.lastName}
          />
        </div>
      </div>

      
      <div className="flex flex-col gap-3 lg:flex-row lg:gap-15 justify-between items-center w-full">
        {/* Email  */}
        <div className=" w-full">
          <FormInput
            label="Email"
            type="email"
            placeholder="Email..."
            name="email"
            register={register}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])/,
                message: "Please enter a valid email address",
              },
            }}
            error={errors.email}
          />
        </div>
        {/* Mobile */}
        <div className=" w-full">
          <FormInput
            label="Phone"
            type="tel"
            placeholder="Phone..."
            name="mobile"
            register={register}
            rules={{
              required: "Phone number is required",
              pattern: {
                value: /^\d{11}$/,
                message: "Please enter a valid 11-digit phone number",
              },
            }}
            error={errors.mobile}
          />
        </div>
      </div>
    </div>
  );
}

export default DetailsStep;
