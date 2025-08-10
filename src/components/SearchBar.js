"use client";

function SearchBar({ searchValue, setSearchValue }) {
  return (
    <div className="mb-4 w-full sm:w-[380px]">
      <input
        type="text"
        placeholder="Search by name..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="w-full rounded border px-4 py-2"
      />
    </div>
  );
}

export default SearchBar;
