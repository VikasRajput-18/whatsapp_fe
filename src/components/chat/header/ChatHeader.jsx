import React from "react";
import { useSelector } from "react-redux";
import { CallIcon, DotsIcon, SearchLargeIcon } from "../../../svg";
import { capitalize } from "../../../utils/strings.util";
import VideoCallIcon from "../../../svg/VideoCall";
import {
  getConversationName,
  getConversationPicture,
} from "../../../utils/chat.util";

const ChatHeader = ({ online, callUser }) => {
  const { activeConversation } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);
  return (
    <div className="h-[59px] dark:bg-dark_bg_2 flex items-center p16 select-none">
      {/* container  */}
      <div className="w-full flex items-center justify-between">
        {/* left  */}
        <div className="flex items-center gap-x-4">
          {/* conversation image  */}
          <button className="btn">
            <img
              src={
                activeConversation.isGroup
                  ? activeConversation?.picture
                  : getConversationPicture(user, activeConversation?.users)
              }
              alt={``}
              className="w-full h-full rounded-full object-cover"
            />
          </button>
          {/* conversation name and online status  */}
          <div className="flex flex-col">
            <h1 className="dark:text-white text-md font-bold capitalize">
              {activeConversation.isGroup
                ? activeConversation?.name
                : capitalize(
                    getConversationName(user, activeConversation?.users)
                  )}
            </h1>

            {online ? (
              <span className="text-xs dark:text-dark_svg_2">Online</span>
            ) : null}
          </div>
        </div>
        {/* right   */}
        <ul className="flex items-center gap-x-2.5">
          {/* {1 === 1 ? (
            <li onClick={() => callUser()}>
              <button className="btn">
                <VideoCallIcon />
              </button>
            </li>
          ) : null}
          {1 === 1 ? (
            <li>
              <button className="btn">
                <CallIcon />
              </button>
            </li>
          ) : null} */}
          <li>
            <button className="btn">
              <SearchLargeIcon className={"dark:fill-dark_svg_1"} />
            </button>
          </li>
          <li>
            <button className="btn">
              <DotsIcon className={"dark:fill-dark_svg_1"} />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ChatHeader;
