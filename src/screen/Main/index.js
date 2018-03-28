import React from 'react'
import { CommonScreen } from '../commons'
import { Text, Container, Indicator } from '../../component/commons'
import { SCREEN_OPTIONS } from '../const'
import { AppState } from 'react-native'
import authStore, { checkRegistered, lockWallet } from '../../store/auth'
import { AUTH_STATUS } from '../../store/auth/const'
import { SCREEN_IDS } from '../const'
import JailMonkey from 'jail-monkey'
import styles from './styles'

console.warn('isJailBroken', JailMonkey.isJailBroken())

export default class LaunchScreen extends CommonScreen {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        // let mainScreen = SCREEN_IDS.main
        let mainScreen = SCREEN_IDS.transactionMonitor
        let lastedAuthState = {}
        if (authStore.getState().is_auth) {
            authStore.subscribe(() => {
                let state = authStore.getState()
                if (lastedAuthState.status === state.status) return
                switch (state.status) {
                    case AUTH_STATUS.IS_AUTH:
                        if (lastedAuthState.status === AUTH_STATUS.IS_LOCKED) {
                            this.props.navigator.dismissModal({
                                animationType: 'slide-down'
                            })
                        } else {
                            this.props.navigator.resetTo({
                                screen: mainScreen,
                                title: 'HOME',
                                navigatorStyle: {
                                    ...SCREEN_OPTIONS.navBarHidden
                                },
                                animationType: 'slide-down'
                            })
                        }
                        break
                    case AUTH_STATUS.NOT_AUTH:
                        this.props.navigator.resetTo({
                            screen: SCREEN_IDS.unlock,
                            title: 'Login',
                            navigatorStyle: {
                                ...SCREEN_OPTIONS.navBarHidden
                            },
                            animationType: 'slide-down'
                        })
                        break
                    case AUTH_STATUS.NOT_REGISTERED:
                        this.props.navigator.resetTo({
                            screen: SCREEN_IDS.setPasscode,
                            title: 'SET PASSCODE',
                            navigatorStyle: {
                                ...SCREEN_OPTIONS.navBarHidden
                            },
                            animationType: 'slide-down'
                        })
                    case AUTH_STATUS.IS_LOCKED:
                        this.props.navigator.showModal({
                            screen: SCREEN_IDS.unlock,
                            title: 'Login',
                            navigatorStyle: {
                                ...SCREEN_OPTIONS.navBarHidden
                            },
                            animationType: 'slide-down'
                        })
                }
                lastedAuthState = {
                    ...state
                }
            })
            //handling app state
            let lastedAppState = AppState.currentState
            AppState.addEventListener('change', (nextAppState) => {
                if (lastedAppState.match(/inactive|background/) && nextAppState === 'active') {
                    lockWallet()
                    console.log('App has come to the foreground!')
                    //unlock app
                } else if (lastedAuthState.status === AUTH_STATUS.IS_AUTH) {
                    // lockWallet()
                    // console.log()
                    //lock app
                }
                lastedAppState = AppState.currentState
            })
        } else {
            this.props.navigator.resetTo({
                screen: mainScreen,
                title: 'HOME',
                navigatorStyle: {
                    ...SCREEN_OPTIONS.navBarHidden
                },
                animationType: 'slide-down'
            })
        }
        checkRegistered()
    }
    render() {
        return (
            <Container style={styles.container}>
                <Indicator />
                <Text style={styles.loading}>Loading...</Text>
            </Container>
        )
    }
}