import Search from "../../components/Search/Search";

export default function SearchPage() {
  return (
    <>
      <div className="search mt-[100px] mb-[50px]">
          <div className="bg-[var(--light-background)] pt-[50px] pb-[70px] " data-aos="fade-up">
          <h1
            className="font-bold text-[var(--dark-color)] mb-8 text-center text-[length:var(--title-font-size)]"
          >
            Find your teacher
          </h1>
          </div>
          <div className="container">
          <Search />
        </div>
      </div>
    </>
  );
}
