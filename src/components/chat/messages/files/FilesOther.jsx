import React from "react";
import TXT from "../../../../images/files/TXT.png";
import DOCX from "../../../../images/files/DOCX.png";
import DEFAULT from "../../../../images/files/DEFAULT.png";
import PDF from "../../../../images/files/PDF.png";
import PPTX from "../../../../images/files/PPTX.png";

import DownloadIcon from "../../../../svg/Download";

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

const FilesOther = ({ file, type }) => {
  let imgSrc = filesImage.filter((img, ind) => {
    return img.type === type;
  })[0];


  return (
    <div className=" p-2">
      <div className="flex justify-between gap-x-8">
        {/* {file info}  */}
        {/* download button  */}
        <div className="flex items-center gap-2">
          <img
            src={imgSrc?.file ? imgSrc?.file : DEFAULT}
            alt=""
            className="w-8 object-contain"
          />
          <div className="flex flex-col gap-2">
            <h1>
              {" "}
              {file.original_filename} {file.public_id.split(".")[0]}
            </h1>
            <span className="text-sm">
              {type} . {file.bytes}B
            </span>
          </div>
        </div>
        <a href={file.secure_url} rel="noreferrer" target="_blank" download>
          <DownloadIcon />
        </a>
      </div>
    </div>
  );
};

export default FilesOther;
