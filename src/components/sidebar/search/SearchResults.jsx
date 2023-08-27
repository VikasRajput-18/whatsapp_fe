import React from "react";
import Contact from "./Contact";

const SearchResults = ({ searchResults }) => {
  return (
    <div className="w-full convos scrollbar">
      <div>
        <div className="flex flex-col px-8 pt-8">
          <h1 className="font-extralight text-md text-green_2">Contacts</h1>
          <span className="w-full mt-4 ml-10 border-b dark:border-b-dark_bg_1"></span>
        </div>
        {/* results  */}
        <ul>
          {searchResults &&
            searchResults.map((user) => {
              return <Contact key={user._id} contact={user} />;
            })}
        </ul>
      </div>
    </div>
  );
};

export default SearchResults;