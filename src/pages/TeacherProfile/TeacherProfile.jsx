import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams} from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import TeacherHeader from "../../components/TeacherHeader/TeacherHeader";
import TeacherSidebar from "../../components/TeacherSidebar/TeacherSidebar";
import TeacherAbout from "../../components/TeacherAbout/TeacherAbout";
import TeacherAvailability from "../../components/TeacherAvailability/TeacherAvailability";
import TeacherBenefits from "../../components/TeacherBenefits/TeacherBenefits";
import TeacherDetails from "../../components/TeacherDetails/TeacherDetails";


function TeacherProfile() {
  const { id } = useParams();
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

  return (
    <>
    {teacher? <TeacherDetails teacher = {teacher} /> : <div className=""> <Loader /> </div>}
        
    </>
  );
}

export default TeacherProfile;
