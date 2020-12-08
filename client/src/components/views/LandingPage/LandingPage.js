import React, { useEffect, useState } from 'react';
import { Card, Avatar, Col, Typography, Row } from 'antd';
import Axios from 'axios';
import moment from 'moment';

const { Title } = Typography;
const { Meta } = Card;

function LandingPage() {
  const [Video, setVideo] = useState([]);

  useEffect(() => {
    // dom이 load되자마자 무엇을 할 것인지
    Axios.get('/api/video/getvideos').then((response) => {
      if (response.data.success) {
        console.log(response.data);
        setVideo(response.data.videos);
      } else {
        alert('failed getvideo');
      }
    });
  }, []); // []이 없으면 계속 rendering 되고, 있으면 첫 load시 한번만

  const renderCards = Video.map((video, index) => {
    let minutes = Math.floor(video.duration / 60);
    let seconds = Math.floor(video.duration - minutes * 60);
    // duration을 받아올 때 seconds로 되어있어서 계산해줘야함

    return (
      <Col lg={6} md={8} xs={24}>
        {/* window가 minimum size 일 때 one column size가 25
    window가 midium size 일 때 one column size가 8
    window가 large size 일 때 one column size가 6 / total 4 column */}
        <div style={{ position: 'relative' }}>
          <a href={`/video/post/${video._id}`}>
            {/* renderCards에 있는 video에 id 담김 */}
            <img
              style={{ width: '100%' }}
              src={`http://localhost:8080/${video.thumbnail}`}
            />
            <div className="duration">
              <span>
                {minutes} : {seconds}
              </span>
            </div>
          </a>
        </div>
        <br />
        <Meta
          avatar={<Avatar src={video.writer.image} />} // user image
          title={video.title}
          description=""
        />
        <span>{video.writer.name}</span>
        <br />
        <span style={{ marginLeft: '3rem' }}>{video.views} views</span> -{' '}
        <span>{moment(video.createdAt).format('MMM Do YY')}</span>
      </Col>
    );
  });

  return (
    <div style={{ width: '85%', margin: '3rem auto' }}>
      <Title level={2}> Recommended </Title>
      <hr />
      <Row gutter={[32, 16]}>{renderCards}</Row>
    </div>
  );
}

export default LandingPage;
