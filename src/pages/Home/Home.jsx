import { useEffect, useState } from 'react'
import style from './Home.module.css'

function Home() {
    const [counter, setCounter] = useState(0);

    useEffect(() => {
    }, []);
  return (
    <>
        <button className={style.btn}>Click</button>
    </>
    
  )
}

export default Home