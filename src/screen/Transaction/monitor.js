import React from 'react'
import { Container, Icon } from '../../component/commons'
import TransactionMonitorNavBar from '../../component/navbar/transaction-monitor'
import { CommonScreen } from '../commons'
import { SCREEN_OPTIONS, SCREEN_IDS } from '../const'
import { FlatList, View } from 'react-native'
import TransactionMonitorItem from '../../component/transaction-monitor-item'
import WalletSwipeAction from '../../component/wallet-item/swipe-action'
import LinearGradient from 'react-native-linear-gradient'
import Swipeable from 'react-native-swipeable'
import ActionButton from 'react-native-action-button'
import icons from '../../config/icons'

import { connect } from 'react-redux'
import { getListTxMonitors } from '../../store/transaction-monitor'

import styles from './styles'

class TransactionMonitorScreen extends CommonScreen {
    constructor(props) {
        super(props)
        this.state = {
            loading: true
        }
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
                <TransactionMonitorNavBar title={'Transaction Monitor'}
                    onNavLeft={this.showSideBar.bind(this)}
                    onNotification={this.viewNotification.bind(this)}
                    onCreate={this.addAddress.bind(this)} />
                <FlatList
                    ref={ref => this.listRef = ref}
                    data={this.props.items}
                    renderItem={({ item }) => this.renderItem(item)}
                    keyExtractor={this.keyExtractor}
                    ListFooterComponent={<View style={styles.scroll_content_offset} />}
                    onRefresh={this.getData.bind(this)}
                    refreshing={this.state.loading} />
            </Container>
        )
    }
    getData() {
        this.setState({
            loading: true
        })
        getListTxMonitors().then(resp => {
            this.setState({
                loading: false
            })
        })
    }
    renderBackdrop() {
        return (
            <View style={styles.backdrop}></View>
        )
    }
    keyExtractor = (item, index) => index
    renderItem(item, key) {
        return (
            <TransactionMonitorItem model={item} onPress={() => this.edit(item)} key={key} />
        )
    }
    showSideBar() {
        this.props.navigator.toggleDrawer()
    }
    viewNotification() {
        this.props.navigator.push({
            screen: SCREEN_IDS.notification
        })
    }
    addAddress() {
        this.props.navigator.push({
            screen: SCREEN_IDS.addTransactionMonitor
        })
    }
    edit(item) {
        this.props.navigator.showModal({
            screen: SCREEN_IDS.editTransactionMonitor,
            passProps: {
                id: item.id
            }
        })
    }
}

export default connect(state => state)(TransactionMonitorScreen)