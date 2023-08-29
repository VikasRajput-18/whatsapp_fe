import React from "react";
import { Sidebar } from "../components/sidebar";
import { useSelector } from "react-redux";
import { ChatContainer, WhatsppHome } from "../components/chat";

const Home = () => {
  const { activeConversation } = useSelector((state) => state.chat);
  return (
    <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center py-[19px] overflow-hidden">
      {/* container  */}
      <div className="container h-screen flex">
        {/* sidebar  */}
        <Sidebar />
        {activeConversation?._id ? <ChatContainer /> : <WhatsppHome />}
      </div>
    </div>
  );
};

export default Home;
