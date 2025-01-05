import IconicButton from "../../../../components/Buttons/IconicButton";

function FriendsBtn() {
  const handleClick = function () {};
  return (
    <IconicButton
      onClick={handleClick}
      type="fontawesome"
      name="fa-solid fa-user-group"
      className="bg-blue-500 hover:bg-blue-600 px-8 gap-2"
    >
      Your friend
    </IconicButton>
  );
}

export default FriendsBtn;
