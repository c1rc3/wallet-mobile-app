import TMService, { TxMonitorInfo } from '../../service/TransactionMonitor'
import { ErrorResponse } from '../../entity/DataResponse'
import { TX_MONITOR_ACTION_TYPES } from './const'

export const getList = () => dispatch => {
    return TMService.getAll().then(resp => {
        let payload = resp.error ? [] : resp.data
        dispatch({
            type: TX_MONITOR_ACTION_TYPES.GET_LIST_SUCCESS,
            payload
        })
        return resp
    })
}

export const add = (txMonitor) => dispatch => {
    if (txMonitor instanceof TxMonitorInfo) {
        return TMService.add(txMonitor.serialize).then(resp => {
            if (!resp.error) {
                let payload = new TxMonitorInfo(resp.data)
                dispatch({
                    type: TX_MONITOR_ACTION_TYPES.ADD_SUCCESS,
                    payload
                })
            }
            return resp
        })
    } else {
        return Promise.resolve(new ErrorResponse(new Error('input is not instance of txMonitorInfo')))
    }
}

export const update = (txMonitor) => dispatch => {
    if (txMonitor instanceof TxMonitorInfo) {
        return TMService.update(txMonitor.id, txMonitor.serialize).then(resp => {
            if (!resp.error) {
                let payload = new TxMonitorInfo(resp.data)
                dispatch({
                    type: TX_MONITOR_ACTION_TYPES.UPDATE_SUCCESS,
                    payload
                })
            }
            return resp
        })
    } else {
        return Promise.resolve(new ErrorResponse(new Error('input is not instance of txMonitorInfo')))
    }
}

export const remove = (id) => dispatch => {
    return TMService.delete(id).then(resp => {
        if (!resp.error) {
            dispatch({
                type: TX_MONITOR_ACTION_TYPES.REMOVE_SUCCESS,
                payload: id
            })
        }
        return resp
    })
}

export const get = (id) => {
    return TMService.get(id).then(resp => {
        if (!resp.error) {
            resp.data = new TxMonitorInfo(resp.data)
        }
        return resp
    })
}