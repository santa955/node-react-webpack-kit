import React from 'react'
import classNames from 'classnames/bind'
import Header from '../../components/header'
import Footer from '../../components/footer'
import ArticleItem from './artilce-item'
import Pagination from './pagination'
import styles from './styles.styl'

const cx = classNames.bind(styles)

export default class Articles extends React.Component {
  render() {
    return (
      <main className={cx('main')}>
        <ArticleItem></ArticleItem>
        <ArticleItem></ArticleItem>
        <ArticleItem></ArticleItem>
        <ArticleItem></ArticleItem>
        <ArticleItem></ArticleItem>
        <ArticleItem></ArticleItem>
        <Pagination></Pagination>
      </main>
    )
  }
}