import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SideVideo() {
  const [sideVideos, setsideVideos] = useState([]);

  useEffect(() => {
    // landing page랑 같은 방식이기 때문에 axios에서 같은 api로 data 가져옴.
    axios.get('/api/video/getvideos').then((response) => {
      if (response.data.success) {
        console.log(response.data);
        setsideVideos(response.data.videos);
      } else {
        alert('failed getvideo');
      }
    });
  }, []);

  const renderSideVideo = sideVideos.map((video, index) => {
    let minutes = Math.floor(video.duration / 60);
    let seconds = Math.floor(video.duration - minutes * 60);

    return (
      <div
        key={index}
        style={{ display: 'flex', marginBottom: '1rem', padding: '0 2rem' }}
      >
        {/* left part : thumbnails */}
        <div style={{ width: '40%', marginRight: '1rem' }}>
          <a href>
            <img
              style={{ width: '100%', height: '100%' }}
              src={`http://localhost:8080/${video.thumbnail}`}
              alt="thumbnail"
            />
          </a>
        </div>
        {/* right part : content */}
        <div style={{ width: '50%' }}>
          <a href style={{ color: 'gray' }}>
            <span style={{ fontSize: '1rem', color: 'black' }}>
              {video.title}
            </span>
            <br />
            <span>{video.writer.name}</span>
            <br />
            <span>{video.views}</span>
            <br />
            <span>
              {minutes} : {seconds}
            </span>
          </a>
        </div>
      </div>
    );
  });

  return (
    <React.Fragment>
      <div style={{ marginTop: '3rem' }} />
      {renderSideVideo}
    </React.Fragment>
  );
}

export default SideVideo;
