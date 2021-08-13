import { Users } from "../dummyData";
import Online from "./Online";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";

const PF = process.env.REACT_APP_PUBLIC_FOLDER;

const Rightbar = ({ profile_view, user }) => {
  const { user: currentUser, dispatch } = useContext(AuthContext);

  const [friends, setFriends] = useState([]);
  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get(
          `https://sarthak-social.herokuapp.com/api/users/friends/${user._id}`
        );
        setFriends(friendList.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (user !== null) {
      getFriends();
    }
  }, [user]);

  const HomeRightbar = () => {
    return (
      <>
        {/* birthday container */}
        <div className="flex items-center">
          <img
            className="object-contain h-12 w-12 mr-2"
            src={PF + "gift.png"}
            alt=""
          />
          <span className="">
            <b>Melaine</b> and <b>2 other friends</b> have their birthday today
          </span>
        </div>
        <img
          className="hidden lg:block rounded-lg mt-3 mx-auto"
          src={PF + "ad.png"}
          alt=""
        />
        <h4 className="mt-4 mb-5 font-bold">Online Friends</h4>
        {/* rightbar friend list */}
        <ul className="p-0 m-0">
          {Users.map((u) => {
            return <Online key={u.id} {...u} />;
          })}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    const [isFollowing, setIsFollowing] = useState(
      currentUser.followings?.includes(user?._id) ? true : false
    );

    const handleFollow = async () => {
      try {
        if (!isFollowing) {
          await axios.put(
            `https://sarthak-social.herokuapp.com/api/users/${user?._id}/follow`,
            {
              userId: currentUser._id,
            }
          );
          dispatch({ type: "FOLLOW", payload: user?._id });
        } else {
          await axios.put(
            `https://sarthak-social.herokuapp.com/api/users/${user?._id}/unfollow`,
            {
              userId: currentUser._id,
            }
          );
          dispatch({ type: "UNFOLLOW", payload: user?._id });
        }
      } catch (error) {
        console.log(error);
      }
      setIsFollowing(!isFollowing);
    };

    return (
      <>
        {user?.username !== currentUser.username && (
          <div
            className="flex space-x-1 rounded-full w-32 justify-center items-center mb-2 p-2 bg-blue-500 text-white cursor-pointer outline-none"
            onClick={handleFollow}
          >
            <span>{!isFollowing ? "Follow" : "Unfollow"}</span>
            {!isFollowing ? <Add /> : <Remove />}
          </div>
        )}
        <h4 className="text-md font-bold mb-1">User information</h4>
        {/* right bar info */}
        <div className="mb-4">
          {user?.city ? (
            <div className="flex items-center space-x-3">
              <span>City:</span>
              <span className="text-gray-500">{user?.city}</span>
            </div>
          ) : null}
          {user?.from ? (
            <div className="flex items-center space-x-3">
              <span>From:</span>
              <span className="text-gray-500">{user?.from}</span>
            </div>
          ) : null}
          {user?.relationship ? (
            <div className="flex items-center space-x-3">
              <span>Relationship:</span>
              <span className="text-gray-500">{user?.relationship}</span>
            </div>
          ) : null}
        </div>
        <h4 className="text-md font-bold mb-2">User Friends</h4>
        {/* rightbar followings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {friends.map((friend) => (
            <Link to={`/profile/${friend.username}`}>
              <div className=" flex flex-col items-center">
                <img
                  className="object-cover h-24 w-24 rounded-lg"
                  src={
                    friend.profilePicture
                      ? friend.profilePicture
                      : PF + "person/noAvatar.png"
                  }
                  alt=""
                />
                <span>{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };

  return (
    <div
      className={`hidden sm:block sm:col-span-3 ${
        !profile_view ? "overflow-y-scroll" : null
      }`}
    >
      {/* rightbar wrapper */}
      <div className="pt-5 pr-5">
        {profile_view ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
};

export default Rightbar;
