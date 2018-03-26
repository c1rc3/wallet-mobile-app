import React from 'react'
import { ScrollContainer, SettingInput, RoundedButton, RoundedStrokeButton, NavButton } from '../../component/commons'
import ModalNav from '../../component/navbar/modal'
import { CommonScreen } from '../commons'
import { SCREEN_OPTIONS, SCREEN_IDS } from '../const'
import { View } from 'react-native'
import icons from '../../config/icons'

import { TransactionMonitorInfo } from '../../service/TransactionMonitor'

import styles from './styles'

class EditTransactionMonitorScreen extends CommonScreen {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            model: new TransactionMonitorInfo()
        }
    }
    render() {
        let model = this.state.model
        return (
            <ScrollContainer onSwipeDown={this.props.navigator.dismissModal}>
                <ModalNav
                    title={'Edit Address'}
                    onClose={this.props.navigator.dismissModal}
                    renderRight={<NavButton text={'Save'} />} />
                <View style={styles.block}>
                    <View style={styles.block_content}>
                        <SettingInput
                            value={model.name}
                            onChangeText={value => this.changeName(value)}
                            label={'Name'} placeholder={'Enter transaction monitor name'} />
                    </View>
                </View>
                <View style={styles.lasted_block}>
                    <RoundedStrokeButton onPress={this.confirm.bind(this)} containerStyle={styles.button_container} text={'Remove Address'} />
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
    }
}

export default EditTransactionMonitorScreen