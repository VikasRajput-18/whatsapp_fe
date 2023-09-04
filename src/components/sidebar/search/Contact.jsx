import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { open_create_conversation } from "../../../features/chatSlice";
import { SocketContext } from "../../../context/SocketContext";

const Contact = ({ contact, setSearchResults }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const socket = useContext(SocketContext);

  let values = {
    receiver_id: contact?._id,
    token: user?.token,
  };

  const openConversation = async () => {
    let newConvo = await dispatch(open_create_conversation(values));
    socket.emit("join conversation", newConvo?.payload?._id);
    setTimeout(() => {
      setSearchResults([]);
    }, 100);
  };
  return (
    <li
      onClick={() => openConversation()}
      className="list-none h-[72px] hover:dark:bg-dark_bg_2 cursor-pointer dark:text-dark_text_1 px-[10px]"
    >
      {/* container  */}
      <div className="flex items-center gap-x-3 py-[10px]">
        {/* contact  */}
        <div className="flex items-center gap-x-3">
          {/* conversation user picture  */}
          <div className="relative w-[50px] h-[50px] rounded-full overflow-hidden">
            <img
              src={contact.picture}
              alt={contact.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* conversation name and message  */}
          <div className="w-full flex flex-1  flex-col">
            {/* conversation name  */}
            <h1 className="font-bold flex items-center gap-y-2">
              {contact.name}
            </h1>
            {/* { conversation message } */}
            <div>
              <div className="flex items-center gap-x-1 dark:tetx_dark_text_2">
                <div className="flex-1 items-center gap-x-1 dark:text-dark_text_2">
                  <p>{contact.status}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ml-16 border-b dark:border-b-dark_border_1"></div>
    </li>
  );
};

export default Contact;
