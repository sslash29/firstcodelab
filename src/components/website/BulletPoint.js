function BulletPoint({ children }) {
  return (
    <div className="flex items-center gap-4">
      <div className="rounded-full w-4 h-4 bg-[#01F472] flex items-center justify-center">
        <img src="/Check.svg" alt="Check" />
      </div>
      <p>{children}</p>
    </div>
  );
}

export default BulletPoint;
