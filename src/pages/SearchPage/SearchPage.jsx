import Search from "../../components/Search/Search";

export default function SearchPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-[var(--dark-color)] mb-8 text-center">
        Find your teacher
      </h1>
      <Search />
    </div>
  );
}
