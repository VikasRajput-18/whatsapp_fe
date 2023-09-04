import axios from "axios";

const cloud_secret = process.env.REACT_APP_CLOUD_SECRET;
const cloud_name = process.env.REACT_APP_CLOUD_NAME;

export const uploadFiles = async (files) => {
  let formData = new FormData();
  console.log(cloud_secret);
  formData.append("upload_preset", cloud_secret);
  //   formData.append("cloud_name", cloud_name);
  let uploaded = [];
  for (const f of files) {
    let { file, type } = f;
    formData.append("file", file);
    let res = await uploadToCloudinary(formData);
    uploaded.push({
      file: res,
      type,
    });
  }
  return uploaded;
};

const uploadToCloudinary = async (formData) => {
  return new Promise(async (resolve, reject) => {
    return await axios
      .post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/raw/upload`,
        formData
      )
      .then(({ data }) => resolve(data))
      .catch((error) => reject(error));
  });
};
