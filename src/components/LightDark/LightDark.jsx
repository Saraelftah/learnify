import React, { useState } from 'react'

function LightDark() {
    const [isDark, setIsDark] = useState(false);

     const toggleDarkMode = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }
  return (
    <>
      {/* Dark Mode Icon */}
      <label
        onClick={toggleDarkMode}
        className={`btn btn-circle border-1 border-[var(--secondary-color)] bg-[var(--background-color)] swap swap-rotate ${
          isDark ? "swap-active" : ""
        }`}
      >
        <i className="fa-regular fa-sun swap-on text-xl text-[var(--secondary-color)]"></i>

        <i className="fa-regular fa-moon swap-off text-xl text-[var(--secondary-color)]"></i>
      </label>
    </>
  );
}

export default LightDark