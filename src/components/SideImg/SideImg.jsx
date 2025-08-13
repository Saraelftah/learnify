import bc from "../../assets/images/labtop-bc.png";

function SideImg({imgClass}) {
  return (
    <div className="hidden lg:block w-2/4">
      <img src={bc} alt="image" className={imgClass} />
    </div>
  );
}

export default SideImg;
