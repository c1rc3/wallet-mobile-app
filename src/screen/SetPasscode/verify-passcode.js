import React from 'react'
import View from 'react-native'
import { Text, Input, Button, Container, Alert } from '../../component/commons'
import { CommonScreen } from '../commons'
import PasscodeComp from '../../component/passcode'
import Passcode from '../../service/Passcode'
import conf from '../../config'
import Navigation from 'react-native-navigation'
import { SCREEN_IDS, SCREEN_OPTIONS } from '../const'

export class VerifyPasscodeScreen extends CommonScreen {
    static navigatorStyle = {
        ...SCREEN_OPTIONS.navBarHidden
    }
    constructor(props) {
        super(props)
        this.state = {
            passcode: ''
        }
    }
    render() {
        return (
            <Container>
                <PasscodeComp
                    ref={ref => this.passcodeRef = ref}
                    onSubmit={val => this.onSubmit(val)}
                    title={'Verify your passcode'} />
            </Container>
        )
    }
    onSubmit(value) {
        if (value === this.props.passcode) {
            this.props.navigator.push({
                screen: SCREEN_IDS.setPasscodeHint,
                passProps: {
                    passcode: value
                }
            })
        } else {
            this.passcodeRef.resetPasscode()
        }
    }
}

export default VerifyPasscodeScreen