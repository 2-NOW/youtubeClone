import React from 'react';
import { Row, Col } from 'antd';
import { List } from 'antd/lib/form/Form';

function VideoDetailPage() {
  return (
    <Row gutter={[16, 16]}>
      <Col lg={18} xs={24}>
        <div style={{ width: '100%', padding: '3rem 4rem' }}>
          <video style={{ width: '100%' }} src controls />
          <List.item actions>
            <List.item.Meta avatar title description />
          </List.item>
          {/* Comments */}
        </div>
      </Col>
      <Col lg={6} xs={24}>
        Side Videos
      </Col>
    </Row>
  );
}

export default VideoDetailPage;
