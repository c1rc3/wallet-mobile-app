import Logger from '../../util/Logger'

const _instance = {
    id: '',
    data: {}
}
class LanguageConfig {
    constructor(langId) {
        if (langId) {
            this.set(langId)
        }
    }
    get langId() {
        return _instance.id
    }
    set(langId) {
        try {
            let newLangObj = require(`./${langId}`)
            _instance.data = newLangObj
            _instance.id = langId
        } catch (e) {
            Logger.error('Load language fail', e)
        }
    }
    get get() {
        return _instance.data
    }
}

export default new LanguageConfig('en')