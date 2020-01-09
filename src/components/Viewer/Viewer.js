import React from 'react';
import styles from './Viewer.scss';
import { RotatingPlane } from 'better-react-spinkit';
import classNames from 'classnames/bind';


const cx = classNames.bind(styles);

// 이미지 혹은 동영상을 보여주는 컴포넌트
// mediaType : video or image
// url : 해당 media의 url
// loading : 데이터를 불러올 때 로딩 표시
const Viewer = ({mediaType, url, loading}) => {
  
  if(loading) {
    // 로더
    return (
      <div className={cx('viewer')}>
        <RotatingPlane color="white" size={60}/>
      </div>
    );
  }

  if(!url) return null;

  return (
    <div className={cx('viewer')}>
      {
        mediaType === 'image' ? (
          <img onClick={() => window.open(url)} src={url} alt="space"/>        
        ) : (
          <iframe title="space-video" src={url} frameBorder="0" gesture="media" allow="encrypted-media" allowFullScreen></iframe>
        )
      }
    </div>
  );
};

export default Viewer;