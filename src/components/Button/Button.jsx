import { useEffect, useState } from 'react'
import style from './Button.module.css'

function Button() {
    const [counter, setCounter] = useState(0);

    useEffect(() => {
    }, []);
  return (
    <>
        <div>Button</div>
    </>
    
  )
}

export default Button