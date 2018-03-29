const _instance = {
    config: {
        is_auth: true,
        app_name: 'Libertas Mobile',
        passcode_length: 6
    }
}

class AppConfig {
    get get() {
        return _instance.config
    }
}

export default new AppConfig()