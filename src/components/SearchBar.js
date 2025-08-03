"use client";

function SearchBar({ searchValue, setSearchValue }) {
  return (
    <div className="mb-4 w-[380px]">
      <input
        type="text"
        placeholder="Search by name..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="border px-4 py-2 rounded w-full"
      />
    </div>
  );
}

export default SearchBar;
