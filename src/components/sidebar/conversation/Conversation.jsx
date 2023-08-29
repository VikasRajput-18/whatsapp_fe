import React from "react";
import { dateHandler } from "../../../utils/date.util";
import { useDispatch, useSelector } from "react-redux";
import { open_create_conversation } from "../../../features/chatSlice";
import { getConversationId } from "../../../utils/chat.util";
import { capitalize } from "../../../utils/strings.util";

const Conversation = ({ convo }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  let values = {
    receiver_id: getConversationId(user, convo.users),
    token: user?.token,
  };

  const openConversation = () => {
    dispatch(open_create_conversation(values));
  };
  return (
    <li
      onClick={() => openConversation()}
      className="list-none h-[72px] w-full dark:bg-dark_bg_1 hover:!bg-dark_bg_4 cursor-pointer dark:text-dark_text_1 px-[10px]"
    >
      {/* container  */}
      <div className="relative w-full flex  justify-between py-[10px]">
        {/* left  */}
        <div className="flex items-center gap-x-3">
          {/* conversation user picture  */}
          <div className="relative w-[50px] h-[50px] rounded-full overflow-hidden">
            <img
              src={convo.picture}
              alt={convo.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* conversation name and message  */}
          <div className="w-full flex flex-1  flex-col">
            {/* conversation name  */}
            <h1 className="capitalize font-bold flex items-center gap-y-2">
              {capitalize(convo.name)}
            </h1>
            {/* { conversation message } */}
            <div>
              <div className="flex items-center gap-x-1 dark:tetx_dark_text_2">
                <div className="flex-1 items-center gap-x-1 dark:text-dark_text_2 ">
                  <p>
                    {convo?.latestMessage?.message.length > 28
                      ? `${convo?.latestMessage?.message.substring(0, 28)}...`
                      : convo?.latestMessage?.message}
                  </p>
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
