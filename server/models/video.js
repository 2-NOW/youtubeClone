const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// video collection 생성

const videoSchema = mongoose.Schema(
  {
    writer: {
      type: Schema.Types.ObjectId, // id만 넣어도 User모델에서 정보를 다 가져옴
      ref: 'User',
    },
    title: {
      type: String,
      maxlength: 50,
    },
    description: {
      type: String,
    },
    privacy: {
      type: Number,
    },
    filePath: {
      type: String,
    },
    category: {
      type: String,
    },
    views: {
      type: Number,
      default: 0,
    },
    duration: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
  },
  { timestamps: true } // 만든 date와 update 한 date가 표시됨
);

const Video = mongoose.model('Video', videoSchema);

module.exports = { Video };
