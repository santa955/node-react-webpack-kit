import React from 'react'
import classNames from 'classnames/bind'
import Item from './item'
import styles from './styles.styl'

const cx = classNames.bind(styles)

export default class List extends React.Component {
  componentDidMount() { }

  render() {
    return (
      <div className={cx('movies-wrapper')}>
        <ul className={cx('movies')}>
          <Item></Item>
          <Item></Item>
          <Item></Item>
          <Item></Item>
        </ul>
      </div>
    )
  }
}