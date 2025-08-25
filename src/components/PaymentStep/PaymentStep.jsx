import FormInput from "../FormInput/FormInput";
import credit from "../../assets/images/Credit.svg";
import visa from "../../assets/images/visa.svg";
import amex from "../../assets/images/amex.svg";
import master from "../../assets/images/master.svg";
import cardb from "../../assets/images/plain-credit-card-animate (1).svg";

function PaymentStep({ register, errors }) {
  return (
    <>
      <div className="flex flex-col lg:flex-row items-center">
        <div className="w-30 md:w-40 lg:w-70">
          <img src={cardb} alt="" />
        </div>

        <div className="px-6 lg:py-20 flex flex-col w-full">
          {/* card number */}
          <div className="relative w-full">
            <FormInput
              label="Card Number"
              type="text"
              placeholder="Card Number..."
              name="cardNumber"
              register={register}
              rules={{
                required: "Card number is required",
                pattern: {
                  value: /^\d{16}$/,
                  message: "Please enter a valid 16-digit card number",
                },
              }}
              error={errors.cardNumber}
            />
            <div className="absolute top-1/2 transform -translate-y-1/2  right-3 flex gap-1 z-10">
              <img src={credit} alt="credit" className="w-3 h-3 md:w-4 md:h-4"/>
              <img src={visa} alt="visa" className="w-3 h-3 md:w-4 md:h-4"/>
              <img src={amex} alt="amex" className="w-3 h-3 md:w-4 md:h-4"/>
              <img src={master} alt="master" className="w-3 h-3 md:w-4 md:h-4"/>
            </div>
          </div>

          {/* CVV */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="">
              <FormInput
                label="Card Number"
                type="text"
                placeholder="CVV Number..."
                name="cvv"
                register={register}
                rules={{
                  required: "CVV is required",
                  pattern: {
                    value: /^\d{3}$/,
                    message: "Please enter a valid 3-digit CVV",
                  },
                }}
                error={errors.cvv}
              />
            </div>
            {/* Expiry date */}
            <div>
              <FormInput
                label="Expiry Date"
                type="text"
                placeholder="Expiry Date..."
                name="expiry"
                register={register}
                rules={{
                  required: "Expiry Date is required",
                  pattern: {
                    value: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
                    message: "Please enter a valid expiry date (MM/YY)",
                  },
                }}
                error={errors.expiry}
              />
            </div>
          </div>

          {/* card holder */}
          <div className="mt-4">
            <FormInput
              label="Card Holder"
              type="text"
              placeholder="Card holder..."
              name="cardHolder"
              register={register}
              rules={{
                required: "Card Holder is required",
                pattern: {
                  value: /^[a-zA-Z\s]+$/,
                  message: "Please enter a valid name",
                },
              }}
              error={errors.cardHolder}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentStep;
