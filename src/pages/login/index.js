import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import { Button, Row, Form, Input, Checkbox, Icon } from 'antd'
import styles from './styles.less'

const cx = classNames.bind(styles)
const FormItem = Form.Item

class Login extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() { }

  render() {
    console.log(this.props)
    let { form: { getFieldDecorator } } = this.props
    return (
      <div className={cx('container')}>
        <div className={cx('content')}>
          <div className={cx('top')}>
            <div className={cx('header')}>
              <img className={cx('logo')} alt='logo' src='http://antd-admin.zuiidea.com/public/logo.svg' />
              <span className={cx('title')}>雄威供应链</span>
            </div>
            <div className={cx('desc')}>雄威供应链</div>
          </div>
          <div className={cx('main')}>
            <form className={cx('login')}>
              <FormItem hasFeedback>
                {getFieldDecorator('username', { rules: [{ required: true, message: '用户名不能为空' }] })(
                  <Input
                    prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
                    size='large' onPressEnter={this.handleOk} placeholder='用户名' />
                )}
              </FormItem>
              <FormItem hasFeedback>
                {getFieldDecorator('password', { rules: [{ required: true, message: '密码不能为空' }] })(
                  <Input
                    prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                    size='large' type='password' onPressEnter={this.handleOk} placeholder='密码' />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('remember', { valuePropName: 'checked', initialValue: true })(
                  <Checkbox>自动登录</Checkbox>
                )}
                <a className='login-form-forgot' href='' style={{ float: 'right' }}>忘记密码</a>
              </FormItem>
              <Row><Button className={cx('btn-submit')} size='large' type='primary' onClick={this.handleOk} loading={false}>登&nbsp;录</Button></Row>

              {/* <Row><Button className={cx('btn-submit')} size='large' type='primary' onClick={this.getToken} loading={false}>登&nbsp;录</Button></Row> */}
            </form>
          </div>

        </div>
        <div className={cx('footer')}></div>
      </div>
    )
  }
}

Login.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Form.create({ name: 'normal_login' })(Login)

