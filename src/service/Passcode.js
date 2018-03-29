import _ from 'lodash'
import { SuccessReponse, ErrorResponse } from '../entity/DataResponse'
import LocalStorage from './LocalStorage'
import conf from '../config'

const PASSCODE = {
    storage_key: {
        passcode: '__USER_PASSCODE',
        passcode_hint: '__USER_PASSCODE_HINT',
    }
}

export const Passcode = {
    set(passcode, hint = '') {
        let validate = Passcode.validate(passcode)
        if (validate.error) {
            return Promise.resolve(validate)
        }
        return Promise.all([
            LocalStorage.setString(PASSCODE.storage_key.passcode, passcode),
            LocalStorage.setString(PASSCODE.storage_key.passcode_hint, hint),
        ]).catch(e => {
            return new ErrorResponse(0, e)
        }).then(resps => {
            let resp = null
            for (let i = 0; i < resps.length; i++) {
                if (resps[i].error) {
                    return resps[i]
                }
                resps[i]
            }
            return new SuccessReponse()
        })
    },
    get() {
        return LocalStorage.getString(PASSCODE.storage_key.passcode)
    },
    verify(passcode) {
        return Passcode.get().then(resp => {
            if (resp.error) {
                return resp
            }
            if (passcode === resp.data) {
                return new SuccessReponse()
            }
            return new ErrorResponse(0, 'passcode is not match')
        })
    },
    getHint() {
        return LocalStorage.getString(PASSCODE.storage_key.passcode_hint)
    },
    validate(passcode) {
        if (_.isString(passcode) && passcode.length === conf.app.passcode_length) {
            return new SuccessReponse()
        }
        return new ErrorResponse(0, `Passcode must be have more than ${conf.app.passcode_length} character`)
    }
}

export default Passcode