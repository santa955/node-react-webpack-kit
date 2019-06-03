import React from 'react'
import Classnames from 'classnames/bind'
import styles from './styles.styl'

const cx = Classnames.bind(styles)

export default class HelloWorld extends React.Component {
  render() {
    return (
      <div className={cx('text')}>hello world.</div>
    )
  }
}