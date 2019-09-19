import { RESET_INVITE, SENDING_INVITE, SENDED_INVITE, SEND_INVITE_ERROR } from '../action/home'

const initState = {
	loading: false,
	error: false,
	errMsg: '',
	success: false
}

const homeReducer = (state = initState, action) => {
	switch (action.type) {
		case RESET_INVITE: {
			return Object.assign({}, initState)
		}
		case SENDING_INVITE: {
			return Object.assign({}, state, { loading: true })
		}
		case SENDED_INVITE: {
			return Object.assign({}, state, {
				loading: false,
				success: true,
				error: false,
				errMsg: '',
				...action.data
			})
		}
		case SEND_INVITE_ERROR: {
			return Object.assign({}, state, {
				loading: false,
				error: true,
				errMsg: action.message
			})
		}
		default: return state
	}
}

export default homeReducer