import React from 'react'
import classNames from 'classnames/bind'
import styles from './styles.styl'

const cx = classNames.bind(styles)

export default class Splash extends React.PureComponent {
  componentDidMount() {
    let content = this.refs.body
    let startY, clientY
    let imag = document.getElementById('imag')
    content.addEventListener('touchstart', function (event) {
      var touch = event.touches[0];
      startY = touch.pageY;
      clientY = touch.clientY;
    });

    content.addEventListener('touchmove', function (event) {

      var touchs = event.touches[0];
      //向上滚动,直接返回
      if (touchs.pageY - startY <= 0) {
        return;
      }
      //不相等,说明屏幕已经向上翻动,image不需要放大效果
      if (startY != clientY) {
        return;
      }

      var header = document.getElementById('headers');
      //图片底部的容器高度+拖动的高度
      header.style.height = 100 + touchs.pageY - startY + 'px';
      //图片放大比例 
      // var scale = (touchs.pageY - startY) / 300 + 1.0;
      // //图片放大
      // imag.style.transform = "scale(" + scale + "," + scale + ")";

    });

    content.addEventListener('touchend', function (event) {
      event.preventDefault();
      var touch = event.changedTouches[0];
      var header = document.getElementById('headers');

      header.style.height = 100 + 'px';
      // imag.style.transform = "none";
      console.log("滑动结束");

    });
  }

  render() {
    return (
      <div className={cx('wrapper')}>
        <div className={cx('header')} id='headers'>
          <img id='imag' src="https://pic3.zhimg.com/v2-43491a59f1a54b7ac1dad76abf1975fd_1200x500.jpg" alt="" />
        </div>
        <div className={cx('body')} ref='body'>

        </div>
      </div>
    )
  }
}