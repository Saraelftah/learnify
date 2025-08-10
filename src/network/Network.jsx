import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { getDocs, collection } from "firebase/firestore";

function Network() {
  const [teachersList, setTeachersList] = useState([]);
  const teachersCollection = collection(db, "teachers");

  useEffect(() => {
    const getTeachers = async () => {
      try {
        const data = await getDocs(teachersCollection);
        const teachersData = data.docs.map((doc)=> ({
            id: doc.id,
            ...doc.data()
        }));
        console.log(teachersData);
        setTeachersList(teachersData);
      } catch (err) {
        console.error(err);
      }
    };
    getTeachers();
  }, [teachersCollection]);


  return <div>network</div>;
}

export default Network;
