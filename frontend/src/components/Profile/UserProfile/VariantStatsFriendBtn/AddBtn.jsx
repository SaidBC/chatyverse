function AddBtn({ receiverId, handleClick }) {
  return (
    <button
      onClick={handleClick(`/users/${receiverId}/requests`)}
      className="btn bg-green-500 hover:bg-green-600 px-8 gap-2"
    >
      <i className="fa-solid fa-plus"></i>
      <span>Add Friend</span>
    </button>
  );
}

export default AddBtn;
