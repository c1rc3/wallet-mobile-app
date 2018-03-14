import WalletService, { WalletInfo } from '../../service/Wallet'
import { ErrorResponse } from '../../entity/DataResponse'
import { WALLET_ACTION_TYPES } from './const'

export const getListWallets = () => dispatch => {
    return WalletService.getAll().then(resp => {
        let payload = resp.error ? [] : resp.data
        dispatch({
            type: WALLET_ACTION_TYPES.GET_LIST_SUCCESS,
            payload
        })
        return resp
    })
}

export const addWallet = (wallet) => dispatch => {
    if (wallet instanceof WalletInfo) {
        return WalletService.addWallet(wallet.serialize).then(resp => {
            if (!resp.error) {
                let payload = new WalletInfo(resp.data)
                dispatch({
                    type: WALLET_ACTION_TYPES.CREATE_SUCCESS,
                    payload
                })
            }
            return resp
        })
    } else {
        return Promise.resolve(new ErrorResponse(new Error('input is not instance of WalletInfo')))
    }
}

export const updateWallet = (wallet) => dispatch => {
    if (wallet instanceof WalletInfo) {
        return WalletService.updateWallet(wallet.id, wallet.serialize).then(resp => {
            if (!resp.error) {
                let payload = new WalletInfo(resp.data)
                dispatch({
                    type: WALLET_ACTION_TYPES.UPDATE_SUCCESS,
                    payload
                })
            }
            return resp
        })
    } else {
        return Promise.resolve(new ErrorResponse(new Error('input is not instance of WalletInfo')))
    }
}

export const deleteWallet = (id) => dispatch => {
    return WalletService.delete(id).then(resp => {
        if (!resp.error) {
            dispatch({
                type: WALLET_ACTION_TYPES.DELETE_SUCCESS,
                payload: id
            })
        }
        return resp
    })
}

export const getWallet = (id) => {
    return WalletService.get(id).then(resp => {
        if (!resp.error) {
            resp.data = new WalletInfo(resp.data)
        }
        return resp
    })
}