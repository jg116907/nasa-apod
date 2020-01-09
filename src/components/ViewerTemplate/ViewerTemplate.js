import React from 'react';
import styles from './ViewerTemplate.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles);

// viewer 와 spaceNavigator props를 받아서 적당한 위치에 렌더링
const ViewerTemplate = ({ viewer, spaceNavigator }) => {
  return (
    <div className={cx('viewer-template')}>
      <header>
        Astronomy Picture of the Day
      </header>
      <div className={cx('viewer-wrapper')}>
        {viewer}
        <div className={cx('space-navigator-wrapper')}>
          {spaceNavigator}
        </div>
      </div>
    </div>
  );
};

export default ViewerTemplate;
