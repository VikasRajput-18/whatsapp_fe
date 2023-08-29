import React, { useEffect } from "react";
import ChatHeader from "./header/ChatHeader";
import ChatMessages from "./messages/ChatMessages";
import { ChatActions } from "./actions";
import { useDispatch, useSelector } from "react-redux";
import { getConversationMessages } from "../../features/chatSlice";

const ChatContainer = () => {
  const { activeConversation } = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { token } = user;

  const values = {
    token,
    convo_id: activeConversation?._id,
  };

  useEffect(() => {
    if (activeConversation?._id) {
      dispatch(getConversationMessages(values));
    }
  }, [activeConversation]);

  return (
    <div className="relative w-full h-full border-l dark:border-l-dark_border_2 select-none overflow-hidden">
      {/* container  */}
      <div>
        {/* chat header  */}
        <ChatHeader />
        {/* chat mesages  */}
        <ChatMessages />
        {/* chat actions  */}
        <ChatActions />
      </div>
    </div>
  );
};

export default ChatContainer;
