function FriendsBtn() {
  const handleClick = function () {};
  return (
    <button
      onClick={handleClick}
      className="btn bg-blue-500 hover:bg-blue-600 px-8 gap-2"
    >
      <i className="fa-solid fa-user-group"></i>
      <span>Your friend</span>
    </button>
  );
}

export default FriendsBtn;
