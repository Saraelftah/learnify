import { useEffect } from "react";
import HomeBanner from "../../components/HomeBanner/HomeBanner";
import RecommendedTeachers from "../../components/RecommendedTeachers/RecommendedTeachers";
// import style from "./Home.module.css";
function Home() {


  useEffect(() => {}, []);
  return (
    <>
      <section className="home capitalize">
        <HomeBanner />
        <div className="container">
          <RecommendedTeachers />
        </div>
        
      </section>
    
    </>
  );
}

export default Home;

