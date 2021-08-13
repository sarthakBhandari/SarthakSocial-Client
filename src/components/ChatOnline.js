import { useState, useEffect } from "react";
import axios from "axios";

const ChatOnline = ({ onlineUsers, currentUserId, setSelectedConv }) => {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const [selected, setSelected] = useState(-1);

  // get list of friends
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const res = await axios.get(
          `https://sarthak-social.herokuapp.com/api/users/friends/${currentUserId}`
        );
        setFriends(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (currentUserId) fetchFriends();
  }, [currentUserId]);
  // filtering friends against all online users
  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);

  // handle selecting a conversation
  const handleSelect = (friendId) => {
    setSelected(friendId);
    const fetchConversation = async () => {
      try {
        const res = await axios.get(
          `https://sarthak-social.herokuapp.com/api/conversations/find/${currentUserId}/${friendId}`
        );
        setSelectedConv(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchConversation();
  };

  return (
    <div>
      {/* chatOnlineFriend */}
      {onlineFriends.map((oF) => {
        return (
          <div
            onClick={() => handleSelect(oF._id)}
            key={oF._id}
            className={`flex w-11/12 mx-auto items-center font-bold cursor-pointer p-3 space-x-3 hover:bg-gray-300 ${
              oF._id === selected && "bg-gray-300"
            }`}
          >
            {/* img container */}
            <div className="relative">
              <img
                loading="lazy"
                className="h-10 w-10 object-cover rounded-full"
                src={
                  oF.profilePicture
                    ? oF.profilePicture
                    : "https://i1.sndcdn.com/avatars-000840889183-cntd9a-t240x240.jpg"
                }
                alt=""
              />
              <div className="absolute w-3 h-3 bg-green-500 top-0 right-0 rounded-full border border-white"></div>
            </div>
            {/* name */}
            <span>{oF.username}</span>
          </div>
        );
      })}
    </div>
  );
};

export default ChatOnline;
