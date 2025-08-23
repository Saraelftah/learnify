import bc from "../../assets/images/webinar-animate.svg";

function SideImg({imgClass}) {
  return (
    <div className="hidden lg:block w-2/6">
      <img src={bc} alt="image" className={imgClass} />
    </div>
  );
}

export default SideImg;
