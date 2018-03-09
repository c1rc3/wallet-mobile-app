import React from 'react'
import { ScrollView, View } from 'react-native'
import { Container, Text, SettingInput, SettingSelect, RoundedButton, Button } from '../../component/commons'
import ModalNavBar from '../../component/navbar/modal'
import { AreaSpline, Theme } from '../../component/chart'
import TransactionItem from '../../component/transaction-item'
import LinearGradient from 'react-native-linear-gradient'
import { SCREEN_OPTIONS } from '../const'
import icons from '../../config/icons'
import styles from './styles'

export default class CreateNewWallet extends React.Component {
    static navigatorStyle = {
        ...SCREEN_OPTIONS.navBarHidden
    }
    render() {
        return (
            <Container>
                <ModalNavBar onClose={() => this.close()} title={'CREATE NEW WALLET'} />
                <ScrollView>
                    <View style={styles.cnw_block}>
                        <View style={styles.cnw_block_content}>
                            <SettingInput
                                label={'Send to'}
                                placeholder={'Enter the receiver\'s address or scan QR code'}
                                rightAction={() => this.scanQRCode()}
                                rightActionIcon={icons.backspace}
                            />
                            <SettingInput label={'Amount'} placeholder={'0.0'} />
                        </View>
                    </View>
                    <View style={[styles.cnw_block, { marginTop: 50 }]}>
                        <View style={styles.cnw_block_content}>
                            <RoundedButton onPress={() => this.addWallet()} style={[styles.fixed_bottom_button, styles.done_button]} containerStyle={styles.done_button_container} text={'SEND'} />
                        </View>
                    </View>
                </ScrollView>
            </Container>
        )
    }
    scanQRCode() {

    }
    close() {
        this.props.navigator.dismissModal({
            animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
        })
    }
}