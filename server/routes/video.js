const express = require('express');
const router = express.Router();
const { Video } = require('../models/User');

const { auth } = require('../middleware/auth');
const multer = require('multer');

// STORAGE MJULTER CONFIG
let storage = multer.diskStorage({
  cb(null, 'uploads/')
},
filename: (req, file, cb)=> {
  cb(null, `${Date.now()}_${file.originalname}`)
},
fileFilter: (req, file, cb) => {
  const ext = path.extname(file.originalname)
  if (ext !== '.mp4') {
    return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false)
  }
  cb(null, true)
}
})

const upload = multer({ storage: starage }).single('file');

//=================================
//             Video
//=================================

router.post('/uploadfiles', (req, res) => {
  // save video in server
  upload(req, res, err => {
    if(err) {
      return res.json({success: false, err})
    }
  })
});

module.exports = router;
