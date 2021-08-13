const PF = process.env.REACT_APP_PUBLIC_FOLDER;

const Online = (props) => {
  const { profilePicture, username } = props;
  return (
    <li className="flex mb-4 items-center space-x-2">
      <div className="relative">
        <img
          className="object-cover h-10 w-10 rounded-full"
          src={PF + profilePicture}
          alt=""
        />
        <span className="h-4 w-4 rounded-full bg-green-600 absolute -top-1 right-0 border-2 border-white"></span>
      </div>
      <span className="font-bold">{username}</span>
    </li>
  );
};

export default Online;
