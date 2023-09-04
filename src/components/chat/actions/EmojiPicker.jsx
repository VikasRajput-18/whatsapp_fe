import React, { useEffect, useState } from "react";
import EmojiIcon from "../../../svg/Emoji";
import EmojiPicker from "emoji-picker-react";
import { CloseIcon } from "../../../svg";

const EmojiPickerComponent = ({
  textRef,
  setMessage,
  message,
  showPicker,
  setShowPicker,
  setShowMenu,
}) => {
  const [cursorPosition, setCursorPosition] = useState();

  useEffect(() => {
    textRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);

  const handleEmoji = (emojiData, e) => {
    const { emoji } = emojiData;
    const ref = textRef.current;
    ref.focus();
    const start = message.substring(0, ref.selectionStart);
    const end = message.substring(ref.selectionStart);
    const newText = start + emoji + end;
    setMessage(newText);
    setCursorPosition(start.length + emoji.length);
  };
  return (
    <li>
      <button
        className="btn"
        type="button"
        onClick={() => {
          setShowPicker((prev) => !prev);
          setShowMenu(false);
        }}
      >
        {showPicker ? (
          <CloseIcon className="dark:fill-dark_svg_1" />
        ) : (
          <EmojiIcon className="dark:fill-dark_svg_1" />
        )}
      </button>
      {/* emoji picker  */}
      {showPicker && (
        <div className="openEmojiAnimation w-full absolute bottom-[60px] left-[-0.5px]">
          <EmojiPicker theme="dark" onEmojiClick={handleEmoji} />
        </div>
      )}
    </li>
  );
};

export default EmojiPickerComponent;
