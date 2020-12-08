const express = require('express');
const router = express.Router();
const { Video } = require('../models/Video');

const { auth } = require('../middleware/auth');
const multer = require('multer');
var ffmpeg = require('fluent-ffmpeg');

// STORAGE MJULTER CONFIG
let storage = multer.diskStorage({
  // file 저장 위치
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  // file 이름
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  // file format
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== '.mp4') {
      return cb(res.status(400).end('only mp4 is allowed'), false);
    }
    cb(null, true);
  },
});

const upload = multer({ storage: storage }).single('file');

//=================================
//             Video
//=================================

router.post('/uploadfiles', (req, res) => {
  // index.js 에 api/video 를 통해서 오므로 /uploadfiles만.
  // save video in server
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    // url: file upload시 uploads folder 안으로 들어감. 그 경로가 url
    return res.json({
      success: true,
      url: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

router.post('/thumbnail', (req, res) => {
  let filePath = '';
  let fileDuration = '';

  // import video duration
  ffmpeg.ffprobe(req.body.url, function (err, metadata) {
    console.dir(metadata);
    console.log(metadata.format.duration);
    fileDuration = metadata.format.duration;
  });

  // creating thumbnail
  ffmpeg(req.body.url) // req.body.url : uploads folder path
    .on('filenames', function (filenames) {
      // filename created
      console.log('Will generate ' + filenames.join(', '));
      console.log(filenames);

      filePath = 'uploads/thumbnails/' + filenames[0];
    })
    .on('end', function () {
      // after thumbnail created
      console.log('Screenshots taken');
      return res.json({
        success: true,
        url: filePath,
        fileDuration: fileDuration,
      });
    })
    .on('error', function (err) {
      console.error(err);
      return res.json({ success: false, err });
    })
    .screenshots({
      // Will take screenshots at 20%, 40%, 60% and 80% of the video
      count: 3,
      folder: 'uploads/thumbnails',
      size: '320x240',
      //'%b': input basename (filename w/o extension)
      filename: 'thumbnail-%b.png',
    });
});

router.post('/uploadvideo', (req, res) => {
  // video정보 저장
  const video = new Video(req.body); // req.body : VideoUploadPage에 variables에 담긴 모든 정보가 다 들어감.
  video.save((err, doc) => {
    // mongoDB에 저장
    if (err) return res.json({ success: false, err });
    res.status(200).json({ success: true });
  });
});

module.exports = router;
