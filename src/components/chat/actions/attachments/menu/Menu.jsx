import React from "react";
import {
  CameraIcon,
  ContactIcon,
  PollIcon,
  StickerIcon,
} from "../../../../../svg";
import PhotoAttachment from "./PhotoAttachment";
import DocumentsAttachment from "./DocumentsAttachment";

const Menu = () => {
  return (
    <ul className="absolute bottom-14 openEmojiAnimation">
      <li>
        <button type="button" className="rounded-full">
          <PollIcon />
        </button>
      </li>
      <li>
        <button type="button" className="bg-[#0eabf4] rounded-full">
          <ContactIcon />
        </button>
      </li>
      <DocumentsAttachment />
      <li>
        <button type="button" className="bg-[#D3369D] rounded-full">
          <CameraIcon />
        </button>
      </li>
      <li>
        <button type="button" className="rounded-full">
          <StickerIcon />
        </button>
      </li>

      <PhotoAttachment />
    </ul>
  );
};

export default Menu;
