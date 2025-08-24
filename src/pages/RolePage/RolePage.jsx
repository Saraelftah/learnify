import teacher from "../../assets/images/teacher-icon.png";
import student from "../../assets/images/student-icon.png";
import RoleCard from "../RoleCard/RoleCard";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/Logo/Logo";

function RolePage() {

  const navigate = useNavigate();

  const handleSelect = (role)=> {

    navigate("/register", {state: {selectedRole: role}});

     console.log(role);
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 p-5">
        <Logo />
        <h1 className="lg:text-3xl md:text-2xl text-lg font-bold mb-10 text-center">

          Your Journey Starts Here, Choose Your Role

        </h1>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10">
          {/* Teacher Card */}
          <RoleCard
            src={teacher}
            label="Teacher"
            statment="Share your knowledge and inspire minds every day"
            onSelect={handleSelect}
          />

          {/* Student Card */}
          <RoleCard
            src={student}
            label="Student"
            statment="Start your journey to learn and grow with great teachers"
            onSelect={handleSelect}
          />
        </div>
      </div>
    </>
  );
}

export default RolePage;