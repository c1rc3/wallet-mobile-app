export const Logger = {
    info() {
        console.log(...arguments)
    },
    warn() {
        console.warn(...arguments)
    },
    error() {
        console.warn('[ERROR]', ...arguments)
    }
}

export default Logger