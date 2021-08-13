import axios from "axios";
import { useState, useEffect } from "react";

const Conversation = ({
  conversation,
  currentUser,
  selected,
  handleSelect,
}) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    // getting the id of person we're conversing with
    const friendId = conversation.members.find((id) => id !== currentUser._id);
    // then fetching their details
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `https://sarthak-social.herokuapp.com/api/users/?userId=${friendId}`
        );
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [conversation, currentUser]);

  return (
    <div
      onClick={() => handleSelect(conversation)}
      className={`w-11/12 p-3 flex items-center space-x-4 cursor-pointer hover:bg-gray-300 ${
        selected && "bg-gray-300"
      }`}
    >
      <img
        loading="lazy"
        className="object-cover h-10 w-10 rounded-full"
        src={
          user.profilePicture
            ? user.profilePicture
            : "https://i1.sndcdn.com/avatars-000840889183-cntd9a-t240x240.jpg"
        }
        alt=""
      />
      <span className="hidden sm:inline-block font-bold">{user?.username}</span>
    </div>
  );
};

export default Conversation;
