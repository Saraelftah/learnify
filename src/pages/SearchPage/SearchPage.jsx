import Search from "../../components/Search/Search";
<<<<<<< HEAD
import Navbar from "../../components/Navbar/Navbar"
import Footer from "../../components/Footer/Footer";

export default function SearchPage() {
  return (
    <>
      <Navbar />
      {/* <div className="container mx-auto p-6"> */}
      <div className="container mx-auto pb-6 pt-26">
        <h1 className="text[var(--title-font-size)] font-bold text-[var(--dark-color)] mb-8 text-center">
          Find your teacher
        </h1>
        <Search />
      </div>
      <Footer />
    </>
=======

export default function SearchPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-[var(--dark-color)] mb-8 text-center">
        Find your teacher
      </h1>
      <Search />
    </div>
>>>>>>> 44c5c17 (teacher Page with book now button to navigate to payment page)
  );
}
