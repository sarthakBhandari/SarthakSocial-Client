const PF = process.env.REACT_APP_PUBLIC_FOLDER;

const CloseFriend = (props) => {
  const { profilePicture, username } = props;
  return (
    <li className="flex items-center mb-5 space-x-4">
      <img
        className="rounded-full w-8 h-8 object-cover"
        src={PF + profilePicture}
        alt=""
      />
      <span className="hidden sm:inline-block text-sm">{username}</span>
    </li>
  );
};

export default CloseFriend;
