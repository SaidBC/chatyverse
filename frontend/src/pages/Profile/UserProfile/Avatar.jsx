function Avatar({ username, profileImage }) {
  return (
    <div className="self-center flex flex-col gap-2">
      <div className="relative w-32 h-32 bg-gray-950 rounded-full">
        <img
          className="w-full h-full rounded-full"
          src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png"
          alt="profile image"
        />
      </div>
      <h2 className="text-lg text-center">@{username}</h2>
    </div>
  );
}

export default Avatar;
