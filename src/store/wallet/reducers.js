import { WALLET_ACTION_TYPES } from './const'

const initialState = {
    wallets: []
}

function wallet(state = initialState, action = {}) {
    switch (action.type) {
        case WALLET_ACTION_TYPES.CREATE_SUCCESS:
            return {
                ...state,
                wallets: [...state.wallets, action.payload]
            }
        case WALLET_ACTION_TYPES.UPDATE_SUCCESS:
            {
                let updatedWallet = action.payload
                let oldWallet = state.wallets.find(w => w.id === updatedWallet.id)
                if (oldWallet) {
                    oldWallet.updateInfo(updatedWallet)
                } else {
                    return {
                        ...state,
                        wallets: [...state.wallets, updatedWallet]
                    }
                }
                return state
            }
        case WALLET_ACTION_TYPES.GET_LIST_SUCCESS:
            return {
                ...state,
                wallets: action.payload || []
            }
        default:
            return state
    }
}

export default wallet