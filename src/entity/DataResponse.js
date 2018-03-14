import Logger from '../util/Logger'
import errorBuilder from './Error'

export class DataResponse {
    static error(error) {
        return new DataResponse(null, error)
    }
    static success(data) {
        return new DataResponse(data)
    }
    constructor(data, error = false) {
        this.error = error
        this.data = data
    }
    set error(value) {
        if (value instanceof Error) {
            this._error = value
            Logger.error(value.toString())
        }
    }
    get error() {
        return this._error
    }
    get errorMsg() {
        if (this._error) {
            return this._error.message
        }
        return ''
    }
}

export class SuccessReponse extends DataResponse {
    constructor(data) {
        super(data)
    }
}

export class ErrorResponse extends DataResponse {
    constructor(msg, code) {
        //gen error
        super(null, errorBuilder.basic(code, msg))
    }
}

export default DataResponse