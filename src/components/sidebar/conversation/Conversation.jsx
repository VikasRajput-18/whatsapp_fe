import React, { useContext } from "react";
import { dateHandler } from "../../../utils/date.util";
import { useDispatch, useSelector } from "react-redux";
import { open_create_conversation } from "../../../features/chatSlice";
import {
  getConversationId,
  getConversationName,
  getConversationPicture,
} from "../../../utils/chat.util";
import { capitalize } from "../../../utils/strings.util";
import { SocketContext } from "../../../context/SocketContext";

// 70 
const Conversation = ({ convo, online, typing }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { activeConversation } = useSelector((state) => state.chat);

  const socket = useContext(SocketContext);

  let values = {
    receiver_id: getConversationId(user, convo.users),
    token: user?.token,
  };

  const openConversation = async () => {
    let newConvo = await dispatch(open_create_conversation(values));
    socket.emit("join conversation", newConvo?.payload?._id);
  };

  return (
    <li
      onClick={() => openConversation()}
      className={`list-none h-[72px] w-full dark:bg-dark_bg_1 hover:${
        convo?._id === activeConversation?._id ? "" : "!bg-dark_bg_4"
      } cursor-pointer dark:text-dark_text_1 px-[10px] ${
        convo?._id === activeConversation?._id ? "!bg-dark_hover_1" : ""
      }`}
    >
      {/* container  */}
      <div className="relative w-full flex  justify-between py-[10px]">
        {/* left  */}
        <div className="flex items-center gap-x-3">
          {/* conversation user picture  */}
          <div
            className={`relative w-[50px] h-[50px] rounded-full overflow-hidden ${
              online ? "online" : ""
            }`}
          >
            <img
              src={capitalize(getConversationPicture(user, convo.users))}
              alt={"user"}
              className="w-full h-full object-cover"
            />
          </div>

          {/* conversation name and message  */}
          <div className="w-full flex flex-1  flex-col">
            {/* conversation name  */}
            <h1 className="capitalize font-bold flex items-center gap-y-2">
              {capitalize(getConversationName(user, convo.users))}
            </h1>
            {/* { conversation message } */}
            <div>
              <div className="flex items-center gap-x-1 dark:tetx_dark_text_2">
                <div className="flex-1 items-center gap-x-1 dark:text-dark_text_2 truncate">
                  {typing === convo._id ? (
                    <p className="text-green_1 font-bold">Typing...</p>
                  ) : (
                    <p>
                      {convo?.latestMessage?.message.length > 28
                        ? `${convo?.latestMessage?.message.substring(0, 28)}...`
                        : convo?.latestMessage?.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* right   */}
        <div className="flex flex-col gap-y-4 items-end text-xs">
          <span className="dark:text-dark_text_2">
            {convo?.latestMessage?.createdAt
              ? dateHandler(convo?.latestMessage?.createdAt)
              : ""}
          </span>
        </div>
      </div>
      {/* {border } */}
      <div className="ml-16 border-b dark:border-b-dark_border_1"></div>
    </li>
  );
};

export default Conversation;
