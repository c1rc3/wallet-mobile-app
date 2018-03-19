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
                <ScrollView style={styles.container}>
                    <SettingAction icon={icons.key2} text={'Security'} />
                    <SettingAction icon={icons.bell} text={'Notifications'} />
                    <SettingAction icon={icons.cloud_up} text={'Backup'} />
                    <SettingAction icon={icons.cloud_down} text={'Restore'} />
                    <SettingAction icon={icons.smartphone} text={'Change Device'} />
                    <SettingAction icon={icons.widget} text={'Widget'} />
                    <SettingAction icon={icons.factory} text={'Factory Reset'} caret={false} />
                </ScrollView>
            </Container>
        )
    }
}