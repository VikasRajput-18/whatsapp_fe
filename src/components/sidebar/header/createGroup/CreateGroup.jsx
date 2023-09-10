import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReturnIcon } from "../../../../svg";
import UnderlineInput from "./UnderlineInput";
import MultipleSelect from "./MultipleSelect";
import axios from "axios";

import ClipLoader from "react-spinners/ClipLoader";
import ValidIcon from "../../../../svg/Valid";
import { createGroupConversation } from "../../../../features/chatSlice";

const CreateGroup = ({ setShowCreateGroup }) => {
  const [name, setName] = useState("");
  const { user } = useSelector((state) => state.user);
  const { status } = useSelector((state) => state.chat);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const { token } = user;

  const dispatch = useDispatch();

  const handleSearch = async (e) => {
    if (e.target.value && e.key === "Enter") {
      setSearchResults([]);
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_ENDPOINT}/user?search=${e.target.value}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (data.length > 0) {
          let tempArray = [];
          data.forEach((user) => {
            let temp = {
              value: user._id,
              label: user.name,
              picture: user.picture,
            };
            tempArray.push(temp);
          });
          setSearchResults(tempArray);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.log(error.response.data.error.message);
      }
    } else {
      setSearchResults([]);
    }
  };

  const createGroupHandler = async () => {
    if (status !== "loading") {
      let users = [];
      selectedUsers.forEach((user) => {
        users.push(user.value);
      });
      let values = {
        name,
        users,
        token,
      };
      let newConvo = await dispatch(createGroupConversation(values));
      setShowCreateGroup(false)
    }
  };

  return (
    <div className="createGroupAnimation relative flex0030 h-full z-40">
      {/* container  */}
      <div className="mt-5">
        {/* return close button  */}
        <button
          className="btn w-6 h-6 border"
          onClick={() => setShowCreateGroup(false)}
        >
          <ReturnIcon className={"fill-white"} />
        </button>
        {/* group name input  */}
        <UnderlineInput name={name} setName={setName} />
        {/* multiple select users  */}
        <MultipleSelect
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
          searchResults={searchResults}
          handleSearch={handleSearch}
        />
        {/* create group button  */}
        <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2">
          <button
            className="btn bg-green_1 scale-150 hover:bg-green-500"
            onClick={() => createGroupHandler()}
          >
            {status === "loading" ? (
              <ClipLoader color="#e9edef" size={25} />
            ) : (
              <ValidIcon className={"fill-white mt-2 h-full"} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateGroup;
