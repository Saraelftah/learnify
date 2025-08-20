function Overview({ register, error, overviewCount, setOverviewCount }) {
  return (
    <>
      {/* Overview */}
      <div className="flex flex-col lg:w-5/6 w-full">
        <label htmlFor="">Overview</label>
        <textarea
          className="textarea rounded-lg shadow-md w-full focus:ring-1 focus:ring-[var(--light-secondary-color)] focus:outline focus:outline-[var(--light-secondary-color)] focus:border-[var(--light-secondary-color)]"
          rows={4}
          placeholder="Tell students about your experience and teaching style..."
          {...register("overview", {
            required: "Overview is required",
            minLength: {
              value: 30,
              message: "At least 30 characters",
            },
            maxLength: {
              value: 500,
              message: "max 500 characters",
            },
          })}
          onChange={(e) => setOverviewCount(e.target.value.length)}
        />
        <p className="text-sm text-gray-500 text-end w-full mt-2">
          {overviewCount}/500
        </p>
        {error && (
          <div className="text-red-500 text-sm lg:text-xl">
            <i className="fa-solid fa-circle-exclamation"></i>
            <span className="text-sm">{error.message}</span>
          </div>
        )}
      </div>
    </>
  );
}

export default Overview;
