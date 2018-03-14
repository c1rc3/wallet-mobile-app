class DataError extends Error {
    constructor(code, message) {
        super(message)
        this.code = code
    }
}

export const errorBuilder = {
    basic: (errorCode, msg) => {
        return new DataError(errorCode, msg)
    }
}

export default errorBuilder