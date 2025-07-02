"use client";

function EditInput({ placeholder, name, value, onChange, styles }) {
  return (
    <input
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={
        !styles
          ? "w-full mt-2 mb-2 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
          : styles
      }
    />
  );
}

export default EditInput;
