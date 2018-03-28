import { createStore, applyMiddleware } from 'redux'
import * as actions from './actions'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import reducer from './reducers'

const txMonitorStore = createStore(reducer, applyMiddleware(thunk, logger))

export const getListTxMonitors = () => txMonitorStore.dispatch(actions.getList())
export const getTxMonitor = id => actions.get(id)
export const updateTxMonitor = info => txMonitorStore.dispatch(actions.update(info))
export const addTxMonitor = info => txMonitorStore.dispatch(actions.add(info))
export const deleteTxMonitor = id => txMonitorStore.dispatch(actions.remove(id))

export default txMonitorStore