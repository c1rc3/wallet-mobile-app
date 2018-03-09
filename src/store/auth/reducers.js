import { AUTH_ACTION_TYPES, AUTH_STATUS } from './const'

const initialState = {
    status: AUTH_STATUS.CHECKING_REGISTERED
}

function auth(state = initialState, action = {}) {
    switch (action.type) {
        case AUTH_ACTION_TYPES.UNLOCK_SUCCESS:
            return {
                ...state,
                status: AUTH_STATUS.IS_AUTH
            }
        case AUTH_ACTION_TYPES.UNLOCK_FAIL:
            return {
                ...state,
                status: AUTH_STATUS.NOT_AUTH
            }
        case AUTH_ACTION_TYPES.SET_PASSCODE_SUCCESS:
            return {
                ...state,
                status: AUTH_STATUS.IS_AUTH
            }
            break
        case AUTH_ACTION_TYPES.CHECK_REGISTERED:
            return {
                ...state,
                status: action.registered ? AUTH_STATUS.NOT_AUTH : AUTH_STATUS.NOT_REGISTERED
            }
        case AUTH_ACTION_TYPES.LOCK_WALLET:
            return {
                ...state,
                status: AUTH_STATUS.IS_LOCKED
            }
        default:
            return state
    }
    return state
}

export default auth