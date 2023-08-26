import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getConversations } from "../../../features/chatSlice";
import Conversation from "./Conversation";

const Conversations = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { conversations } = useSelector((state) => state.chat);
  useEffect(() => {
    if (user) {
      dispatch(getConversations(user?.token));
    }
  }, [user, dispatch]);

  return (
    <div className="convos scrollbar">
      <ul>
        {conversations &&
          conversations.map((convo, i) => {
            return <Conversation convo={convo} key={convo._id} />;
          })}
      </ul>
    </div>
  );
};

export default Conversations;
