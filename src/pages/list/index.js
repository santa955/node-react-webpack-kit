import React from 'react'
import classNames from 'classnames/bind'
import { get } from '../../utils/net-wrok'
import Item from './item'
import styles from './styles.styl'

const cx = classNames.bind(styles)

export default class List extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      movies: []
    }
  }
  componentDidMount() {
    this.onLoadData()
  }

  onLoadData = async () => {
    let result = await get('/api/movies/theaters')
    let { data: { subjects = [] } = {} } = result
    this.setState({ movies: subjects })
  }

  render() {
    let { movies } = this.state
    return (
      <div className={cx('movies-wrapper')}>
        <ul className={cx('movies')}>
          {movies.map(movie => <Item key={movie.id} info={movie} />)}
        </ul>
      </div>
    )
  }
}