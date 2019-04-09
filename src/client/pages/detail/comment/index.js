import React from 'react'
import classNames from 'classnames/bind'
import styles from './styles.styl'

const cx = classNames.bind(styles)

export default class Comment extends React.PureComponent {
  render() {
    return (
      <li className={cx('comment')}>
        <div className={cx('header')}>
          <a href='#' className={cx('avatar')}>
            <img src='http://img1.doubanio.com/icon/u2376305-2.jpg' alt='' />
          </a>
          <div className={cx('user')}>
            <p className={cx('name')}>尘海苍芒</p>
            <p className={cx('meta')}>
              <span className={cx('stars')}>
                <b className={cx('star')}></b>
                <b className={cx('star')}></b>
                <b className={cx('star', 'half')}></b>
                <b className={cx('star', 'gray')}></b>
                <b className={cx('star', 'gray')}></b>
              </span>
              <span className={cx('date')}>2009年7月30日</span>
            </p>
          </div>
        </div>
        <p className={cx('summary')}>
          最近第十放映室在讲三部曲。魔戒三部曲又让我想起了Sam那段美妙绝伦的台词： Frodo: I can’t do this, Sam.  Sam: I know. It’s all wrong. By rights, we shouldn’t even be here. But we are. It’s like in...
        </p>
      </li>
    )
  }
}