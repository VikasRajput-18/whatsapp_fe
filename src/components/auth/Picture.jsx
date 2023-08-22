import React, { useRef, useState } from "react";

const Picture = ({ readablePicture, setPicture, setReadablePicture }) => {
  const [error, setError] = useState("");
  const inputRef = useRef();
  const handlePicture = (e) => {
    const pic = e.target?.files[0];
    if (
      pic?.type !== "image/png" &&
      pic?.type !== "image/jpeg" &&
      pic?.type !== "image/jpg" &&
      pic?.type !== "image/webp"
    ) {
      setError(`${pic?.name} format is not supported.`);
      return;
    } else if (pic?.size > 1024 * 1024 * 5) {
      setError(`${pic?.name} is too large , maxium 5mb allowed.`);
      return;
    } else {
      setError("");
      setPicture(pic);
      // reading the picture
      const reader = new FileReader();
      reader.readAsDataURL(pic);
      reader.onload = (e) => {
        setReadablePicture(e.target.result);
      };
    }
  };

  const handleChange = () => {
    setError("");
    setPicture("");
    setReadablePicture("");
  };

  return (
    <div className="mt-8 content-center dark:text-dark_text_1 space-y-1">
      <label htmlFor="picture" className="text-sm font-bold tracking-wide">
        Picture (Optional)
      </label>
      {readablePicture ? (
        <div>
          <img
            src={readablePicture}
            alt="user"
            className="w-20 h-20 object-cover rounded-full"
          />
          {/* { change pic} */}

          <div
            onClick={() => handleChange()}
            className="w-20 mt-2 dark:bg-dark_bg_3 rounded-md text-sm py-2 flex items-center justify-center cursor-pointer"
          >
            Remove
          </div>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current.click()}
          className="w-full h-12 dark:bg-dark_bg_3 rounded-md font-bold flex items-center justify-center cursor-pointer"
        >
          Upload Picture
        </div>
      )}
      <input
        type="file"
        name="picture"
        id="picture"
        ref={inputRef}
        className="hidden"
        accept="image/png,image/jpg,image/jpeg,image/webp"
        onChange={handlePicture}
      />
      {/* error  */}
      <div className="mt-2">
        <p className="text-red-400">{error}</p>
      </div>
    </div>
  );
};

export default Picture;
