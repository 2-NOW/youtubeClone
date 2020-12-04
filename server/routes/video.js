const express = require('express');
const router = express.Router();
const { Video } = require('../models/User');

const { auth } = require('../middleware/auth');
const multer = require('multer');

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
  // thumbnail 생성하
});

module.exports = router;
