import Search from "../../components/Search/Search";

export default function SearchPage() {
  return (
    <>
      {/* <div className="container mx-auto p-6"> */}
      <div className="container mx-auto pb-16 pt-28">
        <h1 className="font-bold text-[var(--dark-color)] mb-8 text-center" style={{ fontSize: 'var(--title-font-size)' }}>
          Find your teacher
        </h1>
        <Search />
      </div>
    </>
  );
}
