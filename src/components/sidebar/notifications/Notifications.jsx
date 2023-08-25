import React from "react";
import { ArrowIcon, CloseIcon, NotificationIcon } from "../../../svg";

const Notifications = () => {
  return (
    <div className="h-[90px] dark:bg-dark_bg_3 flex items-center p-[13px]">
      {/* conatienr  */}
      <div className="w-full flex items-center justify-between">
        {/* left  */}
        <div className="flex items-center gap-x-4">
          <div className="cursor-pointer">
            <NotificationIcon className="dark:fill-blue_1" />
          </div>
          <div className="flex flex-col">
            <span className="textPrimary">Get notified of new messages</span>
            <span className="textSecondary mt-0.5 flex items-center gap-0.5">
              Turn on desktop notifications
              <ArrowIcon className="dark:fill-dark_svg_2 mt-1 ml-1" />
            </span>
          </div>
        </div>
        {/* right */}
        <div className="cursor-pointer mr-3">
          <CloseIcon
            className={
              "dark:fill-dark_svg_2 active:bg-dark_hover_1 rounded-full p-[2px]"
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Notifications;
