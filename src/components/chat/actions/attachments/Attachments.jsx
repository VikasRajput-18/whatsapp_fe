import React from "react";
import { AttachmentIcon } from "../../../../svg";
import Menu from "./menu/Menu";

const Attachments = ({ showMenu, setShowMenu, setShowPicker }) => {
  return (
    <li className="relative">
      <button
        type="button"
        className="btn"
        onClick={() => {
          setShowMenu((prev) => !prev);
          setShowPicker(false);
        }}
      >
        <AttachmentIcon className="dark:fill-dark_svg_1" show={showMenu} />
      </button>
      {/* menu   */}
      {showMenu && <Menu />}
    </li>
  );
};

export default Attachments;
