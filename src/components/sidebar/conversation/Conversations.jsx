import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getConversations } from "../../../features/chatSlice";
import Conversation from "./Conversation";
import { checkOnlineStatus, getConversationId } from "../../../utils/chat.util";

const Conversations = ({ onlineUsers , typing }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { conversations, activeConversation } = useSelector(
    (state) => state.chat
  );
  useEffect(() => {
    if (user) {
      dispatch(getConversations(user?.token));
    }
  }, [user, dispatch]);

  return (
    <div className="convos scrollbar">
      <ul>
        {conversations &&
          conversations
            .filter((c) => c.latestMessage || c._id === activeConversation._id)
            .map((convo, i) => {
              let check = checkOnlineStatus(onlineUsers, user, convo.users);
              return (
                <Conversation
                  convo={convo}
                  key={convo._id}
                  online={check ? true : false}
                  typing={typing}
                />
              );
            })}
      </ul>
    </div>
  );
};

export default Conversations;
