import React from 'react'
import { ScrollContainer, SettingInput, RoundedButton, SettingTitle } from '../../../component/commons'
import CommonNav from '../../../component/navbar/common'
import { CommonScreen } from '../../commons'
import { SCREEN_OPTIONS, SCREEN_IDS } from '../../const'
import { View } from 'react-native'
import icons from '../../../config/icons'

import { CoinInfo, TxMonitorInfo } from '../../../service/TransactionMonitor'
// import tmService, { TxMonitorInfo } from '../../../service/TransactionMonitor'

import styles from '../styles'

class InputAddressScreen extends CommonScreen {
    constructor(props) {
        super(props)
        this.coin = this.props.coin
        this.state = {
            loading: true,
            name: '',
            address: '',
            model: new TxMonitorInfo({
                coin: this.coin
            })
        }
    }
    render() {
        let model = this.state.model
        return (
            <ScrollContainer onSwipeDown={this.props.navigator.dismissModal}>
                <CommonNav
                    title={`Input ${this.coin.shortName} Address`}
                    onBack={() => this.props.navigator.pop()}
                    onRight={() => this.props.navigator.popToRoot()}
                    rightText={'Cancel'} />
                <View style={styles.block}>
                    <View style={styles.block_content}>
                        <SettingInput
                            value={model.name}
                            onChangeText={value => this.changeName(value)}
                            label={'Name'} placeholder={'Enter transaction monitor name'} />
                    </View>
                    <View style={styles.block_content}>
                        <SettingInput
                            value={model.publicKey}
                            onChangeText={value => this.changePublicKey(value)}
                            label={`${this.coin.shortName} Address`}
                            placeholder={`Enter ${this.coin.shortName} address or scan QR code`}
                            rightAction={this.scanQRCode}
                            rightActionIcon={icons.qr}
                        />
                    </View>
                </View>
                <View style={[styles.block, styles.lasted_block]}>
                    <RoundedButton onPress={this.confirm.bind(this)} containerStyle={styles.button_container} text={'NEXT'} />
                </View>
            </ScrollContainer>
        )
    }
    changeName(value) {
        let model = this.state.model
        model.name = value
        this.setState({
            model
        })
    }
    changePublicKey(value) {
        let model = this.state.model
        model.publicKey = value
        this.setState({
            model
        })
    }
    scanQRCode() {

    }
    confirm() {
        this.props.navigator.push({
            screen: SCREEN_IDS.addTransactionMonitorConfirm,
            passProps: {
                coin: this.coin,
                model: this.state.model.serialize
            }
        })
    }
}

export default InputAddressScreen