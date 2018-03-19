import { createStore, applyMiddleware } from 'redux'
import { WalletInfo } from '../../service/Wallet'
import * as actions from './actions'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import reducer from './reducers'

const walletStore = createStore(reducer, applyMiddleware(thunk, logger))

export const getListWallets = () => walletStore.dispatch(actions.getListWallets())
export const getWallet = id => actions.getWallet(id)
export const updateWallet = info => walletStore.dispatch(actions.updateWallet(info))
export const addWallet = info => walletStore.dispatch(actions.addWallet(info))
export const deleteWallet = id => walletStore.dispatch(actions.deleteWallet(id))

export {
    WalletInfo
}

export default walletStore