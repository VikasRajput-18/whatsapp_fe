import React, { useState } from "react";
import { SidebarHeader } from "./header";
import { Notifications } from "./notifications";
import { Search } from "./search";
import { Conversations } from "./conversation";

const Sidebar = () => {
  const [searchResults, setSearchResults] = useState([]);
  return (
    <div className="w-[40%] h-full select-none">
      {/* sidebar header  */}
      <SidebarHeader />
      {/* notifications  */}
      <Notifications />
      {/* search  */}
      <Search searchLength={searchResults?.length} />
      {/* conversation  */}
      <Conversations />
    </div>
  );
};

export default Sidebar;
