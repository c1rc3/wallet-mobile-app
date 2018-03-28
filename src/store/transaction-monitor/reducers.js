import { TX_MONITOR_ACTION_TYPES } from './const'

const initialState = {
    items: []
}

function txMonitor(state = initialState, action = {}) {
    switch (action.type) {
        case TX_MONITOR_ACTION_TYPES.ADD_SUCCESS:
            return {
                ...state,
                items: [...state.items, action.payload]
            }
        case TX_MONITOR_ACTION_TYPES.UPDATE_SUCCESS:
            {
                let updated = action.payload
                let idx = state.items.findIndex(w => w.id === updated.id)
                let items = state.items
                if (idx >= 0) {
                    items = [
                        ...items.slice(0, idx),
                        updated,
                        ...items.slice(idx + 1),
                    ]
                }
                return {
                    ...state,
                    items
                }
            }
        case TX_MONITOR_ACTION_TYPES.GET_LIST_SUCCESS:
            return {
                ...state,
                items: action.payload || []
            }
        case TX_MONITOR_ACTION_TYPES.REMOVE_SUCCESS:
            return {
                ...state,
                items: state.items.filter(item => item.id != action.payload)
            }
        default:
            return state
    }
}

export default txMonitor