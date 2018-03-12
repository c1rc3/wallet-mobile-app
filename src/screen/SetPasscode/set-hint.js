import React from 'react'
import View from 'react-native'
import { Text, Input, Button, Container, Alert } from '../../component/commons'
import { BaseScreen } from '../commons'
import { SCREEN_OPTIONS } from '../const'
import PasscodeHintComp from '../../component/passcode/passcode-hint'
import Passcode from '../../service/Passcode'
import conf from '../../config'
import { setPasscode } from '../../store/auth'
import Navigation from 'react-native-navigation'

export class SetHintScreen extends BaseScreen {
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
                <PasscodeHintComp
                    ref={ref => this.passcodeHintRef = ref}
                    onSubmit={val => this.onSubmit(val)}
                    onSkip={() => this.onSubmit()}
                    title={'Enter your hint'} />
            </Container>
        )
    }
    onSubmit(value) {
        setPasscode(this.props.passcode, value).then(resp => {
            if (resp.error) {
                Alert.alert('Set Passcode fail', resp.errorMsg)
            } else {
                Alert.alert('Set passcode success')
            }
        })
    }
}

export default SetHintScreen