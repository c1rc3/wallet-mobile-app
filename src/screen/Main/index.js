import React from 'react'
import { BaseScreen } from '../commons'
import { Text, Container } from '../../component/commons'
import { SCREEN_OPTIONS } from '../const'
import { AppState } from 'react-native'
import authStore, { checkRegistered, lockWallet } from '../../store/auth'
import { AUTH_STATUS } from '../../store/auth/const'
import { SCREEN_IDS } from '../const'

export default class LaunchScreen extends BaseScreen {
    componentDidMount() {
        let lastedAuthState = {}
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
                            screen: SCREEN_IDS.home,
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
        checkRegistered()
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
    }
    render() {
        return (
            <Container>
                <Text>Loading...</Text>
            </Container>
        )
    }
}