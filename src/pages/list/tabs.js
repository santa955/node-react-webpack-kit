import React from 'react'
import classNames from 'classnames/bind'
import { get } from '../../utils/net-wrok'
import Tabs from '../../components/tabs'
import Item from './item'
import styles from './styles.styl'

const cx = classNames.bind(styles)

export default class List extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      movies: [],
      activeKey: '1'
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

  onTabChange = (tab) => {
    this.setState({ activeKey: tab })
  }

  render() {
    let { movies, activeKey } = this.state
    return (
      <div className={cx('movies-wrapper')}>
        <Tabs activeKey={activeKey} onChange={this.onTabChange}>
          <div tab='热映中' key='1'>adf</div>
          <div tab='即将上映' key='2'>234q23</div>
          <div tab='TOP 250' key='3'></div>
        </Tabs>
      </div>
    )
  }
}