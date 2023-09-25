import React from "react";
import moment from "moment";
import FileImageVideo from "./FileImageVideo";
import FilesOther from "./FilesOther";

const FileMessage = ({ fileMessage, message, me }) => {
  return (
    <div
      className={`w-full flex mt-2 space-x-3 max-w-xs ${
        me ? "ml-auto justify-end" : ""
      }`}
    >
      {/* message container  */}
      <div className="relative">
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
          className={`relative ml-5 h-full dark:text-dark_text_1  rounded-lg
     ${me ? "bg-white border-[3px] border-green_3" : "dark:bg-dark_bg_2"}
     ${
       me && fileMessage.file.public_id.split(".")[1] === "png"
         ? "bg-slate-300"
         : "bg-green_3"
     }
    `}
        >
          {/* message  */}
          <div className=" h-full text-sm">
            {fileMessage?.type === "IMAGE" || fileMessage?.type === "VIDEO" ? (
              <FileImageVideo
                url={fileMessage?.file?.secure_url}
                type={fileMessage?.type}
              />
            ) : (
              <FilesOther file={fileMessage?.file} type={fileMessage?.type} />
            )}
          </div>
          {/* message date  */}
          <span className="absolute right-1.5 bottom-1.5 text-xs text-dark_text_5 leading-none">
            {moment(message.createdAt).format("LT")}
          </span>
          {/* triangle  */}
        </div>
      </div>
    </div>
  );
};

export default FileMessage;
