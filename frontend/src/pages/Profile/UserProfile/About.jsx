import PropTypes from "prop-types";
import { SlIcon } from "@shoelace-style/shoelace/dist/react";
import formatDate from "../../../utils/formatDate";

function About({ birthday, location, createdAt }) {
  let joinedAt = createdAt && new Date(createdAt);
  let birthdayDate = birthday && new Date(birthday);
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
            <span>LIVED IN : {location || "Not provided"}</span>
          </li>
          <li className="flex items-center gap-3">
            <SlIcon name="cake2-fill" />
            <span>
              BIRTH DAY :{" "}
              {(birthdayDate && formatDate(birthdayDate)) || "Not provided"}
            </span>
          </li>
          <li className="flex items-center gap-3">
            <SlIcon name="calendar-month-fill" />
            <span>JOINED AT {formatDate(joinedAt)}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

About.propTypes = {
  birthday: PropTypes.string,
  location: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
};

export default About;
