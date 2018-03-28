
import React from 'react'
import { ScrollContainer, Text, Touchable, SettingInput, RoundedButton, DashedButton, SettingTitle, SettingDesc, RoundedInput } from '../../../component/commons'
import CommonNav from '../../../component/navbar/common'
import CoinTokenItem from '../../../component/coin-token-item'
import { CommonScreen } from '../../commons'
import { SCREEN_OPTIONS, SCREEN_IDS } from '../../const'
import { View, FlatList, Linking } from 'react-native'
import icons from '../../../config/icons'
import { addTxMonitor } from '../../../store/transaction-monitor'

import { TxMonitorInfo, CoinInfo } from '../../../service/TransactionMonitor'

import styles from '../styles'

class ConfirmScreen extends CommonScreen {
    constructor(props) {
        super(props)
        this.state = {
            model: new TxMonitorInfo(props.model),
            loading: true,
            tokens: [],
            filterTokens: ''
        }
        // this.model = this.props.model
        this.coin = props.coin
        console.log('AddTransactionMonitorScreen', this.coin)
    }

    onSuccess(e) {
        Linking
            .openURL(e.data)
            .catch(err => console.error('An error occured', err))
    }
    render() {
        return (
            <ScrollContainer onSwipeDown={this.props.navigator.dismissModal}>
                <CommonNav
                    title={'Select tokens'}
                    onBack={() => this.props.navigator.pop()}
                    onRight={() => this.props.navigator.popToRoot()}
                    rightText={'Cancel'} />
                <View style={styles.block}>
                    <View style={styles.block_content}>
                        <SettingTitle text={'TOKENS'} rightLabel={`${this.state.model.tokens.length} tokens`} />
                        <SettingDesc text={'Please choose Tokens to add for monitoring.'} />
                    </View>
                    <FlatList
                        ref={ref => this.listRef = ref}
                        data={this.state.tokens}
                        renderItem={({ item }) => this.renderItem(item)}
                        keyExtractor={this.keyExtractor}
                        ListFooterComponent={
                            <View style={styles.search_input_container_confirm}>
                                <DashedButton onPress={this.selectTokens.bind(this)} icon={icons.new_chat} text={'+ Add more'} />
                            </View>
                        }
                        ListHeaderComponent={
                            this.state.model.tokens.length ? <View style={styles.search_input_container_confirm}>
                                <RoundedInput
                                    value={this.state.filterTokens}
                                    onChangeText={value => this.filter(value)}
                                    placeholder={'Search...'}
                                />
                            </View> : null
                        }
                        stickyHeaderIndices={[0]}
                        horizontal={false} />
                </View>
                <View style={[styles.block, styles.lasted_block]}>
                    <RoundedButton onPress={this.confirm.bind(this)} containerStyle={styles.button_container} text={'Add Monitor'} />
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
    renderItem(item) {
        return (
            <CoinTokenItem
                onPress={() => this.uncheckItem(item)}
                checked={true}
                name={item.name || item.slug || item.symbol} />
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
        this.state.model.tokens = this.state.model.tokens.filter(i => i.id !== item.id)
        this.setState({
            model: this.state.model
        })
        this.filter(this.state.filterTokens)
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
    confirm() {
        addTxMonitor(this.state.model)
    }
}

export default ConfirmScreen