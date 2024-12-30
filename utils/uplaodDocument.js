const ApiError = require("./ApiError.js");
const { uploadOnCloudinary } = require("../utils/cloudinary.js")

// const uploadDocs = async (req, res) => {
//   if (!req.files || req.files.length === 0) {
//     throw new ApiError(400, "No document files provided");
//   }

//   const uploadResponses = [];
//   for (const file of req.files) {
//     const localFilePath = file.path;
//     const uploadResponse = await uploadOnCloudinary(localFilePath);

//     if (uploadResponse) {
//       uploadResponses.push(uploadResponse.secure_url);
//     }
//   }

//   return uploadResponses;
// };

const uploadImage = async (req, res) => {
  if (!req.files) {
    throw new ApiError(400, "No document file provided");
  }
  const localFile = req.files[0];
  const localFilePath = localFile.path;

  //console.log("LOCALFILEPATH>>", localFilePath);
  const uploadResponse = await uploadOnCloudinary(localFilePath);

  return uploadResponse.secure_url;
};

module.exports = {
  //uploadDocs,
  uploadImage,
};
