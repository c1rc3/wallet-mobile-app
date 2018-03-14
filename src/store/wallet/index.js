import { createStore, applyMiddleware } from 'redux'
import * as actions from './actions'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import reducer from './reducers'

const walletStore = createStore(reducer, applyMiddleware(thunk, logger))

export const getListWallets = () => walletStore.dispatch(actions.getListWallets())
// export const setPasscode = (passcode, hint) => authStore.dispatch(actions.setPasscode(passcode, hint))
// export const unlock = (passcode) => authStore.dispatch(actions.unlockWallet(passcode))
// export const lockWallet = () => authStore.dispatch(actions.lockWallet())
// export const getHint = () => actions.getHint()

export default walletStore