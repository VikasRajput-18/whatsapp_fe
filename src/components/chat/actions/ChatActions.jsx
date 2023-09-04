import React, { useContext, useRef, useState } from "react";
import Input from "./Input";
import { SendIcon } from "../../../svg";
import { useDispatch, useSelector } from "react-redux";
import { sendMessages } from "../../../features/chatSlice";
import { ClipLoader } from "react-spinners";
import EmojiPickerComponent from "./EmojiPicker";
import { Attachments } from "./attachments";

import { SocketContext } from "../../../context/SocketContext";

const ChatActions = () => {
  const dispatch = useDispatch();
  const [showPicker, setShowPicker] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const socket = useContext(SocketContext);

  const [loading, setLoading] = useState(false);

  const textRef = useRef();

  const [message, setMessage] = useState("");
  const { user } = useSelector((state) => state.user);
  const { activeConversation, status } = useSelector((state) => state.chat);
  const { token } = user;

  let values = {
    token,
    convo_id: activeConversation?._id,
    files: [],
    message,
  };

  const sendMessageHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    let newMsg = await dispatch(sendMessages(values));
    setLoading(false);
    setMessage("");

    socket.emit("send message", newMsg.payload);
  };

  return (
    <form
      onSubmit={sendMessageHandler}
      className="dark:bg-dark_bg_2 h-[60px] w-full flex items-center absolute bottom-0 py-2  px-4 select-none"
    >
      {/* container  */}
      <div className="w-full flex items-center gap-x-2">
        {/* emojis and attachments  */}
        <ul className="flex gap-x-2">
          <EmojiPickerComponent
            textRef={textRef}
            setMessage={setMessage}
            message={message}
            showPicker={showPicker}
            setShowPicker={setShowPicker}
            setShowMenu={setShowMenu}
          />
          <Attachments
            showMenu={showMenu}
            setShowPicker={setShowPicker}
            setShowMenu={setShowMenu}
          />
        </ul>
        {/* input  */}
        <Input message={message} setMessage={setMessage} textRef={textRef} />
        {/* {send btn } */}
        <button type="submit" className="btn">
          {status === "loading" && loading ? (
            <ClipLoader color="#e9edef" size={25} />
          ) : (
            <SendIcon className={"dark:fill-dark_svg_1"} />
          )}
        </button>
      </div>
    </form>
  );
};

export default ChatActions;
