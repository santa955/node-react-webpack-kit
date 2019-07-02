import React from 'react'
import classNames from 'classnames/bind'
import Star from '../../../components/star'
import styles from './styles.styl'

const cx = classNames.bind(styles)

export default class RateDetail extends React.PureComponent {
  getRateCount = () => {
    let { details = {} } = this.props
    let count = 0

    for (let key in details) {
      count += details[key]
    }

    return count
  }
  render() {
    let { details = {} } = this.props
    let count = this.getRateCount()
    let keys = Object.keys(details)

    return (
      <React.Fragment>
        {keys.map((key, index) => {
          let width = (details[key] / count).toFixed(2) * 100
          return (
            <div key={index} className={cx('star-type')}>
              <Star stars={`${5 - index}0`} className={cx('star')} gray={false} />
              <span className={cx('star-bar')}>
                <b className={cx('bar-active')} style={{ width: `${width}%` }}></b>
              </span>
            </div>
          )
        })}
      </React.Fragment>
    )
  }
}