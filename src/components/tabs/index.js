import React from 'react'
import classNames from 'classnames/bind'
import styles from './styles.styl'

const cx = classNames.bind(styles)

export default class Tabs extends React.PureComponent {

  render() {
    let { children, activeKey = 0, defaultActiveKey = 0, onChange } = this.props
    let tabs = []
    let panes = []
    React.Children.forEach(children, (child, index) => {
      if (!child) return
      let key = child.key
      let tabStyles = cx({ 'tab': true, 'active': activeKey === key })
      let paneStyles = cx({ 'pane': true, inactive: activeKey !== key, 'active': activeKey === key })
      let pane = <div className={paneStyles} key={key}>{child.props.children}</div>
      let tab = <span
        onClick={() => { onChange && onChange(key) }}
        className={tabStyles}
        key={key}>
        {child.props.tab}
      </span>
      tabs.push(tab)
      panes.push(pane)
    })

    return (
      <div className={cx('tabs-wrapper')}>
        <div className={cx('panes')}>{panes}</div>
        <div className={cx('tabs')}>{tabs}</div>
      </div>
    )
  }
}
