const ImageKit = require("@imagekit/nodejs");

const imageKitClient = new ImageKit({
    prprivateKey: process.env.IMAGEKIT_PRIVATE_KEY,
})

async function uploadImage(file) {
    const result = await imageKitClient.files.upload({
        file,
        fileName: "music_" + Date.now(),
        folder: "yt_4/music",
    });
   return result
};

module.exports = { uploadImage };