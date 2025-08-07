import { useEffect, useState } from 'react'
import style from './NavItem.module.css'

function NavItem() {
    const [counter, setCounter] = useState(0);

    useEffect(() => {
    }, []);
  return (
    <>
        <div>NavItem</div>
    </>
    
  )
}

export default NavItem