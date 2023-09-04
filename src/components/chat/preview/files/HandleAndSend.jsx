import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TXT from "../../../../images/files/TXT.png";
import DOCX from "../../../../images/files/DOCX.png";
import DEFAULT from "../../../../images/files/DEFAULT.png";
import PDF from "../../../../images/files/PDF.png";
import PPTX from "../../../../images/files/PPTX.png";
import Add from "./Add";
import { CloseIcon, SendIcon } from "../../../../svg";
import { uploadFiles } from "../../../../utils/upload";

import VideoThumbnail from "react-video-thumbnail";
import {
  clearFiles,
  removeFileFromFiles,
  sendMessages,
} from "../../../../features/chatSlice";

import { SocketContext } from "../../../../context/SocketContext";
import { ClipLoader } from "react-spinners";

const filesImage = [
  {
    file: TXT,
    type: "TXT",
  },
  {
    file: DOCX,
    type: "DOCX",
  },
  {
    file: DEFAULT,
    type: "DEFAULT",
  },
  {
    file: PDF,
    type: "PDF",
  },
  {
    file: PPTX,
    type: "PPTX",
  },
];

const HandleAndSend = ({ message, activeIndex, setActiveIndex }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);

  const { files, activeConversation } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);
  const { token } = user;
  let imgSrc = filesImage.filter((img, ind) => {
    return img.type === files[activeIndex]?.type;
  })[0];

  const sendMessageHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    // upload files first
    const uploaded_files = await uploadFiles(files);
    // send the message
    const values = {
      token,
      message,
      convo_id: activeConversation?._id,
      files: uploaded_files > 0 ? uploaded_files : [],
    };
    let newMsg = await dispatch(sendMessages(values));
    setLoading(false);
    socket.emit("send message", newMsg.payload);
    dispatch(clearFiles());
  };

  const handleRemoveFile = (ind) => {
    dispatch(removeFileFromFiles(ind));
  };

  return (
    <div className="w-[97%] flex items-center pt-4 justify-between mt-2 border-t dark:border-dark_border_2">
      {/* empty  */}
      <span></span>
      {/* list files */}
      <div className="flex gap-x-2">
        {files.map((file, i) => {
          return (
            <div
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`group  w-14 h-14 border relative  rounded-md  cursor-pointer
               ${
                 activeIndex === i
                   ? "border-[3px] border-green_1"
                   : "dark:border-white"
               }
              `}
            >
              {file.type === "IMAGE" ? (
                <img
                  src={file.imgData}
                  alt=""
                  className="w-full h-full rounded-lg object-cover"
                />
              ) : file.type === "VIDEO" ? (
                <video
                  src={file.imgData}
                  className="w-full h-full rounded-lg object-cover"
                />
              ) : (
                // <VideoThumbnail videoUrl={file.imgData} />
                <img
                  src={imgSrc?.file ? imgSrc?.file : DEFAULT}
                  className="w-8 h-10 rounded-lg mt-1.5 ml-2.5"
                  alt={files[activeIndex]?.type}
                />
              )}
              {/* remove file icon  */}
              <div
                onClick={() => handleRemoveFile(i)}
                className="opacity-0 group-hover:opacity-100 "
              >
                <CloseIcon
                  className={
                    "dark:fill-dark_svg_1 absolute -top-2 -right-2  bg-dark_bg_2 rounded-full p-1"
                  }
                />
              </div>
            </div>
          );
        })}

        {/* add another file */}
        <Add setActiveIndex={setActiveIndex} />
      </div>
      {/* send button  */}
      <div
        onClick={sendMessageHandler}
        className="bg-green_1 w-16 h-16 mt-2 rounded-full flex items-center justify-center cursor-pointer"
      >
        {loading ? (
          <ClipLoader color="#e9edef" size={25} />
        ) : (
          <SendIcon className="fill-white" />
        )}
      </div>
    </div>
  );
};

export default HandleAndSend;
