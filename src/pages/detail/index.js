import React from 'react'
import classNames from 'classnames/bind'
import { get } from '../../utils/net-wrok'
import Comment from './comment'
import styles from './styles.styl'

const cx = classNames.bind(styles)

export default class Detail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      movie: {},
      comments: {}
    }
  }
  componentDidMount() {
    this.onLoadData()
  }

  onLoadData = async () => {
    let { match: { params: { id } = {} } = {} } = this.props
    let result = await get(`/api/movie/${id}`)
    let comments = await get(`/api/movie/${id}/comments`)
    let { data: movie = {} } = result
    let { data: movieComments = [] } = comments
    this.setState({ movie, comments: movieComments })
  }

  render() {
    let { movie = {}, comments: { comments: movieComments = [] } = {} } = this.state
    let { title, original_title, images: { small } = {}, genres = [], countries = [], year,
      wish_count = 0, reviews_count = 0, rating = {}, ratings_count = 0, summary,
      directors = [], casts = [] } = movie

    return (
      <section className={cx('detial-wrapper')}>
        <header className={cx('header')}>
          <img className={cx('cover')} src={small} alt='' />
          <div className={cx('info')}>
            <h1 className={cx('title')}>{title}</h1>
            <h2 className={cx('sub-title')}>{original_title}</h2>
            <p className={cx('meta')}>
              {genres.map((genre, index) => <b key={index}>{genre}&nbsp;/&nbsp;</b>)}
              {countries.map((country, index) => <b key={index}>{country}&nbsp;/&nbsp;</b>)}
              <b>分钟</b>
            </p>
            <p className={cx('screen')}>{year}中国大陆上映</p>
            <p className={cx('statistics')}>
              <span>{wish_count}人想看</span>
              <span>&nbsp;/&nbsp;</span>
              <span>{reviews_count}人看过</span>
            </p>
          </div>
        </header>
        <main className={cx('main')}>
          <div className={cx('movie-score')}>
            <div className={cx('score-main')}>
              <div className={cx('score')}>
                <span className={cx('score-txt')}>{rating.average}</span>
                <span className={cx('stars')}>
                  <b className={cx('star')}></b>
                  <b className={cx('star')}></b>
                  <b className={cx('star')}></b>
                  <b className={cx('star', 'star-half')}></b>
                </span>
                <span className={cx('star-count')}>{ratings_count}人评分</span>
              </div>
              <div className={cx('stars-detail')}>
                <div className={cx('star-type')}>
                  <span className={cx('stars')}>
                    <b className={cx('star')}></b>
                    <b className={cx('star')}></b>
                    <b className={cx('star')}></b>
                    <b className={cx('star')}></b>
                    <b className={cx('star')}></b>
                  </span>
                  <span className={cx('star-bar')}>
                    <b className={cx('bar-active')}></b>
                  </span>
                </div>
                <div className={cx('star-type')}>
                  <span className={cx('stars')}>
                    <b className={cx('star')}></b>
                    <b className={cx('star')}></b>
                    <b className={cx('star')}></b>
                    <b className={cx('star')}></b>
                  </span>
                  <span className={cx('star-bar')}>
                    <b className={cx('bar-active')} style={{ width: '70%' }}></b>
                  </span>
                </div>
                <div className={cx('star-type')}>
                  <span className={cx('stars')}>
                    <b className={cx('star')}></b>
                    <b className={cx('star')}></b>
                    <b className={cx('star')}></b>
                  </span>
                  <span className={cx('star-bar')}></span>
                </div>
                <div className={cx('star-type')}>
                  <span className={cx('stars')}>
                    <b className={cx('star')}></b>
                    <b className={cx('star')}></b>
                  </span>
                  <span className={cx('star-bar')}></span>
                </div>
                <div className={cx('star-type')}>
                  <span className={cx('stars')}>
                    <b className={cx('star')}></b>
                  </span>
                  <span className={cx('star-bar')}></span>
                </div>
              </div>
            </div>
          </div>
          <div className={cx('movie-summary')}>
            <h3 className={cx('module-title')}>简介</h3>
            <p className={cx('summary')}>{summary}©豆瓣</p>
          </div>
          <div className={cx('movie-actors')}>
            <h3 className={cx('module-title')}>演员</h3>
            <ul className={cx('actors')}>
              {directors.map(director => {
                return (
                  <li key={director.id} className={cx('actor')}>
                    <div className={cx('actor-avatar')}>
                      <img src={director.avatars.small} alt='' />
                      <span>导演</span>
                    </div>
                    <p>{director.name}</p>
                  </li>)
              })}
              {casts.map(cast => {
                return (
                  <li className={cx('actor')}>
                    <div className={cx('actor-avatar')}>
                      <img src={cast.avatars.small} alt='' />
                    </div>
                    <p>{cast.name}</p>
                  </li>)
              })}
            </ul>
          </div>
          <div className={cx('movie-comments')}>
            <h3 className={cx('module-title')}>精彩评论</h3>
            <ul className={cx('comments')}>
              {movieComments.map(comment => <Comment key={comment.id} {...comment} />)}
            </ul>
          </div>
        </main>
      </section>
    )
  }
}