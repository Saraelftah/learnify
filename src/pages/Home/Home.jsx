import { useEffect } from "react";
import { useSelector } from "react-redux";
// import style from "./Home.module.css";
function Home() {
  // const useDispatch = useDispatch();
    const teachers = useSelector((state) => state.teachers.teachers);

  useEffect(() => {}, []);
  return (
    <>  
      {teachers.map((t) => (
          <p key={t.id}>{t.name}</p>
        ))}
    </>
  );
}

export default Home;
