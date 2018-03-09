class DataError extends Error {
    constructor(code, message) {
        super(message)
        this.code = code
    }
}

export const ErrorBuilder = {
    basic(errorCode, msg) {
        return new DataError(errorCode, msg)
    }
}


export default ErrorBuilder