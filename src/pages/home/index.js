import React from 'react'
import classNames from 'classnames/bind'
import Header from '../../components/header'
import Footer from '../../components/footer'
import styles from './styles.styl'

const cx = classNames.bind(styles)

export default class Home extends React.Component {
  render() {
    return (
      <main className={cx('main')}>
        <p className={cx('main-greet')}>Hello, World!</p>
        <h1 className={cx('main-head')}>我是陈志俊</h1>
        <p>
          我专注于
            <em>Web前端</em>
          &nbsp;&nbsp;
            <em>Node.js</em>
          &nbsp;&nbsp;
            <em>小程序</em>
          等开发
          </p>
        <p>
          技术栈包括不限于
            <em>React.js</em>
          &nbsp;&nbsp;
            <em>Vue.js</em>
          &nbsp;&nbsp;
            <em>Javascript</em>
          &nbsp;&nbsp;
            <em>H5</em>
          &nbsp;&nbsp;
            <em>CSS/CSS3</em>
        </p>
        <p>
          热衷于全栈开发，对
            <em>Android原生应用</em>
          &nbsp;&nbsp;
            <em>React Native/Flutter等混合应用</em>
          有实践经验
          </p>
        <div className={cx('main-worked')}>
          <p>我工作过的公司</p>
          <p className={cx('worked-company')}>
            <em><img src='//pic.c-ctrip.com/common/c_logo2013.png' alt='' /></em>
            <em><img src='//www.dota2.com.cn/public/images/logo-wanmei20180327.png' alt='' /></em>
            <em><img src='//res.hjfile.cn/pt/hj/topic/open/img/logo.png' alt='' /></em>
          </p>
        </div>
      </main>
    )
  }
}