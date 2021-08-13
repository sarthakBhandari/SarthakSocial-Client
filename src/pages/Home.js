import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import Rightbar from "../components/Rightbar";
const Home = () => {
  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      <Topbar />
      {/* home container */}
      <div className="w-full grid grid-cols-12 overflow-hidden">
        <Sidebar />
        <Feed />
        <Rightbar />
      </div>
    </div>
  );
};

export default Home;
