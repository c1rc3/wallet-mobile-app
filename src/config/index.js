import app from './app'
import lang from './lang'

const _intance = {
    app,
    lang
}

class Config {
    get app() {
        return _intance.app.get
    }
    get lang() {
        return _intance.lang.get
    }
}

export default new Config()