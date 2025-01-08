import PropTypes from "prop-types";
import AvatarImage from "../../../components/AvatarImage";

function Avatar({ username, profilePicture }) {
  return (
    <div className="self-center flex flex-col gap-2">
      <AvatarImage
        src={profilePicture}
        className="relative w-32 h-32 bg-gray-950 rounded-full"
      />
      <h2 className="text-lg text-center">@{username}</h2>
    </div>
  );
}

Avatar.propTypes = {
  username: PropTypes.string.isRequired,
  profilePicture: PropTypes.string.isRequired,
};

export default Avatar;
