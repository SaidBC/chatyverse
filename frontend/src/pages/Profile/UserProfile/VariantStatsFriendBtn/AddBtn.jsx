import PropTypes from "prop-types";
import IconicButton from "../../../../components/Buttons/IconicButton";

function AddBtn({ receiverId, handleClick }) {
  return (
    <IconicButton
      onClick={handleClick(`/users/${receiverId}/requests`)}
      type="fontawesome"
      name="fa-solid fa-plus"
      className="bg-green-500 hover:bg-green-600 px-8"
    >
      Add Friend
    </IconicButton>
  );
}

AddBtn.propTypes = {
  receiverId: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default AddBtn;
