import {
  DynamicFeed,
  Chat,
  PlayCircleFilledOutlined,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  School,
} from "@material-ui/icons";
import CloseFriend from "./CloseFriend";
import { Users } from "../dummyData";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return (
    <div className="col-span-3 overflow-y-scroll bg-white">
      {/* sidebar wrapper */}
      <div className="p-5">
        {/* sidebar list */}
        <ul>
          {/* list item */}
          <li className="flex items-center mb-5 space-x-4">
            <DynamicFeed />
            <span className="hidden sm:inline-block">Feed</span>
          </li>
          <li className="flex items-center mb-5 space-x-4">
            <Chat />
            <span className="hidden sm:inline-block">Chats</span>
          </li>{" "}
          <li className="flex items-center mb-5 space-x-4">
            <PlayCircleFilledOutlined />
            <span className="hidden sm:inline-block">Videos</span>
          </li>{" "}
          <li className="flex items-center mb-5 space-x-4">
            <Group />
            <span className="hidden sm:inline-block">Groups</span>
          </li>{" "}
          <li className="flex items-center mb-5 space-x-4">
            <Bookmark />
            <span className="hidden sm:inline-block">Bookmarks</span>
          </li>{" "}
          <li className="flex items-center mb-5 space-x-4">
            <HelpOutline />
            <span className="hidden sm:inline-block">Questions</span>
          </li>{" "}
          <li className="flex items-center mb-5 space-x-4">
            <WorkOutline />
            <span className="hidden sm:inline-block">Jobs</span>
          </li>
          <li className="flex items-center mb-5 space-x-4">
            <Event />
            <span className="hidden sm:inline-block">Events</span>
          </li>{" "}
          <li className="flex items-center mb-5 space-x-4">
            <School />
            <span className="hidden sm:inline-block">Courses</span>
          </li>
        </ul>
        <button className="w-auto border-none bg-gray-300 p-2 rounded-sm font-bold whitespace-nowrap">
          {width > 640 ? "Show More" : "More"}
        </button>
        <hr className="my-4" />
        {/* sidebar friend list */}
        <ul className="p-0 m-0 list-none mt-4">
          {Users.map((u) => {
            return <CloseFriend key={u.id} {...u} />;
          })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
