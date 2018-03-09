import _ from 'lodash'
import axios from 'axios'

import { SuccessResponse, ErrorResponse } from '../entity/DataResponse'
import Logger from '../util/Logger'
import { number, func } from '../util/Commons'
axios.defaults.withCredentials = false

const HTTP_METHOD = {
    get: 'get',
    post: 'post',
    delete: 'delete',
    put: 'put'
}

export const Http = {
    _queue_process_success: [],
    _queue_process_fail: [],
    onSuccess(callback) {
        if (Http._queue_process_success.indexOf(callback) < 0) {
            Http._queue_process_success.push(callback)
        }
    },
    offSuccess(callback) {
        Http._queue_process_success = Http._queue_process_success.filter(func => func != callback)
    },
    onFail(callback) {
        if (Http._queue_process_fail.indexOf(callback) < 0) {
            Http._queue_process_fail.push(callback)
        }
    },
    offFail(callback) {
        Http._queue_process_fail = Http._queue_process_fail.filter(func => func != callback)
    },
    processHttp(method, url, data, config) {
        Logger.info(`[${method.toUpperCase()}] ${url}`, data)
        const request = axios.request({
            method: method,
            url: url,
            data: data,
            ...config,
            withCredentials: false
        })
        return request.then(response => {
            let resp = null
            if (_.isObject(response) && _.isObject(response.data) && number.between(response.status, 200, 299)) {
                if (response.data.error) {
                    resp = new ErrorResponse(response.data.error, response.data)
                } else {
                    resp = new SuccessResponse(response.data)
                }
            } else {
                resp = new ErrorResponse(response.status, response)
            }

            if (resp.error) {
                func.executeFuncQueues(this._queue_process_success, resp)
            } else {
                func.executeFuncQueues(this._queue_process_fail, resp)
            }

            return resp
        }).catch(errorResp => {
            let resp = new ErrorResponse(errorResp.response.status, errorResp.response)
            func.executeFuncQueues(this._queue_process_fail, resp)

            return Promise.resolve(resp)
        })
    },
    get: (url, config) => Http.processHttp(HTTP_METHOD.get, url, config),
    post: (url, data, config) => Http.processHttp(HTTP_METHOD.post, url, data, config),
    put: (url, data, config) => Http.processHttp(HTTP_METHOD.put, url, data, config),
    delete: (url, config) => Http.processHttp(HTTP_METHOD.delete, url, config)
}

export default Http