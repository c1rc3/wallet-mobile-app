
import React from 'react'
import { ScrollContainer, Alert, Touchable, SettingInput, RoundedButton, DashedButton, SettingTitle, SettingDesc, RoundedInput, RoundedStrokeButton } from '../../../component/commons'
import ModalNav from '../../../component/navbar/modal'
import CoinTokenItem from '../../../component/coin-token-item'
import { CommonScreen } from '../../commons'
import { SCREEN_OPTIONS, SCREEN_IDS } from '../../const'
import { View, FlatList, Linking } from 'react-native'
import icons from '../../../config/icons'
import { updateTxMonitor, deleteTxMonitor, getTxMonitor } from '../../../store/transaction-monitor'

import { TxMonitorInfo, CoinInfo, TokenInfo } from '../../../service/TransactionMonitor'

import styles from '../styles'

class EditTransactionMonitorScreen extends CommonScreen {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            tokens: [],
            filterTokens: '',
            model: new TxMonitorInfo()
        }

        // this.model = new TxMonitorInfo(this.props.model)
        this.coin = new CoinInfo(this.props.coin)
        // this.state.model.tokens = []
        console.log('AddTransactionMonitorScreen', this.props.coin)
    }
    componentDidMount() {
        getTxMonitor(this.props.id).then(resp => {
            console.log(resp)
            if (resp.error) {
                Alert.alert('Get Transaction monitor fail', resp.errorMsg)
            } else {
                this.setState({
                    model: resp.data,
                    tokens: resp.data.tokens
                })
            }
        })
    }
    onSuccess(e) {
        Linking
            .openURL(e.data)
            .catch(err => console.error('An error occured', err))
    }
    render() {
        let model = this.state.model
        return (
            <ScrollContainer onSwipeDown={this.props.navigator.dismissModal}>
                <ModalNav
                    title={'Select tokens'}
                    onClose={this.props.navigator.dismissModal}
                    onRight={this.confirm.bind(this)}
                    rightText={'Save'} />
                <View style={styles.block}>
                    <View style={styles.block_content}>
                        <SettingInput
                            value={model.name}
                            onChangeText={value => this.changeName(value)}
                            label={'Name'} placeholder={'Enter transaction monitor name'} />
                    </View>
                </View>
                <View style={styles.block}>
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
                <View style={styles.block}>
                    <View style={styles.block_content}>
                        <SettingInput
                            editable={false}
                            value={model.name}
                            label={'Coin / Platform'} />
                    </View>
                </View>
                <View style={[styles.block, styles.lasted_block]}>
                    <View style={styles.block_content}>
                        <SettingTitle text={'TOKENS'} rightLabel={`${model.tokens.length} tokens`} />
                        <SettingDesc text={'Please choose Tokens to add for monitoring.'} />
                    </View>
                    {this.state.model.tokens.length ? <View style={styles.search_input_container_confirm}>
                        <RoundedInput
                            value={this.state.filterTokens}
                            onChangeText={value => this.filter(value)}
                            placeholder={'Search...'}
                        />
                    </View> : null}
                    {this.state.tokens.map((item, key) => this.renderItem(item, key))}
                    <View style={styles.search_input_container_confirm}>
                        <DashedButton onPress={this.selectTokens.bind(this)} icon={icons.new_chat} text={'+ Add more'} />
                    </View>
                </View>
                <View style={[styles.block, styles.lasted_block]}>
                    <RoundedStrokeButton onPress={this.delete.bind(this)} containerStyle={styles.button_container} text={'Delete'} />
                </View>
            </ScrollContainer>
        )
    }
    keyExtractor = (item, index) => index
    filter(value = '') {
        this.setState({
            loading: false,
            filterTokens: value,
            tokens: value ? this.state.model.tokens.filter(item => item.name.toLowerCase().indexOf(value.toLowerCase()) >= 0) : this.state.model.tokens
        })
    }
    renderItem(item, key) {
        return (
            <CoinTokenItem
                onPress={() => this.uncheckItem(item)}
                checked={true}
                name={item.name || item.slug || item.symbol}
                key={key} />
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
    uncheckItem(item) {
        console.log(this.state.model.tokens)
        this.state.model.tokens = this.state.model.tokens.filter(i => i.id !== item.id)
        console.log(this.state.model.tokens)
        this.setState({
            model: this.state.model
        }, () => {
            this.filter(this.state.filterTokens)
        })
    }
    scanQRCode() {

    }
    updateTokens(tokens = []) {
        this.state.model.tokens = tokens
        this.setState({
            tokens: this.state.model.tokens,
            filterTokens: '',
            model: this.state.model
        })
    }
    selectTokens() {
        this.props.navigator.showModal({
            screen: SCREEN_IDS.addTransactionMonitorSelectToken,
            passProps: {
                coin: this.props.coin,
                tokens: this.state.model.tokens,
                onSubmit: tokens => this.updateTokens(tokens)
            }
        })
    }
    delete() {
        Alert.alert('Delete Transaction monitor?',
            'You want to delete this transaction monitor', [{
                text: 'Delete',
                onPress: () => this.confirmDelete()
            },
            {
                text: 'Cancel',
                style: 'cancel'
            }])
    }
    confirmDelete() {
        deleteTxMonitor(this.props.id).then(resp => {
            if (resp.error) {
                Alert.alert('Delete Transaction monitor fail', resp.errorMsg)
            } else {
                this.props.navigator.dismissModal()
                Alert.alert('Transaction monitor was deleted!')
            }
        })
    }
    confirm() {
        updateTxMonitor(this.state.model).then(resp => {
            if (resp.error) {
                Alert.alert('Update Transaction monitor fail', resp.errorMsg)
            } else {
                this.props.navigator.dismissModal()
            }
        })
    }
}

export default EditTransactionMonitorScreen