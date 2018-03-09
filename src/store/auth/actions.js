import { AUTH_ACTION_TYPES } from './const'
import Passcode from '../../service/Passcode'

export const unlockWallet = passcode => dispatch => {
    return Passcode.verify(passcode).then(resp => {
        if (resp.error) {
            dispatch({
                type: AUTH_ACTION_TYPES.UNLOCK_FAIL
            })
        } else {
            dispatch({
                type: AUTH_ACTION_TYPES.UNLOCK_SUCCESS
            })
        }
        return resp
    })
}

export const getHint = Passcode.getHint

export const setPasscode = (passcode, hint) => dispatch => {
    return Passcode.set(passcode, hint).then(resp => {
        dispatch({
            type: AUTH_ACTION_TYPES.SET_PASSCODE_SUCCESS,
            registered: !resp.error
        })
        return resp
    })
}

export const checkRegistered = () => dispatch => {
    return Passcode.get().then(resp => {
        dispatch({
            type: AUTH_ACTION_TYPES.CHECK_REGISTERED,
            registered: !resp.error
        })
        return resp
    })
}

export const lockWallet = () => {
    return {
        type: AUTH_ACTION_TYPES.LOCK_WALLET
    }
}