import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";

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
        (<FontAwesomeIcon icon={faSun}/>):
    (<FontAwesomeIcon icon={faMoon}/>)}
        
        </button>
    </>
  )
}

export default LightDark