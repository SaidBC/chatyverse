const cloudinary = require("../configs/cloudinary");

module.exports.handleUpload = async function (file) {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return res;
};
