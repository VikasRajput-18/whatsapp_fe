import moment from "moment";
import React from "react";
import TraingleIcon from "../../../svg/Triangle";

const Message = ({ message, me }) => {
  return (
    <div
      className={`w-full flex mt-2 space-x-3 max-w-xs ${
        me ? "ml-auto justify-end" : ""
      }`}
    >
      {/* message container  */}
      <div className="relative">
        {/* sender user message  */}
        {!me && (
          <div className="absolute top-1 left-[-20px]">
            <img
              src={message.sender.picture}
              alt=""
              className="w-8 h-8 rounded-full object-cover"
            />
          </div>
        )}
        <div
          className={`relative ml-5 h-full dark:text-dark_text_1 p-2 rounded-lg
         ${me ? "bg-green_3" : "dark:bg-dark_bg_2"}
        `}
        >
          {/* message  */}
          <p className="float-left h-full text-sm pb-4 pr-8">
            {message?.message}
          </p>
          {/* message date  */}
          <span className="absolute right-1.5 bottom-1.5 text-xs text-dark_text_5 leading-none">
            {moment(message.createdAt).format("LT")}
          </span>
          {/* triangle  */}
          {!me ? (
            <span>
              <TraingleIcon className="dark:fill-dark_bg_2 rotate-[60deg] absolute top-[-5px] -left-1.5" />
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Message;
