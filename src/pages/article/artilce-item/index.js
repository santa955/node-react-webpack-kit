import React from 'react'
import classNames from 'classnames/bind'
import styles from './styles.styl'

const cx = classNames.bind(styles)

export default class ArticleItem extends React.PureComponent {
  render() {
    return (
      <article className={cx('article-item')}>
        <a href='#' className={cx('item')}>
          <h4 className={cx('title')}>[译] 监测与调试 Vue.js 的响应式系统：计算属性树（Computed Tree）</h4>
          <p className={cx('desc')}>
            最近突然回想到之前看过的一个动画，是一个正方体向球体表示爱意，被拒绝，改变自己的小动画。找了半天终于找到了，个人感觉是一个很棒的动画，强烈安利,
            如果你的项目比较大，那么你很有可能在用 Vuex。你会将 store 分割为模块，并且为了关联数据的访问一致性你甚至需要将你的状态范式化。
            你可能使用 Vuex 的 getter 来派生状态，事实上，你还会使用复合的派生数据，即一个 getter 会引用另一个 getter 派生的数据。
            作者：SHERlocked93
            链接：https://juejin.im/post/5c9ca62e5188251d80672b0d
            来源：掘金
            著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。</p>
          <div className={cx('meta')}>
            <span className={cx('date')}>2019-09-23</span>
            <span className={cx('tag')}>#CSS</span>
            <span className={cx('tag')}>#React.js</span>
            <span className={cx('tag')}>#Node.js</span>
          </div>
        </a>
      </article>
    )
  }
}