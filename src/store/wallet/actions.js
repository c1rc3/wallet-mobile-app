import WalletService from '../../service/Wallet'
import { WALLET_ACTION_TYPES } from './const'

export const getListWallets = () => dispatch => {
    return WalletService.getAll(resp => {
        let payload = resp.error ? [] : resp.data
        dispatch({
            type: WALLET_ACTION_TYPES.GET_LIST_SUCCESS,
            payload
        })
        return resp
    })
}