function Wrapper({ children, className }) {
  return (
    <div
      className={
        "w-full h-[100dvh] flex items-center justify-center " +
        (className || "")
      }
    >
      {children}
    </div>
  );
}

export default Wrapper;
