import app from './app'

const _intance = {
    app
}

class Config {
    get app() {
        return _intance.app.get
    }
}

export default new Config()