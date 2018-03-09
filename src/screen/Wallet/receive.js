import React from 'react'
import { ScrollView, View } from 'react-native'
import { Container, SettingInput, QRCodeViewer } from '../../component/commons'
import ModalNavBar from '../../component/navbar/modal'
import { SCREEN_OPTIONS } from '../const'
import styles from './styles'

export default class CreateNewWallet extends React.Component {
    static navigatorStyle = {
        ...SCREEN_OPTIONS.navBarHidden
    }
    render() {
        return (
            <Container>
                <ModalNavBar onClose={() => this.close()} title={'RECEIVE'} />
                <ScrollView>
                    <View style={styles.cnw_block}>
                        <View style={styles.cnw_block_content}>
                            <SettingInput label={'Amount'} value={0} placeholder={'0.0'} />
                        </View>
                    </View>
                    <View style={styles.qrcode_container}>
                        <QRCodeViewer title={'WALLET A'} value={'f77e101a57056e250f75a6018c6eaaa5a8df736e'} />
                    </View>
                </ScrollView>
            </Container>
        )
    }
    close() {
        this.props.navigator.dismissModal({
            animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
        })
    }
}