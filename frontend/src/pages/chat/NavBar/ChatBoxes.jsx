import useFetch from "../../../hooks/useFetch";
import ChatBox from "../../../components/ChatBox";
import useAppContext from "../../../hooks/useAppContext";
const SERVER_URL = "http://localhost:8000/api/v1";

function ChatBoxes({ userId }) {
  const { user: token } = useAppContext();
  const {
    data: { data: friends },
    loading,
  } = useFetch(SERVER_URL + "/users/" + userId + "/friends");
  if (loading) return <>Loading ...</>;
  return (
    <ul className="flex flex-col gap-2  w-full overflow-y-scroll grow-1">
      {/* <li>
        <ul className="flex flex-col gap-2  w-full">
          <ul>
            <h1>Last messaged :</h1>
          </ul>
          <ChatBox
            isActive={true}
            username=""
            isAvailable={false}
            lastMessage=""
          />
          <ChatBox username="" isAvailable={false} lastMessage="" />
        </ul>
      </li> */}
      <li>
        <ul className="flex flex-col gap-2  w-full">
          <li>
            <h1 className="font-extrabold text-xl">Friends :</h1>
          </li>
          {friends?.map((friend) => {
            // console.log(friend);
            return (
              <ChatBox
                key={friend.id}
                username={friend.username}
                to={"/chat/" + friend.id}
                friendId={friend.id}
                token={token}
                userId={userId}
              />
            );
          })}
        </ul>
      </li>
    </ul>
  );
}
export default ChatBoxes;
