import React, { useState } from 'react';
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import Dropzone from 'react-dropzone';
import Axios from 'axios';

const { Title } = Typography;
const { TextArea } = Input;

const PrivateOptions = [
  { value: 0, label: 'Private' },
  { value: 1, label: 'Public' },
];

const CategoryOptions = [
  { value: 0, label: 'Film & Animation' },
  { value: 1, label: 'Autos & Vehicles' },
  { value: 3, label: 'Music' },
  { value: 4, label: 'Pets & Animals' },
];

const onDrop = (files) => {
  let formData = new FormData();
  const config = {
    header: { 'content-type': 'multipart/form-data' }, // header에 content type을 같이 보내야 오류가 안생김
  };
  formData.append('file', files[0]);
  Axios.post('/api/video/uploadfiles', formData, config).then((response) => {
    if (response.data.success) {
    } else {
      alert('video upload failed');
    }
  });
};

function VideoUploadPage() {
  const [VideoTitle, setVideoTitle] = useState('');
  const [Description, setDescription] = useState('');
  const [Private, setPrivate] = useState(0);
  const [Category, setCategory] = useState('Film & Animation'); // default state

  const onTitleChange = (e) => {
    setVideoTitle(e.currentTarget.value); // e.currentTarget.value 입력창에 치는 값이 event로 발생, 가져와서 state를 변경
  };

  const onDescriptionChange = (e) => {
    setDescription(e.currentTarget.value);
  };

  const onPrivateChange = (e) => {
    setPrivate(e.currentTarget.value);
  };

  const onCategoryChange = (e) => {
    setCategory(e.currentTarget.value);
  };

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Title level={2}>Upload Video</Title>
      </div>

      <Form onSubmit>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Drop Zone */}
          <Dropzone
            onDrop={onDrop}
            multiple={false} // 한번에 여러개/ 한 개
            maxSize={1000000000}
          >
            {({ getRootProps, getInputProps }) => (
              <div
                style={{
                  width: '300px',
                  height: '240px',
                  border: '1px solid lightgray',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <Icon type="plus" style={{ fontSize: '3rem' }} />
              </div>
            )}
          </Dropzone>
          {/* Thumbnail */}
          <div>
            <img src alt />
          </div>
        </div>
        <br />
        <br />

        {/* Title */}
        <label>Title</label>
        <Input onChange={onTitleChange} value={VideoTitle} />
        <br />
        <br />

        {/* Description */}
        <label>Description</label>
        <TextArea onChange={onDescriptionChange} value={Description} />
        <br />
        <br />

        {/* Private Change */}
        <select onChange={onPrivateChange}>
          {PrivateOptions.map((item, index) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <br />
        <br />

        {/* Category Change */}
        <select onChange={onCategoryChange}>
          {CategoryOptions.map((item, index) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <br />
        <br />

        <Button type="primary" size="large" onClick>
          Upload
        </Button>
      </Form>
    </div>
  );
}

export default VideoUploadPage;
