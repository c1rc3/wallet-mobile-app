import React from 'react'
import { Container, ScrollContainer, Icon, RoundedInput } from '../../../component/commons'
import ModalNav from '../../../component/navbar/modal'
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

class SelectTokenScreen extends CommonScreen {
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
                <ModalNav
                    title={'Select Tokens'}
                    onClose={() => this.props.navigator.dismissModal()}
                    onRight={() => this.confirm()}
                    rightText={'Done'} />
                <FlatList
                    ref={ref => this.listRef = ref}
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
        let items = value ? this._items.filter(item => item.name.toLowerCase().indexOf(value.toLowerCase()) >= 0) : this._items
        this.listRef.scrollToOffset({
            offset: 0
        })
        this.setState({
            loading: false,
            items: this.sortItems(items)
        })
    }
    sortItems(items = []) {
        return items.sort((i1, i2) => {
            if (i1.checked && !i2.checked) {
                return -1
            } else if (!i1.checked && i2.checked) {
                return 1
            }
            return i1.name.localeCompare(i2.name)
        })
    }
    getData() {
        this.setState({
            loading: true
        }, () => {
            let items = this._items
            if (!this._items.length) {
                items = tmService.getTokens()
                this._items = items
                console.log(this.props.tokens)
                this.props.tokens.forEach(token => {
                    let tmp = items.find(item => item.id === token.id)
                    if (tmp) {
                        tmp.checked = true
                    }
                })
            }
            this.setState({
                loading: false,
                items: this.sortItems(items)
            })
        })
    }
    // recenterSwipeItem() {
    //     for (let k in this.mapWalletRef) {
    //         this.mapWalletRef[k].recenter()
    //     }
    // }
    // renderBackdrop() {
    //     return (
    //         <View style={styles.backdrop}></View>
    //     )
    // }
    keyExtractor = (item, index) => index
    renderItem(item) {
        return (
            <CoinTokenItem
                onPress={() => this.selectCoin(item)}
                checked={item.checked}
                name={item.name || item.slug || item.symbol} />
        )
    }
    selectCoin(coinInfo) {
        coinInfo.checked = !coinInfo.checked
        this.setState({
            items: this.sortItems(this.state.items)
        })
    }
    getSelectedTokens() {
        let res = this._items.filter(i => i.checked)
        console.log(res)
        return res
    }
    confirm() {
        if (this.props.onSubmit) {
            this.props.onSubmit(this.getSelectedTokens())
        }
        this.props.navigator.dismissModal()
    }
}

export default SelectTokenScreen