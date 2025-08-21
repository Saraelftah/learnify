
function PaymentStep({ register, errors }) {
  return (
    <div className="shadow p-6 rounded-lg pt-20 pb-20">
      <div className="relative w-full">
        <div>
          <label htmlFor="cardNumber">Card Number</label>
          <input
            type="text"
            className="input input-bordered w-full pr-20"
            {...register("cardNumber", {
              required: "Card number is required",
              pattern: {
                value: /^\d{16}$/,
                message: "Please enter a valid 16-digit card number",
              },
            })}
          />
        </div>
        <div className="absolute bottom-1 right-3 flex items-center gap-2 pointer-events-none text-2xl text-gray-400">
          <i className="fa-brands fa-cc-visa" />
          <i className="fa-brands fa-cc-amex" />
          <i className="fa-brands fa-cc-mastercard" />
        </div>
      </div>
      {errors.cardNumber && (
        <span className="text-[var(--error-color)] text-sm mb-3 mt-1">
          {errors.cardNumber.message}
        </span>
      )}

      {/* CVV and Expiry date */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="flex flex-col w-full">
          <label htmlFor="cvv">CVV</label>
          <input
            type="text"
            className="input input-bordered"
            {...register("cvv", {
              required: "CVV is required",
              pattern: {
                value: /^\d{3}$/,
                message: "Please enter a valid 3-digit CVV",
              },
            })}
          />
          {errors.cvv && (
            <span className="text-[var(--error-color)] text-sm mb-3 mt-1">
              {errors.cvv.message}
            </span>
          )}
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="expiry">Expiry Date</label>
          <input
            type="text"
            placeholder="(MM/YY)"
            className="input input-bordered"
            {...register("expiry", {
              required: "Expiry Date is required",
              pattern: {
                value: /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/,
                message: "Please enter a valid expiry date (MM/YY)",
              },
            })}
          />
          {errors.expiry && (
            <span className="text-[var(--error-color)] text-sm mb-3 mt-1">
              {errors.expiry.message}
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-col w-full mt-4">
        <label htmlFor="cardHolder">Card Holder</label>
        <input
          type="text"
          className="input input-bordered w-full"
          {...register("cardHolder", {
            required: "Card Holder is required",
            pattern: {
              value: /^[a-zA-Z\s]+$/,
              message: "Please enter a valid name",
            },
          })}
        />
        {errors.cardHolder && (
          <span className="text-[var(--error-color)] text-sm mb-3 mt-1">
            {errors.cardHolder.message}
          </span>
        )}
      </div>
    </div>
  );
}

export default PaymentStep;
