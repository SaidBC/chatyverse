import { SlSpinner } from "@shoelace-style/shoelace/dist/react";

function Loading() {
  return (
    <div className="my-auto">
      <SlSpinner
        style={{
          fontSize: "6rem",
          "--track-width": "18px",
        }}
      />
    </div>
  );
}

export default Loading;
