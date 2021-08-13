import { format } from "timeago.js";

const Message = ({ own, text, time, sender }) => {
  return (
    <div className={`flex flex-col p-3`}>
      {/* message top */}
      <div
        className={`flex items-center space-x-2 ${
          own && "flex-row-reverse space-x-reverse"
        }`}
      >
        <img
          loading="lazy"
          className="object-cover h-10 w-10 rounded-full"
          src="https://i1.sndcdn.com/avatars-000840889183-cntd9a-t240x240.jpg"
          alt=""
        />
        <p
          className={`text-sm rounded-full p-2 max-w-sm ${
            own ? "bg-gray-300" : "bg-blue-600 text-white"
          }`}
        >
          {text}
        </p>
      </div>
      {/* messafe bottom */}
      <div
        className={`text-xs text-gray-500 ${own ? "mr-1 self-end" : "ml-1"}`}
      >
        {format(time)}
      </div>
    </div>
  );
};

export default Message;
