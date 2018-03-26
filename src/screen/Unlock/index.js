import React from 'react'
import { Text, Input, Button, Container, Alert } from '../../component/commons'
import { CommonScreen } from '../commons'
import PasscodeComp from '../../component/passcode'
import conf from '../../config'
import { unlock, getHint } from '../../store/auth'

export class HomeScreen extends CommonScreen {
    static navigatorStyle = {
        // navBarHidden: true
    }
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <Container>
                <PasscodeComp
                    onSubmit={value => this.onSubmit(value)}
                    ref={ref => this.passcodeRef = ref}
                    title={'Enter passcode to unlock!'} />
            </Container>
        )
    }
    onSubmit(passcode) {
        unlock(passcode).then(resp => {
            if (resp.error) {
                Alert.alert(resp.errorMsg)
                this.passcodeRef.resetPasscode()
                getHint().then(hintResp => {
                    if (!hintResp.error && hintResp.data) {
                        this.passcodeRef.setHint(hintResp.data)
                    }
                })
            }
        })
    }
}

export default HomeScreen