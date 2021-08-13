import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
const PF = process.env.REACT_APP_PUBLIC_FOLDER;

const Topbar = () => {
  const { user } = useContext(AuthContext);

  // alert messages when there is a searching error
  const [emptyMessage, setEmptyMessage] = useState({
    show: false,
    message: "",
  });

  // searching for a user
  const { register, handleSubmit } = useForm();
  const history = useHistory();
  const onSubmit = (data) => {
    let { search } = data;
    if (!search.replace(/\s/g, "")) {
      setEmptyMessage({ show: true, message: "Search field required" });
      setTimeout(() => {
        setEmptyMessage({ show: false, message: "" });
      }, 3000);
    } else {
      const searchUser = async () => {
        try {
          const res = await axios.get(`/users/?username=${search}`);
          if (res.data) {
            history.push(`/profile/${search}`);
          }
        } catch (error) {
          setEmptyMessage({ show: true, message: "Username not found" });
          setTimeout(() => {
            setEmptyMessage({ show: false, message: "" });
          }, 3000);
        }
      };
      searchUser();
    }
  };

  // handle logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    // topbar container
    <div className="h-14 w-full bg-blue-600 grid grid-cols-12 sticky top-0 items-center">
      {/* topbar left */}
      <div className="col-span-2 lg:col-span-3 text-center">
        <Link to="/">
          <span className="text-lg lg:text-3xl md:ml-5 text-white cursor-pointer font-francois capitalize">
            Sarthak Social
          </span>
        </Link>
      </div>
      {/* topbar center */}
      <div className="col-span-6 md:col-span-5 lg:col-span-4">
        {/* search bar */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full ml-1 h-10 bg-white rounded-full flex items-center"
        >
          <Search className="text-sm ml-5 mr-2" />
          <input
            {...register("search", { required: true })}
            name="search"
            className="outline-none border-none w-4/5"
            placeholder="Search for friend, post or video"
            type="text"
          />
          {emptyMessage.show && (
            <span className="text-red-500 text-xs">{emptyMessage.message}</span>
          )}
        </form>
      </div>
      {/* topbar right */}
      <div className="col-span-4 md:col-span-5 flex items-center justify-around text-white text-md">
        {/* topbar links */}
        <div className="space-x-4 ml-2">
          <span className="hidden sm:inline-block cursor-pointer">Home</span>
          <span onClick={handleLogout} className="cursor-pointer">
            Logout
          </span>
        </div>
        {/* topbar icons */}
        <div className="hidden md:flex">
          <div className="cursor-pointer relative mr-5">
            <Person />
            <span className="h-4 w-4 text-center text-xs bg-red-600 rounded-full text-white absolute -top-1 -right-1">
              1
            </span>
          </div>
          <div className="cursor-pointer relative mr-5">
            <Chat />
            <span className="h-4 w-4 text-center text-xs bg-red-600 rounded-full text-white absolute -top-1 -right-1">
              2
            </span>
          </div>
          <div className="cursor-pointer relative mr-5">
            <Notifications />
            <span className="h-4 w-4 text-center text-xs bg-red-600 rounded-full text-white absolute -top-1 -right-1">
              3
            </span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            className="object-cover h-10 w-10 rounded-full cursor-pointer"
            src={
              user.profilePicture
                ? user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
          />
        </Link>
      </div>
    </div>
  );
};

export default Topbar;
