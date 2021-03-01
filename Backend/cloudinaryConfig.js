const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: "dlygtln09",
  api_key: "723596148365421",
  api_secret: "ierWJOeRfdN4pXMReGWQsZhzKZM",
});

exports.uploads = (file) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(
      file,
      (result) => {
        resolve({ url: result.url, id: result.public_id });
      },
      { resource_type: "auto" }
    );
  });
};
