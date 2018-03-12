import React, { Component } from 'react'
import styles from './styles'
import { Container, ScrollView, SettingAction } from '../../component/commons'
import CommonNavBar from '../../component/navbar/common'
import { SCREEN_OPTIONS } from '../const'
import icons from '../../config/icons'

export default class SettingsScreen extends Component {
    static navigatorStyle = {
        ...SCREEN_OPTIONS.navBarHidden
    }
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <Container>
                <CommonNavBar onBack={() => this.props.navigator.pop()} title={'SETTINGS'} />
                <ScrollView>
                    <SettingAction icon={icons.backspace} text={'Security'} />
                    <SettingAction icon={icons.backspace} text={'Notifications'} />
                    <SettingAction icon={icons.backspace} text={'Transaction Category'} />
                    <SettingAction icon={icons.backspace} text={'Backup'} />
                    <SettingAction icon={icons.backspace} text={'Restore'} />
                    <SettingAction icon={icons.backspace} text={'Change Device'} />
                    <SettingAction icon={icons.backspace} text={'Widget'} />
                    <SettingAction icon={icons.backspace} text={'Factory Reset'} caret={false} />
                </ScrollView>
            </Container>
        )
    }
}