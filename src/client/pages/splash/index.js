import React from 'react'
import classNames from 'classnames/bind'
import styles from './styles.styl'

const cx = classNames.bind(styles)

export default class Splash extends React.PureComponent {

  render() {
    return (
      <div className={cx('splash')}>
        <div className={cx('content')}>
          {/* <span>好电影</span>
          <span>好时光</span> */}
          <a className={cx('button')} href='/movies/1291572'>查看详情</a>
        </div>
      </div>
    )
  }
}