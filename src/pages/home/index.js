import React from 'react'
import classNames from 'classnames/bind'
import styles from './styles.styl'

const cx = classNames.bind(styles)

export default class Home extends React.Component {
  render() {
    return (
      <section className={cx('wrapper')}>
        <header className={cx('header')}>
          <h1><a href='/'><img src='//ae01.alicdn.com/kf/HTB11y6FN4naK1RjSZFtq6zC2VXaf.jpg' alt='首页' /></a></h1>
          <nav className={cx('header-nav')}>
            <a className={cx('nav')} href='#'>文章</a>
            <a className={cx('nav')} href='#'>开源</a>
            <a className={cx('nav')} href='#'>关于</a>
            <a className={cx('nav')} href='#'>存档</a>
          </nav>
        </header>
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
          <p className={cx('main-worked')}>
            <p>我工作过的公司</p>
            <div className={cx('worked-company')}>
              <em><img src='//pic.c-ctrip.com/common/c_logo2013.png' alt='' /></em>
              <em><img src='//www.dota2.com.cn/public/images/logo-wanmei20180327.png' alt='' /></em>
              <em><img src='//res.hjfile.cn/pt/hj/topic/open/img/logo.png' alt='' /></em>
            </div>
          </p>
        </main>
        <footer className={cx('footer')}>
          <div><b>©2019</b><p>Yandan66</p></div>
          <div><b>联系方式</b><p><a href='mailto:yandan66@126.com'>yandan66@126.com</a></p></div>
          <div><b>社交</b><p><a href='https://github.com/lannonbr'>微信</a> <a href='https://twitter.com/lannonbr'>QQ</a></p></div>
          <div><b>GitHub</b><p><a href='https://github.com/yandan66'>https://github.com/yandan66</a></p></div>
        </footer>
      </section>
    )
  }
}