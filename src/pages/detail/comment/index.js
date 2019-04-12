import React from 'react'
import classNames from 'classnames/bind'
import Star from '../../../components/star'
import styles from './styles.styl'

const cx = classNames.bind(styles)

export default class Comment extends React.PureComponent {

  getDateStr = (dateStr) => {
    let date = new Date(dateStr)
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()

    return `${year}年${month}月${day}日`
  }

  render() {
    let { author = {}, created_at, content, rating: { value = 0 } = {} } = this.props

    return (
      <li className={cx('comment')}>
        <div className={cx('header')}>
          <a href='javascript:;' className={cx('avatar')}>
            <img src={author.avatar} alt='' />
          </a>
          <div className={cx('user')}>
            <p className={cx('name')}>{author.name}</p>
            <p className={cx('meta')}>
              {value > 0 && <Star stars={`${value}0`} />}
              <span className={cx('date')}>{this.getDateStr(created_at)}</span>
            </p>
          </div>
        </div>
        <p className={cx('summary')}>{content}</p>
      </li>
    )
  }
}