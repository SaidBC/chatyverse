import { SlIcon } from "@shoelace-style/shoelace/dist/react";

function Bio({ bio }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4 text-2xl">
        <SlIcon name="pen-fill" />
        <h2 className="font-bold">BIO : </h2>
      </div>
      <div>
        <span className="">{bio || "No bio provided"}</span>
      </div>
    </div>
  );
}
export default Bio;
