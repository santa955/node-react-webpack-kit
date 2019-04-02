import React from 'react'
import classNames from 'classnames/bind'
import styles from './styles.styl'

const cx = classNames.bind(styles)

export default class Pagination extends React.PureComponent {
  render() {
    return (
      <nav className={cx('pager-wrapper')}>
        <div className={cx('pagers')}>
          <a href='#'>上一页</a>
          <a href='#'>1</a>
          <a href='#'>2</a>
          <a href='#'>3</a>
          <a href='#'>下一页</a>
        </div>
      </nav>
    )
  }
}