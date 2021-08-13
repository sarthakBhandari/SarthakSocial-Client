import Topbar from "../components/Topbar";
import Conversation from "../components/Conversation";
import Message from "../components/Message";
import SendIcon from "@material-ui/icons/Send";
import { useEffect, useContext, useState, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import ChatOnline from "../components/ChatOnline";
import axios from "axios";
import { useForm } from "react-hook-form";
import { io } from "socket.io-client";

const Messenger = () => {
  // console.log("hit"); //using this to see how component is rendering
  const { user: currentUser } = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);
  const [selectedConv, setSelectedConv] = useState(null);
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState({});
  const [onlineUsers, setOnlineUsers] = useState([]);

  // handleing all the socket io madness
  const socket = useRef();
  useEffect(() => {
    socket.current = io("https://sarthak-social.herokuapp.com");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        _id: data._id,
        createdAt: Date.now(),
      });
    });
  }, []);
  useEffect(() => {
    if (
      arrivalMessage &&
      selectedConv?.members?.includes(arrivalMessage.sender)
    ) {
      setMessages((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage, selectedConv]);
  useEffect(() => {
    socket.current.emit("addUser", currentUser._id);
    socket.current.on("getUsers", (users) => {
      // console.log(users);//gets u all the people connected in all the sockets
      setOnlineUsers(users.map((user) => user.userId));
    });
  }, [currentUser]);

  // fetching all conversations(just conv memebers not messages) for the current user
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await axios.get(`/conversations/${currentUser._id}`);
        setConversations(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchConversations();
  }, [currentUser]);

  // creatting click ripple effect for send button
  function createRipple(event) {
    const button = event.currentTarget;
    const rect = event.target.getBoundingClientRect();

    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - rect.left - rect.width / 2}px`;
    circle.style.top = `${event.clientY - rect.top - rect.height / 2}px`;

    circle.classList.add("ripple");

    const ripple = button.getElementsByClassName("ripple")[0];

    if (ripple) {
      ripple.remove();
    }

    button.appendChild(circle);
  }
  useEffect(() => {
    const button = document.getElementById("send-button");
    button.addEventListener("click", createRipple);
  });

  // selecting  a particular conversation, fetching messages of that conversaiton
  const scrollRef = useRef(null);
  useEffect(() => {
    if (selectedConv) {
      const fetchMessages = async () => {
        try {
          const res = await axios.get(`/messages/${selectedConv._id}`);
          setMessages(res.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchMessages();
    }
  }, [selectedConv]);
  //scrolling to the bottom as soon as messages complete loading
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // handeling message form/ sending the message
  const [formError, setFormError] = useState({ show: false, msg: "" });
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = async (data) => {
    let { message: msgText } = data;
    if (!selectedConv) {
      setFormError({
        show: true,
        msg: "Canot send message without selecting a conversation",
      });
      setTimeout(() => {
        setFormError({ show: false, msg: "" });
      }, 3000);
    } else if (!msgText.replace(/\s/g, "")) {
      setFormError({ show: true, msg: "Empty message field not allowed" });
      setTimeout(() => {
        setFormError({ show: false, msg: "" });
      }, 3000);
    } else {
      const message = {
        conversationId: selectedConv._id,
        sender: currentUser._id,
        text: data.message,
      };

      try {
        const res = await axios.post("/messages/", message);
        reset();
        setMessages([...messages, res.data]);

        // handeling real time messages socket io, did afterwards for .id
        const receiverId = selectedConv?.members?.find(
          (id) => id !== currentUser._id
        );
        socket.current.emit("sendMessage", {
          senderId: currentUser._id,
          receiverId: receiverId,
          text: data.message,
          _id: res.data._id,
        });

        scrollRef.current.scrollIntoView({ behavior: "smooth" });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="bg-gray-100">
      <Topbar />
      {/* messenger */}
      <div id="messengerGrid" className="grid grid-cols-12">
        {/* chatMenu */}
        <div className="col-span-3 md:col-span-3 flex flex-col items-center overflow-y-scroll">
          <input
            className="text-center w-11/12 border-b-2 border-gray-500 py-3 outline-none bg-gray-100"
            type="text"
            placeholder="Search for friends"
          />
          {conversations.map((c) => {
            let selected = false;
            if (c._id === selectedConv?._id) {
              selected = true;
            }
            const handleSelect = (conversation) => {
              setSelectedConv(conversation);
            };
            return (
              <Conversation
                key={c._id}
                convId={c._id}
                selected={selected}
                handleSelect={handleSelect}
                conversation={c}
                currentUser={currentUser}
              />
            );
          })}
        </div>
        {/* chatBox */}
        <div className="col-span-9 md:col-span-6 flex flex-col justify-between overflow-hidden relative p-2 bg-white">
          {/* chatBox Top */}
          <div className="flex flex-col overflow-y-scroll">
            {messages.map((msg) => {
              const own = msg.sender === currentUser._id ? true : false;
              return (
                <div ref={scrollRef} key={msg._id}>
                  <Message
                    own={own}
                    text={msg.text}
                    time={msg.createdAt}
                    sender={msg.sender}
                  />
                </div>
              );
            })}
          </div>
          {/* chatBox bottom */}
          {formError.show && (
            <span className="text-xs text-red-500 mt-5 pl-4">
              {formError.msg}
            </span>
          )}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-1 mb-2 flex items-center justify-around"
          >
            <textarea
              {...register("message", { required: true })}
              name="message"
              className="w-4/5 h-20 p-3 outline-none border-gray-400 rounded-xl border"
              placeholder="Write something..."
              cols="30"
              rows="10"
            ></textarea>
            <button
              type="submit"
              id="send-button"
              className="h-10 w-10 border-none relative rounded-full bg-blue-600 text-white"
            >
              <SendIcon className="h-5 w-5 transform -rotate-35 absolute top-2 right-2" />
            </button>
          </form>
        </div>
        {/* chatOnline */}
        <div className="hidden md:block col-span-3">
          {/* wrapper */}
          <div>
            <ChatOnline
              currentUserId={currentUser._id}
              onlineUsers={onlineUsers}
              setSelectedConv={setSelectedConv}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messenger;
