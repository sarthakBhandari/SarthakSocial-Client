import Share from "./Share";
import Post from "./Post";
// import { Posts } from "../dummyData";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const Feed = ({ profile_view, username }) => {
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get(`/posts/profile/${username}`)
        : await axios.get(`/posts/timeline/${user._id}`);
      setPosts(res.data);
      if (username) setLoading(false);
    };
    fetchPosts();
  }, [username, user._id]);
  return (
    <div
      className={`col-span-9 sm:col-span-6 ${
        !profile_view ? "overflow-y-scroll" : null
      }`}
    >
      {/* feed wrapper */}
      <div className="p-5">
        {((profile_view && user.username === username) || !profile_view) && (
          <Share />
        )}
        {profile_view && loading ? (
          <h2 className="text-gray-500 text-xl m-4">Loading...</h2>
        ) : (
          posts.map((p) => {
            return <Post key={p._id} {...p} />;
          })
        )}
      </div>
    </div>
  );
};

export default Feed;
