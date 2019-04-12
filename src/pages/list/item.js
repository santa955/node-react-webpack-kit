import React from 'react'
import classNames from 'classnames/bind'
import Star from '../../components/star'
import styles from './styles.styl'

const cx = classNames.bind(styles)

export default class ListItem extends React.PureComponent {

  render() {
    let { info = {} } = this.props
    let { id, title, rating = {}, images: { small },
      directors = [], genres = [], casts = [] } = info
    return (
      <li className={cx('movie')}>
        <a href={`/movie/${id}`} className={cx('movie-inner')}>
          <img className={cx('cover')} src={small} />
          <div className={cx('info')}>
            <h3 className={cx('title')}>{title}</h3>
            <p className={cx('meta', 'meta-star')}>
              {rating.average > 0 && <Star {...rating} />}
              <span className={cx('meta-rate')}>{rating.average > 0 ? rating.average : '暂无评分'}</span>
            </p>
            <p className={cx('meta')}>导演：{directors.slice(0, 2).map((director, index) => <b key={index}>{director.name}</b>)}</p>
            <p className={cx('meta')}>主演：{casts.map((cast, index) => <b key={index}>{cast.name}&nbsp;</b>)}</p>
            <p className={cx('meta', 'meta-tags')}>
              {genres.map((genre, index) => <span key={index}>#{genre}</span>)}
            </p>
          </div>
        </a>
      </li>
    )
  }
}