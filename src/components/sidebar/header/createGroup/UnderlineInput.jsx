import React from "react";

const UnderlineInput = ({ name, setName }) => {
  return (
    <div className="mt-4">
      <input
        type="text"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        className="w-full bg-transparent border-b border-green_1 dark:text-dark_text_1 outline-none pl-1"
      />
    </div>
  );
};

export default UnderlineInput;
