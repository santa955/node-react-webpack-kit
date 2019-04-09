import React from 'react'
import classNames from 'classnames/bind'
import Comment from './comment'
import styles from './styles.styl'

const cx = classNames.bind(styles)

export default class Detail extends React.Component {
  render() {
    return (
      <section className={cx('detial-wrapper')}>
        <header className={cx('header')}>
          <img className={cx('cover')} src='http://img3.doubanio.com/view/photo/s_ratio_poster/public/p909265336.webp' alt='' />
          <div className={cx('info')}>
            <h1 className={cx('title')}>指环王2：双塔奇兵</h1>
            <h2 className={cx('sub-title')}>The Lord of the Rings: The Two Towers</h2>
            <p className={cx('meta')}>动作 / 冒险 / 奇幻 / 美国 / 123分钟</p>
            <p className={cx('screen')}>2018-04-23中国大陆上映</p>
            <p className={cx('statistics')}>
              <span>12.45万人想看</span>
              <span>&nbsp;/&nbsp;</span>
              <span>12.3万人看过</span>
            </p>
          </div>
        </header>
        <main className={cx('main')}>
          <div className={cx('movie-score')}>
            <div className={cx('score-main')}>
              <div className={cx('score')}>
                <span className={cx('score-txt')}>9.0</span>
                <span className={cx('stars')}>
                  <b className={cx('star')}></b>
                  <b className={cx('star')}></b>
                  <b className={cx('star')}></b>
                  <b className={cx('star', 'star-half')}></b>
                </span>
                <span className={cx('star-count')}>20.23万人评分</span>
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
            <h3>简介</h3>
            <p className={cx('summary')}>第二部在延续第一部风格的同时，故事呈现出多线发展的格局，情节有了更高的观赏性。\n第一部结尾，博罗米尔被强兽人杀死之后，两个哈比族人皮平和梅利也被强兽人绑架，阿拉贡、精灵莱戈拉斯（奥兰多•布鲁姆 饰）、侏儒金利一路追踪强兽人，营救皮平和梅利，遇到了“复活”的白袍巫师甘道夫（伊恩•麦凯伦 饰）。此时，投降索伦的白袍巫师萨鲁曼控制了人类洛汉王国的国王，并派出大量的强兽人军队，准备消灭人类。阿拉贡、莱戈拉斯和金利在甘道夫的带领下，帮助洛汉王国对抗邪恶力量的入侵。\n幸运的皮平和梅利被会说话的树精救了出来，并且遇到“复活”的甘道夫，在甘道夫的授意下，树精保护了两人的安全，并且带他们参加树精大会，大会上，树精们讨论对待中土大战的态度：是继续当中立者，逆来顺受，还是奋起反抗？\n身负重任的佛罗多(伊莱贾•伍德 饰)和山姆继续向末日山脉前进，一路上被咕噜跟踪，弗罗多依靠至尊魔戒的力量，成为了咕噜的主人，在咕噜的带领下，他们到了末日山脉的入口，黑门。就在他们准备进入之时，博罗米尔的弟弟法莫尔出现，将他们带回了刚铎。弗罗多又遇上了新的危机：法莫尔想利用至尊魔戒的力量对抗萨鲁曼的攻击……©豆瓣</p>
          </div>
          <div className={cx('movie-actors')}>
            <h3>演员</h3>
            <ul className={cx('actors')}>
              <li className={cx('actor')}>
                <div className={cx('actor-avatar')}>
                  <img src='http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p51597.webp' alt='' />
                  <span>导演</span>
                </div>
                <p>伊莱贾·伍德</p>
              </li>
              <li className={cx('actor')}>
                <div className={cx('actor-avatar')}>
                  <img src='http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p11727.webp' alt='' />
                </div>
                <p>西恩·奥斯汀</p>
              </li>
              <li className={cx('actor')}>
                <div className={cx('actor-avatar')}>
                  <img src='http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1453792417.87.webp' alt='' />
                </div>
                <p>伊恩·麦克莱恩</p>
              </li>
              <li className={cx('actor')}>
                <div className={cx('actor-avatar')}>
                  <img src='http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p11727.webp' alt='' />
                </div>
                <p>西恩·奥斯汀</p>
              </li>
              <li className={cx('actor')}>
                <div className={cx('actor-avatar')}>
                  <img src='http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1453792417.87.webp' alt='' />
                </div>
                <p>伊恩·麦克莱恩</p>
              </li>
            </ul>
          </div>
          <div className={cx('movie-comments')}>
            <h3>精彩评论</h3>
            <ul className={cx('comments')}>
              <Comment></Comment>
              <Comment></Comment>
              <Comment></Comment>
              <Comment></Comment>
            </ul>
          </div>
        </main>
      </section>
    )
  }
}