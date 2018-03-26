
import React from 'react'
import { ScrollContainer, SettingInput, RoundedButton, DashedButton, SettingTitle, SettingDesc, RoundedInput } from '../../../component/commons'
import CommonNav from '../../../component/navbar/common'
import CoinTokenItem from '../../../component/coin-token-item'
import { CommonScreen } from '../../commons'
import { SCREEN_OPTIONS, SCREEN_IDS } from '../../const'
import { View, FlatList } from 'react-native'
import icons from '../../../config/icons'

import { TransactionMonitorInfo } from '../../../service/TransactionMonitor'

import styles from '../styles'

class ConfirmScreen extends CommonScreen {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            model: new TransactionMonitorInfo()
        }
        console.log('AddTransactionMonitorScreen', this.props.coin)
    }
    render() {
        let model = this.state.model
        let addressName = this.props.coin ? this.props.coin.shortName : ''
        return (
            <ScrollContainer onSwipeDown={this.props.navigator.dismissModal}>
                <CommonNav
                    title={'Confirm'}
                    onBack={() => this.props.navigator.pop()} />
                <View style={styles.block}>
                    <View style={styles.block_content}>
                        <SettingInput
                            value={model.publicKey}
                            onChangeText={value => this.changePublicKey(value)}
                            label={`Your ${addressName} Address`}
                            placeholder={`Enter ${addressName} address or scan QR code`}
                            rightAction={this.scanQRCode}
                            rightActionIcon={icons.qr}
                        />
                    </View>
                </View>
                <View style={styles.block}>
                    <View style={styles.block_content}>
                        <SettingTitle text={'TOKENS'} />
                        <SettingDesc text={'Please choose Tokens to add for monitoring.'} />
                    </View>
                    <FlatList
                        ref={ref => this.listRef = ref}
                        data={this.state.items}
                        renderItem={({ item }) => this.renderItem(item)}
                        keyExtractor={this.keyExtractor}
                        ListFooterComponent={
                            <View style={styles.search_input_container_confirm}>
                                <DashedButton onPress={this.selectTokens.bind(this)} icon={icons.new_chat} text={'+ Add more'} />
                            </View>
                        }
                        ListHeaderComponent={
                            <View style={styles.search_input_container_confirm}>
                                <RoundedInput onChangeText={value => this.filter(value)} placeholder={'Search...'} />
                            </View>
                        }
                        stickyHeaderIndices={[0]}
                        horizontal={false} />
                </View>
                <View style={[styles.block, styles.lasted_block]}>
                    <RoundedButton onPress={this.confirm.bind(this)} containerStyle={styles.button_container} text={'NEXT'} />
                </View>
            </ScrollContainer>
        )
    }
    keyExtractor = (item, index) => index
    filter(value = '') {
        this.setState({
            loading: false,
            items: value ? this._items.filter(item => item.name.toLowerCase().indexOf(value.toLowerCase()) >= 0) : this._items
        })
    }
    renderItem(item, key) {
        return (
            <CoinTokenItem onPress={() => this.selectCoin(item)} key={key} name={item.name || item.slug || item.symbol} />
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
    selectTokens() {
        this.props.navigator.showModal({
            screen: SCREEN_IDS.addTransactionMonitorSelectToken,
            passProps: {
                coin: this.props.coin
            }
        })
    }
}

export default ConfirmScreen