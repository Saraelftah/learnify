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
        <button onClick={toggleDarkMode} id="dark-toggle" aria-label="Toggle Dark Mode" className="cursor-pointer hover:text-[var(--primary-color)]">
        {isDark? 
        <i class="fa-regular fa-sun"></i>:
    (<i class="fa-regular fa-moon"></i>)}
        
        </button>
    </>
  )
}

export default LightDark