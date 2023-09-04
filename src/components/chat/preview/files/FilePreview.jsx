import React, { useState } from "react";
import Header from "./Header";
import FileViewer from "./FileViewer";
import Input from "./Input";
import HandleAndSend from "./HandleAndSend";

const FilePreview = () => {
  const [message, setMessage] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="relative py-2 w-full flex items-center justify-center">
      {/* container  */}
      <div className="w-full flex flex-col items-center">
        {/* header  */}
        <Header activeIndex={activeIndex} />
        {/* viewing selected file  */}
        <FileViewer activeIndex={activeIndex} />
        <div className="w-full flex-col flex items-center">
          {/* message input  */}
          <Input message={message} setMessage={setMessage} />
          {/* send and manipulate file  */}
          <HandleAndSend
            message={message}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        </div>
      </div>
    </div>
  );
};

export default FilePreview;
