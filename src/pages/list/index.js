import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames/bind'
import { getList } from '../../redux/action/list'
import Item from './item'
import styles from './styles.styl'

const cx = classNames.bind(styles)

@connect(state => {
  return {
    movies: state.movies
  }
})
export default class List extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      movies: []
    }
  }
  componentDidMount() {
    if (!window.__PRELOADED__) this.onLoadData()
  }

  onLoadData = async () => {
    this.props.dispatch(getList())
  }

  render() {
    let { movies: { subjects } } = this.props

    return (
      <div className={cx('movies-wrapper')}>
        <ul className={cx('movies')}>
          {subjects.map(movie => <Item key={movie.id} info={movie} />)}
        </ul>
      </div>
    )
  }
}