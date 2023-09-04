import React, { useRef } from "react";
import { PhotoIcon } from "../../../../../svg";
import { useDispatch } from "react-redux";
import { addFiles } from "../../../../../features/chatSlice";
import { getFileType } from "../../../../../utils/file";

const PhotoAttachment = () => {
  const inputRef = useRef();
  const dispatch = useDispatch();

  const imageHandler = (e) => {
    let files = Array.from(e.target.files);
    files.forEach((file) => {
      if (
        file.type !== "image/png" &&
        file.type !== "image/jpeg" &&
        file.type !== "image/gif" &&
        file.type !== "image/webp" &&
        file.type !== "video/mp4" &&
        file.type !== "video/mpeg" &&
        file.type !== "video/webm"
      ) {
        files = files.filter((item) => item.name !== file.name);
      } else if (file.size > 1024 * 1024 * 10) {
        files = files.filter((item) => item.name !== file.name);
        return;
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          dispatch(
            addFiles({
              file: file,
              imgData: e.target.result,
              type: getFileType(file.type),
            })
          );
        };
      }
    });
  };

  return (
    <li>
      <button
        type="button"
        onClick={() => inputRef.current.click()}
        className="bg-[#bf59cf] rounded-full"
      >
        <PhotoIcon />
      </button>
      <input
        type="file"
        accept="image/png,image/jpeg,image/gif,image/jpg,/image/webp,video/mp4,video/mpeg,video/webm"
        hidden
        ref={inputRef}
        multiple
        onChange={imageHandler}
      />
    </li>
  );
};

export default PhotoAttachment;
