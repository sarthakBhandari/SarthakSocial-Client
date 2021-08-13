import Sidebar from "../components/Sidebar";
import Rightbar from "../components/Rightbar";
import Feed from "../components/Feed";
import Topbar from "../components/Topbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";

const PF = process.env.REACT_APP_PUBLIC_FOLDER;

const Profile = () => {
  const params = useParams();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `https://sarthak-social.herokuapp.com/api/users/?username=${params.username}`
      );
      setUser(res.data);
    };
    fetchUser();
  }, [params.username]);

  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      <Topbar />
      {/* home container */}
      <div className="w-full grid grid-cols-12 overflow-hidden">
        <Sidebar />
        {/* profile right */}
        <div className="col-span-9 grid grid-cols-9 overflow-y-scroll">
          {/* profile right top */}
          <div className="col-span-9">
            {/* profile cover */}
            <div className="relative h-80">
              <img
                className="w-full object-cover h-64"
                src={user?.coverPicture || PF + "person/noCover.png"}
                alt=""
              />
              <img
                className="h-36 w-36 rounded-full object-cover absolute border-4 border-white left-0 right-0 m-auto top-40"
                src={user?.profilePicture || PF + "person/noAvatar.png"}
                alt=""
              />
            </div>
            {/* profile info */}
            <div className="flex flex-col items-center justify-center">
              <h4 className="text-2xl font-bold">{user?.username}</h4>
              <span className="text-gray-500 -mt-1">{user?.desc}</span>
            </div>
          </div>
          {/* profile right bottom */}
          <Feed username={user?.username} profile_view={true} />
          <Rightbar profile_view={true} user={user} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
