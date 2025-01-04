const senderStyle = {
  friend: {
    li: "self-start bg-indigo-500",
  },
  you: {
    li: "self-end bg-indigo-400",
  },
};
function Message({ content, createdAt, sender }) {
  return (
    <li
      className={
        "relative p-3  text-white   rounded-xl flex gap-3 " +
        senderStyle[sender].li
      }
    >
      <p className="font-bold">{content}</p>
      <span className="text-sm self-end font-semibold text-indigo-200">
        {createdAt}
      </span>
    </li>
  );
}

export default Message;
