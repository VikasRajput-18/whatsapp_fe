import React, { useState } from "react";
import { SidebarHeader } from "./header";
import { Notifications } from "./notifications";
import { Search, SearchResults } from "./search";
import { Conversations } from "./conversation";

const Sidebar = ({ onlineUsers , typing }) => {
  const [searchResults, setSearchResults] = useState([]);

  return (
    <div className="flex0030  max-w-[30%] h-full select-none">
      {/* sidebar header  */}
      <SidebarHeader />
      {/* notifications  */}
      <Notifications />
      {/* search  */}
      <Search
        searchLength={searchResults?.length}
        setSearchResults={setSearchResults}
      />
      {searchResults.length > 0 ? (
        <>
          <SearchResults
            searchResults={searchResults}
            setSearchResults={setSearchResults}
          />
        </>
      ) : (
        <Conversations onlineUsers={onlineUsers} typing={typing} />
      )}
      {/* conversation  */}
    </div>
  );
};

export default Sidebar;
