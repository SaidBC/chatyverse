import IconicButton from "../../../components/Buttons/IconicButton";

function ShowFriendsBtn({ onShowModel }) {
  return (
    <IconicButton
      type="shoelace"
      onClick={onShowModel}
      name="people"
      className="px-8"
    >
      Friends
    </IconicButton>
  );
}
export default ShowFriendsBtn;
