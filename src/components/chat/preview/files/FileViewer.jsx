import React from "react";
import { useSelector } from "react-redux";
import TXT from "../../../../images/files/TXT.png";
import DOCX from "../../../../images/files/DOCX.png";
import DEFAULT from "../../../../images/files/DEFAULT.png";
import PDF from "../../../../images/files/PDF.png";
import PPTX from "../../../../images/files/PPTX.png";

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

const FileViewer = ({ activeIndex }) => {
  const { files } = useSelector((state) => state.chat);
  let imgSrc = filesImage.filter((img) => {
    return img.type === files[activeIndex]?.type;
  })[0];
  return (
    <div className="w-full max-w-[60%]">
      {/* container  */}
      <div className="flex justify-center items-center">
        {files[activeIndex].type === "IMAGE" ? (
          <img
            src={files[activeIndex]?.imgData}
            alt=""
            className="max-w-[80%] rounded-md object-contain hview"
          />
        ) : files[activeIndex].type === "VIDEO" ? (
          <video
            src={files[activeIndex].imgData}
            className="max-w-[80%] rounded-md object-contain hview"
            controls
          ></video>
        ) : (
          <div className="min-w-full hview flex flex-col items-center justify-center">
            {/* file icon image  */}
            <img
              src={imgSrc?.file ? imgSrc?.file : DEFAULT}
              alt={files[activeIndex]?.type}
            />
            {/* {No Preview Text} */}
            <h1 className="dark:text-dark_text_2 text-xl mt-2">
              No preview available
            </h1>
            {/* file size  */}
            <span className="dark:text-dark_text_2 text-center mt-3">
              {files[activeIndex]?.file?.size} kb -{" "}
              {files[activeIndex]?.file.type}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileViewer;
