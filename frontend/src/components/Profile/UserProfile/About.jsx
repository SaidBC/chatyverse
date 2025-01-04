import { SlIcon } from "@shoelace-style/shoelace/dist/react";

function About({ birthday, location, createdAt }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4 text-2xl">
        <SlIcon name="info-circle-fill" />
        <h2 className="font-bold">ABOUT : </h2>
      </div>
      <div className=" bg-gray-950 p-6 rounded-xl ">
        <ul className="flex flex-col gap-3">
          <li className="flex items-center gap-3">
            <SlIcon name="geo-alt-fill" />
            <span>LIVED IN : {location || "NOT AVAILABLE"}</span>
          </li>
          <li className="flex items-center gap-3">
            <SlIcon name="cake2-fill" />
            <span>BIRTH DAY : {birthday || "NOT AVAILABLE"}</span>
          </li>
          <li className="flex items-center gap-3">
            <SlIcon name="calendar-month-fill" />
            <span>JOINED AT {createdAt}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default About;
