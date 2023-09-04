import React from "react";
import { CloseIcon } from "../../../../svg";
import { useDispatch, useSelector } from "react-redux";
import { clearFiles } from "../../../../features/chatSlice";

const Header = ({ activeIndex }) => {
  const { files } = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  const clearFilesHandler = () => {
    dispatch(clearFiles());
  };

  return (
    <div className="w-full px-4">
      {/* container  */}
      <div className="w-full flex items-center justify-between">
        {/* close icon  */}
        <div className="cursor-pointer" onClick={clearFilesHandler}>
          <CloseIcon className={"dark:fill-dark_svg_1"} />
        </div>
        {/* file name  */}
        <h1 className="dark:text-dark_text_1 text-[15px]">
          {files[activeIndex]?.file?.name}
        </h1>
        {/* empty tag  */}
        <div />
      </div>
    </div>
  );
};

export default Header;
