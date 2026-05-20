const musicModel = require("../models/music.model");
const albumModel = require("../models/album.model");
const jwt = require("jsonwebtoken");
const { uploadImage } = require("../services/storage.service");


async function createMusic(req, res) {

    const { title } = req.body;
    const file = req.file;

    const result = await uploadImage(file.buffer.toString("base64"));

    const music = await musicModel.create({
      uri: result.url,
      title,
      artist: req.user.id,
    });

    return res.status(201).json({
      message: "Music created successfully",
      music: {
        id: music._id,
        uri: music.uri,
        title: music.title,
        artist: music.user,
      },
    });
}

async function createAlbum(req, res) {

  const { title, musics, artist } = req.body;

    const album = await albumModel.create({
      title,
      musics: musics,
      artist: req.user.id,
    });

    return res.status(201).json({
      message: "album created successfully",
      album: {
        id: album._id,
        title: album.title,
        musics: album.musics,
        artist: album.user,
      },
    });
}

async function getAllMusic(req, res) {

  const musics = await musicModel.find()
    .populate("artist", "username email")
    .skip(2)
    .limit(2);

  return res.status(201).json({
    message: "Music fetched successfully",
    musics: musics
  });

}

async function getAllAlbum(req, res) {

  const albums = await albumModel.find().select("title artist").populate("artist", "username email")

  return res.status(201).json({
    message: "Album fetched successfully",
    albums,
  });

}

async function getAlbumById(req, res) {
  console.log(req.params)
  const  albumId = req.params.albumId

  const album = await albumModel.findById({_id: albumId}).populate("artist", "username email")

  return res.status(201).json({
    message: "Album fetched successfully",
    album: album
  });
}

module.exports = { createMusic, createAlbum, getAllMusic, getAllAlbum, getAlbumById };
