import { post } from '@libs/net-work'

export const RESET_INVITE = 'RESET_INVITE'
export const SENDING_INVITE = 'SENDING_INVITE'
export const SENDED_INVITE = 'SENDED_INVITE'
export const SEND_INVITE_ERROR = 'SEND_INVITE_ERROR'

export const resetInvite = () => {
  return { type: RESET_INVITE }
}

export const postInvite = ({ name, email, confirmEmail }) => {
  return async (dispatch) => {
    dispatch({ type: SENDING_INVITE })
    let result = await post({
      url: '/prod/fake-auth',
      data: { name, email, confirmEmail }
    })
    let { code, message, data } = result

    if (!!code) {
      dispatch({ type: SEND_INVITE_ERROR, message })
      return result
    }

    dispatch({ type: SENDED_INVITE, data: data })
    return result
  }
}