import Search from "../../components/Search/Search";
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
  );
}
