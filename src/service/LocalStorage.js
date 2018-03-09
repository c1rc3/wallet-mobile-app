import { AsyncStorage } from 'react-native'
import { SuccessReponse, ErrorResponse } from '../entity/DataResponse'
import _ from 'lodash'

const getItem = (key, parser) => {
    return new Promise(resolve => {
        AsyncStorage.getItem(key, (error, result) => {
            if (error) {
                resolve(new ErrorResponse(error))
            }
            if (result != null) {
                try {
                    resolve(new SuccessReponse(_.isFunction(parser) ? parser(result) : result))
                } catch (ex) {
                    resolve(new ErrorResponse(ex))
                }
            } else {
                resolve(new ErrorResponse(new Error(`Key=${key} is not existed`), 'GET', 'LocalStorage'))
            }
        })
    })
}

const setItem = (key, value) => {
    return new Promise(resolve => {
        AsyncStorage.setItem(key, value, (error) => {
            if (error) {
                resolve(new ErrorResponse(error))
            }
            resolve(new SuccessReponse())
        })
    })
}

export const LocalStorageService = {
    getObject(key) {
        return getItem(key, JSON.parse)
    },
    setObject(key, object) {
        return setItem(key, JSON.stringify(object))
    },
    getString(key) {
        return getItem(key)
    },
    setString(key, value) {
        return setItem(key, value)
    }
}

export default LocalStorageService