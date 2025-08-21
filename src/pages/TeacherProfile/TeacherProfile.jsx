import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
// import { doc, getDoc } from 'firebase/firestore';
// import { db, auth } from '../../../firebase';
// import { useAuthState } from 'react-firebase-hooks/auth';
import Loader from "../../components/Loader/Loader";
import { motion } from "framer-motion";
import TeacherHeader from "../../components/TeacherHeader/TeacherHeader";
import TeacherSidebar from "../../components/TeacherSidebar/TeacherSidebar";
import TeacherAbout from "../../components/TeacherAbout/TeacherAbout";
import TeacherAvailability from "../../components/TeacherAvailability/TeacherAvailability";
import TeacherBenefits from "../../components/TeacherBenefits/TeacherBenefits";
import "./TeacherProfile.module.css";

function TeacherProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  // const [user, loadingAuth] = useAuthState(auth);
  const teachers = useSelector((state) => state.teachers.teachers);
  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    if (teachers.length > 0 && id) {
      const foundTeacher = teachers.find((t) => t.id === id);
      if (foundTeacher) {
        setTeacher(foundTeacher);
      }
    }
  }, [teachers, id]);

  const handleBookNow = () => navigate(`/payment/${id}`);

  if (!teacher) {
    return <Loader />;
  }



  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-[var(--light-background)] py-8 px-4 sm:px-6 lg:px-8"
    >
    
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto bg-[var(--background-color)] rounded-lg shadow-md overflow-hidden "
      >
       
        <TeacherHeader teacher={teacher} />

    
        <div className="md:flex">
        
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="md:w-1/3 p-6 border-r border-[var(--primary-color)] relative"
          >
            <TeacherSidebar teacher={teacher} onBook={handleBookNow} />
          </motion.div>

       
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="md:w-2/3 p-6"
          >
            <div className="space-y-10">
              <TeacherAbout teacher={teacher} />
              <TeacherAvailability teacher={teacher} />
              <TeacherBenefits teacher={teacher} />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default TeacherProfile;
