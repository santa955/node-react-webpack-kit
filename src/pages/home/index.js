import React from 'react'
import classNames from 'classnames/bind'
import { connect } from 'react-redux'
import moment from 'moment'
import Modal from '@components/modal'
import { resetInvite, postInvite } from '@redux/action/home'
import styles from './styles.styl'

const cx = classNames.bind(styles)

@connect(state => ({
  home: state.home
}))
export default class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showInviteModal: false,
      fullName: '',
      email: '',
      confirmEmail: '',
      error: {}
    }

    this.fields = [
      { placeHolder: 'Full name', name: 'fullName', type: 'text' },
      { placeHolder: 'Email', name: 'email', type: 'email' },
      { placeHolder: 'Confirm email', name: 'confirmEmail', type: 'email' },
    ]
  }

  onShowIniviteModal = () => {
    this.setState({ showInviteModal: true })
  }

  onHideIniviteModal = () => {
    let { dispatch } = this.props
    dispatch(resetInvite())
    this.setState({
      showInviteModal: false,
      fullName: '',
      email: '',
      confirmEmail: '',
      error: {}
    })
  }

  onValidFields = field => {
    let { fullName, email, confirmEmail } = this.state

    if ('fullName' === field) {
      return fullName.trim().length >= 3
    } else if ('confirmEmail' === field) {
      return email === confirmEmail && !!confirmEmail.length
    } else if ('email' === field) {
      return /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/.test(email)
    }

    return true
  }

  onChange = e => {
    let { target: { value, name } } = e
    let { error } = this.state
    this.setState({ [name]: value, error: { ...error, [name]: false } })
  }

  onSubmit = async () => {
    let { fields } = this
    let { dispatch, home: { loading } } = this.props
    let { fullName, email, confirmEmail, error } = this.state
    let valid = true
    let err = {}

    if (loading) return

    for (const field of fields) {
      let { name } = field
      if (!this.onValidFields(name)) {
        valid = false
        err[name] = true
      } else {
        err[name] = false
      }
    }

    if (!valid) {
      this.setState({ error: { ...error, ...err } })
      return
    }

    dispatch(postInvite({
      name: fullName,
      email,
      confirmEmail
    }))
  }

  renderForm = () => {
    let { fields, state } = this
    let { error } = state

    return fields.map(field => {
      return (
        <input
          key={field.name}
          className={cx({ error: error[field.name] })}
          type={field.type}
          name={field.name}
          placeholder={field.placeHolder}
          value={state[field[name]]}
          autoComplete='off'
          onChange={this.onChange} />
      )
    })
  }

  render () {
    let { showInviteModal } = this.state
    let { home: { loading, success, error, errMsg } } = this.props

    return (
      <React.Fragment>
        <div className={cx('home-wrapper')}>
          <p className={cx('intro')}>A better way <br /> to enjoy every day.</p>
          <p className={cx('desc')}>Be the first to know when we launch.</p>
          <button className={cx('btn-request')} onClick={this.onShowIniviteModal}>Request an invite</button>
          {moment().format('YYYY/MM/DD HH:mm:ss')}
        </div>
        <Modal
          visible={showInviteModal}
          onCancel={this.onHideIniviteModal}>
          <div className={cx('modal-invite')}>
            <h1 className={cx('invite-title')}>{success ? 'All done!' : 'Request an invite'}</h1>
            <div className={cx('invite-body')}>
              {success
                ? <p>You will be one of the first to experience <br /> yandan66.com. when we launch.</p>
                : this.renderForm()
              }
              <button
                className={cx('invite-submit')}
                onClick={success ? this.onHideIniviteModal : this.onSubmit}>
                {success
                  ? 'OK'
                  : loading
                    ? 'Sending, Please wait...'
                    : 'Send'
                }
              </button>
              {error && <p className={cx('invite-err-tip')}>{errMsg}</p>}
            </div>
          </div>
        </Modal>
      </React.Fragment>
    )
  }
}