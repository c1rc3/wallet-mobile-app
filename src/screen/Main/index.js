import React from 'react'
import { CommonScreen } from '../commons'
import { Text, Container, Indicator } from '../../component/commons'
import { AppState } from 'react-native'
import authStore, { checkRegistered, lockWallet } from '../../store/auth'
import { AUTH_STATUS } from '../../store/auth/const'
import { SCREEN_IDS } from '../const'
import styles from './styles'
import conf from '../../config'

export default class LaunchScreen extends CommonScreen {
    constructor(props) {
        super(props)
    }
    //verify permission and route screen
    componentDidMount() {
        let mainScreen = SCREEN_IDS.transactionMonitor
        let lastedAuthState = {}
        //check required auth
        if (conf.app.is_auth && 0) {
            //subcribe authStore for handle authStatus
            authStore.subscribe(() => {
                let state = authStore.getState()
                if (lastedAuthState.status === state.status) return
                console.log(state.status)
                switch (state.status) {
                    //authed
                    case AUTH_STATUS.IS_AUTH:
                        /* if lasted auth status is IS_LOCKED => dismiss modal PasscodeRequied
                        ** else => resetTo main sceen
                        */
                        if (lastedAuthState.status === AUTH_STATUS.IS_LOCKED) {
                            this.props.navigator.dismissModal()
                        } else {
                            this.props.navigator.resetTo({
                                screen: mainScreen
                            })
                        }
                        break
                    //not auth
                    case AUTH_STATUS.NOT_AUTH:
                        this.props.navigator.resetTo({
                            screen: SCREEN_IDS.unlock
                        })
                        break
                    //not registerd -> force to set passcode
                    case AUTH_STATUS.NOT_REGISTERED:
                        this.props.navigator.resetTo({
                            screen: SCREEN_IDS.setPasscode
                        })
                        break
                    //app was locked
                    case AUTH_STATUS.IS_LOCKED:
                        this.props.navigator.showModal({
                            screen: SCREEN_IDS.unlock
                        })
                }
                lastedAuthState = {
                    ...state
                }
            })
            //handling app state
            AppState.addEventListener('change', (nextAppState) => {
                if (nextAppState !== 'active' && lastedAuthState.status === AUTH_STATUS.IS_AUTH) {
                    lockWallet()
                }
            })
        } else {
            //reset screen to mainScreen
            this.props.navigator.resetTo({
                screen: mainScreen
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