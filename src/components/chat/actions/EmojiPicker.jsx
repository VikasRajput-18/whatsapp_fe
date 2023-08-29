import React from "react";
import EmojiIcon from "../../../svg/Emoji";

const EmojiPicker = () => {
  return (
    <li>
      <button className="btn" type="button">
        <EmojiIcon className="dark:fill-dark_svg_1" />
      </button>
      {/* emoji picker  */}
    </li>
  );
};

export default EmojiPicker;
