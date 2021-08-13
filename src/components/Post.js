import { MoreVert } from "@material-ui/icons";
// import { Users } from "../dummyData";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const PF = process.env.REACT_APP_PUBLIC_FOLDER;
const Post = (props) => {
  const { user: currentUser } = useContext(AuthContext);

  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(`/users/?userId=${props.userId}`);
      setUser(res.data);
    };
    fetchPosts();
  }, [props.userId]);
  // const user = Users.filter((u) => u.id === props.id);

  const { profilePicture, username } = user;
  const { comment, date, desc, img, _id } = props;

  const [likes, setLikes] = useState(props.likes.length);
  const [didLike, setDidLike] = useState(
    props.likes.includes(currentUser._id) ? true : false
  );
  const handleLike = () => {
    try {
      axios.put(`/posts/${_id}/like`, { userId: currentUser._id });
    } catch (error) {}

    setLikes(didLike ? likes - 1 : likes + 1);
    setDidLike(!didLike);
  };

  return (
    // post container
    <div className="w-full shadow-md my-7 mx-0 bg-white rounded-md">
      {/* post wrapper */}
      <div className="p-3">
        {/* post top */}
        <div className="flex items-center justify-between">
          {/* post topleft */}
          <div className="flex items-center">
            <Link to={`/profile/${username}`}>
              <img
                loading="lazy"
                className="object-cover h-10 w-10 rounded-full"
                src={
                  profilePicture
                    ? PF + profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
              />
            </Link>
            <span className="font-bold mx-2">{username}</span>
            <span className="text-gray-500 text-xs">{date}</span>
          </div>
          {/* post topright */}
          <div>
            <MoreVert />
          </div>
        </div>
        {/* post center */}
        <div className="my-3">
          <span>{desc}</span>
          <img
            loading="lazy"
            className="mt-3 w-full object-contain"
            src={img}
            alt=""
          />
        </div>
        {/* post bototm */}
        <div className="flex justify-between items-center">
          {/* post bottom left */}
          <div className="flex space-x-2 items-center">
            <img
              onClick={handleLike}
              className="object-contain h-6 w-6 cursor-pointer"
              src={PF + "like.png"}
              alt=""
            />
            <img
              onClick={handleLike}
              className="object-contain h-6 w-6 cursor-pointer"
              src={PF + "heart.png"}
              alt=""
            />
            <span>{likes} Likes</span>
          </div>
          {/* post bottom right */}
          <div>
            <span className="cursor-pointer border-b-2 border-gray-300">
              {comment} comments
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
