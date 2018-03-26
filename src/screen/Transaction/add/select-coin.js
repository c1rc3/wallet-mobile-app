import React from 'react'
import { Container, ScrollContainer, Icon, RoundedInput } from '../../../component/commons'
import CommonNav from '../../../component/navbar/common'
import { CommonScreen } from '../../commons'
import { SCREEN_OPTIONS, SCREEN_IDS } from '../../const'
import { FlatList, View } from 'react-native'
import CoinTokenItem from '../../../component/coin-token-item'
import Swipeable from 'react-native-swipeable'
import icons from '../../../config/icons'

import { connect } from 'react-redux'
import { getListWallets } from '../../../store/wallet'
import tmService, { TokenInfo } from '../../../service/TransactionMonitor'

import styles from '../styles'

class SelectCoinScreen extends CommonScreen {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            items: []
        }
        this._items = []
        this.mapWalletRef = {}
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
    }
    componentDidMount() {
        this.getData()
    }
    onNavigatorEvent(event) {
        // handle a deep link
        if (event.type == 'DeepLink') {
            console.log('HomeScreen', event)
            this.props.navigator.push({
                screen: event.link
            })
        }
    }
    render() {
        return (
            <Container>
                <CommonNav
                    title={'Select Coin / Platform'}
                    onBack={() => this.props.navigator.pop()} />
                <FlatList
                    ref={ref => this.listRef = ref}
                    onScrollBeginDrag={this.recenterSwipeItem.bind(this)}
                    data={this.state.items}
                    renderItem={({ item }) => this.renderItem(item)}
                    keyExtractor={this.keyExtractor}
                    ListFooterComponent={<View style={styles.scroll_content_offset} />}
                    ListHeaderComponent={
                        <View style={styles.search_input_container}>
                            <RoundedInput onChangeText={value => this.filter(value)} placeholder={'Search...'} />
                        </View>
                    }
                    onRefresh={this.getData.bind(this)}
                    refreshing={this.state.loading}
                    stickyHeaderIndices={[0]}
                    horizontal={false} />
            </Container>
        )
    }
    filter(value = '') {
        this.setState({
            loading: false,
            items: value ? this._items.filter(item => item.name.toLowerCase().indexOf(value.toLowerCase()) >= 0) : this._items
        })
    }
    getData() {
        this.setState({
            loading: true
        }, () => {
            let items = tmService.getCoins()
            this._items = items
            this.setState({
                loading: false,
                items
            })
        })
    }
    recenterSwipeItem() {
        for (let k in this.mapWalletRef) {
            this.mapWalletRef[k].recenter()
        }
    }
    renderBackdrop() {
        return (
            <View style={styles.backdrop}></View>
        )
    }
    keyExtractor = (item, index) => index
    renderItem(item, key) {
        return (
            <CoinTokenItem onPress={() => this.selectCoin(item)} key={key} name={item.name || item.slug || item.symbol} />
        )
    }
    selectCoin(coinInfo) {
        this.props.navigator.push({
            screen: SCREEN_IDS.addTransactionMonitorInputAddress,
            passProps: {
                coin: coinInfo
            }
        })
    }
}

export default SelectCoinScreen