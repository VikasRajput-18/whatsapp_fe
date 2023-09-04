import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Message from "./Message";
import Typing from "./Typing";

const ChatMessages = ({ typing }) => {
  const endRef = useRef();

  const { messages, activeConversation } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state?.user);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    endRef.current.scrollIntoView({
      behaviour: "smooth",
    });
  };

  return (
    <div className="mb-[60px]  bg-[url('https://res.cloudinary.com/dmhcnhtng/image/upload/v1677358270/Untitled-1_copy_rpx8yb.jpg')] bg-cover bg-no-repeat">
      {/* container  */}
      <div className="scrollbar overflow_scrollbar overflow-auto py-2 px-[4%]">
        {/* messages  */}
        {messages &&
          messages?.map((message) => (
            <Message
              message={message}
              key={message?._id}
              me={user?._id === message?.sender?._id}
            />
          ))}
        <div className="mt-4" ref={endRef}></div>
        {typing === activeConversation._id ? <Typing /> : ""}
      </div>
    </div>
  );
};

export default ChatMessages;
