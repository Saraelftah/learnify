import { useEffect } from "react";
import { db } from "../../firebase";
import { getDocs, collection, Timestamp } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setTeachers } from "../store/TeachersSlice";

function Network() {
  const dispatch = useDispatch();
  const teachersCollection = collection(db, "teachers");

  useEffect(() => {
    const getTeachers = async () => {
      try {
        const data = await getDocs(teachersCollection);
        const teachersData = data.docs.map((doc) => {
          const docData = doc.data();
          return {
            id: doc.id,
            ...docData,
            createdAt: docData.createdAt ? docData.createdAt.toDate().toISOString() : null,
          };
        });
        console.log(teachersData);
        dispatch(setTeachers(teachersData));
      } catch (err) {
        console.error(err);
      }
    };

    getTeachers();
  }, [teachersCollection, dispatch]);

  return <></>;
}

export default Network;