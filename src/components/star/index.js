import React from 'react'
import classNames from 'classnames/bind'
import styles from './styles.styl'

const cx = classNames.bind(styles)

export default class Star extends React.PureComponent {
  getRate = (stars) => {
    let starsStr = stars + ''
    let star = parseInt(starsStr[0], 10)
    let half = parseInt(starsStr[1], 10)
    let arr = []

    for (let i = 0; i < star; i++) {
      arr.push('star')
    }

    if (half > 0) arr.push('half')

    for (let i = 0; i < 5 - star; i++) {
      arr.push('gray')
    }

    return arr
  }

  render() {
    let { stars } = this.props
    let rates = this.getRate(stars)

    return (
      <span className={cx('stars')}>
        {rates.map((rate, index) => {
          let css = cx({
            star: true,
            half: rate === 'half',
            gray: rate === 'gray',
          })
          return <b key={index} className={css}></b>
        })}
      </span>
    )
  }
}