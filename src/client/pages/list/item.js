import React from 'react'
import classNames from 'classnames/bind'
import styles from './styles.styl'

const cx = classNames.bind(styles)

export default class ListItem extends React.PureComponent {

  render() {
    return (
      <li className={cx('movie')}>
        <a href='#' className={cx('movie-inner')}>
          <img className={cx('cover')} src='http://img1.doubanio.com/view/photo/s_ratio_poster/public/p2551249211.webp' />
          <div className={cx('info')}>
            <h3 className={cx('title')}>雷霆沙赞！</h3>
            <p className={cx('meta', 'meta-star')}>
              <span className={cx('stars')}>
                <b className={cx('star')}></b>
                <b className={cx('star')}></b>
                <b className={cx('star')}></b>
                <b className={cx('star', 'star-half')}></b>
              </span>
              <span>9.5</span>
            </p>
            <p className={cx('meta')}>导演：大卫·F·桑德伯格</p>
            <p className={cx('meta')}>主演：扎克瑞·莱维</p>
            <p className={cx('meta', 'meta-tags')}>
              <span>#武侠</span>
              <span>#古装</span>
              <span>#玄幻</span>
            </p>
          </div>
        </a>
      </li>
    )
  }
}