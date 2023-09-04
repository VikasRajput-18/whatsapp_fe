import React, { useContext, useEffect, useState } from "react";
import { Sidebar } from "../components/sidebar";
import { useDispatch, useSelector } from "react-redux";
import { ChatContainer, WhatsppHome } from "../components/chat";
import { SocketContext } from "../context/SocketContext";
import { updateMessagesAndConversation } from "../features/chatSlice";

const Home = () => {
  const { activeConversation } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);
  const [onlineUsers, setOnlineUsers] = useState([]);
  // typing
  const [typing, setTyping] = useState(false);

  const socket = useContext(SocketContext);
  const dispatch = useDispatch();

  // join user into socket

  useEffect(() => {
    socket.emit("join", user._id);

    // get online users
    socket.on("get-online-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  useEffect(() => {
    // listening to recived a message
    socket.on("receive message", (message) => {
      dispatch(updateMessagesAndConversation(message));
    });
    // lisiting when  a user is typing
    socket.on("typing", (conversation) => {
      setTyping(conversation);
    });
    socket.on("stop typing", () => {
      setTyping(false);
    });
  }, []);

  return (
    <div className="h-screen dark:bg-dark_bg_1 pt-[19px] flex items-center  justify-center  overflow-hidden">
      {/* container  */}
      <div className="container h-screen flex ">
        {/* sidebar  */}
        <Sidebar onlineUsers={onlineUsers} typing={typing} />
        {activeConversation?._id ? (
          <ChatContainer onlineUsers={onlineUsers} typing={typing} />
        ) : (
          <WhatsppHome />
        )}
      </div>
    </div>
  );
};

export default Home;
