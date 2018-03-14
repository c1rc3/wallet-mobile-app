import React from 'react'
import { Container } from '../../component/commons'
import HomeNavBar from '../../component/navbar/home-navbar'
import { BaseScreen } from '../commons'
import { SCREEN_OPTIONS, SCREEN_IDS } from '../const'
import { ScrollView, View } from 'react-native'
import { Pie, Theme } from '../../component/chart'
import WalletItemComponent from '../../component/wallet-item'
import WalletSwipeAction from '../../component/wallet-item/swipe-action'
import LinearGradient from 'react-native-linear-gradient'
import Swipeable from 'react-native-swipeable'
import ActionButton from 'react-native-action-button'
import Icon from 'react-native-vector-icons/Ionicons'

import { connect } from 'react-redux'
import { getListWallets } from '../../store/wallet'

import styles from './styles'

class HomeScreen extends BaseScreen {
    static navigatorStyle = {
        ...SCREEN_OPTIONS.navBarHidden
    }
    constructor(props) {
        super(props)
        this.state = {
            mapWalletRef: {},
            currentSwipeItemRef: null
        }
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
    }
    onNavigatorEvent(event) {
        // handle a deep link
        if (event.type == 'DeepLink') {
            console.log('HomeScreen', event)
            // const payload = event.payload // (optional) The payload
            this.props.navigator.push({
                screen: event.link
            })
        }
    }
    render() {
        const height = 200
        const width = 500
        const data = [
            { 'number': 42, 'name': 'Rent' },
            { 'number': 23, 'name': 'Car' },
            { 'number': 16, 'name': 'Food' },
            { 'number': 8, 'name': 'Fun activities' },
            { 'number': 7, 'name': 'Dog' },
            { 'number': 4, 'name': 'Misc' },
        ]
        return (
            <Container>
                <HomeNavBar onNavLeft={() => this.showSideBar()} onNotification={() => this.viewNotification()} />
                <ScrollView onScrollBeginDrag={() => this.onScroll()}>
                    <Pie
                        pieWidth={150}
                        pieHeight={150}
                        colors={Theme.colors}
                        width={width}
                        height={height}
                        data={data} />
                    {
                        [
                            ...this._renderItems(),
                            <View style={styles.scroll_content_offset} key={-1} />
                        ]
                    }
                </ScrollView>
                <View style={styles.fixed_bottom}>
                    <LinearGradient colors={['#242d3b00', '#242d3b']} locations={[0, 0.5]}>
                        <View style={styles.fixed_bottom_button_container}>
                        </View>
                    </LinearGradient>
                </View>
                {this._renderActionButtons()}
            </Container>
        )
    }
    _renderBackdrop() {
        return (
            <View style={styles.backdrop}></View>
        )
    }
    _renderActionButtons() {
        let containerOptions = {
            buttonColor: '#5d95ea',
            backdrop: this._renderBackdrop(),
            size: 60,
            hideShadow: true,
            degrees: 135,
            buttonTextStyle: {
                fontSize: 50,
                lineHeight: 54
            },
            offsetX: 30,
            offsetY: 30
        }
        let item_options = {
            buttonColor: '#5d95ea',
            size: 45,
            textStyle: styles.action_button_text,
            textContainerStyle: styles.action_button_text_container,
            titleColor: '#ffffff00',
        }
        return (
            <ActionButton {...containerOptions}>
                <ActionButton.Item {...item_options} title={'IMPORT FROM BACKUP FILE'} key={0} >
                    <Icon name="md-create" style={styles.action_button_icon} />
                </ActionButton.Item>
                <ActionButton.Item {...item_options} title={'IMPORT FROM SEED WORDS'} key={1} >
                    <Icon name="md-notifications-off" style={styles.action_button_icon} />
                </ActionButton.Item>
                <ActionButton.Item {...item_options} title={'IMPORT FROM PRIVATE KEY'} key={2} >
                    <Icon name="md-done-all" style={styles.action_button_icon} />
                </ActionButton.Item>
                <ActionButton.Item {...item_options}
                    onPress={() => this.createNewWallet()}
                    title={'CREATE NEW WALLET'}
                    key={3} >
                    <Icon name="md-done-all" style={styles.action_button_icon} />
                </ActionButton.Item>
            </ActionButton>
        )
    }

    createNewWallet() {
        this.props.navigator.showModal({
            screen: SCREEN_IDS.createNewWallet
        })
    }

    _renderItem(item, key) {
        return (
            <Swipeable onRef={ref => {
                this.setState({
                    mapWalletRef: {
                        [item.id]: ref
                    }
                })
            }}
                onSwipeStart={() => this.onSwipeStart(item)}
                rightButtons={this._renderRightButtons(item)} key={key}>
                <WalletItemComponent onPress={() => this.viewDetail(item)} key={key} />
            </Swipeable>
        )
    }

    _renderRightButtons(item) {
        return [
            <WalletSwipeAction onPress={() => this.send(item)} key={0} index={0} text={'Send'} />,
            <WalletSwipeAction onPress={() => this.receive(item)} key={1} index={1} text={'Receive'} />,
            <WalletSwipeAction onPress={() => this.updateWallet(item)} key={2} index={2} text={'Edit'} />,
        ]
    }

    _renderItems() {
        return this.props.wallets.map((item, key) => this._renderItem(item, key))
    }

    showSideBar() {
        this.props.navigator.toggleDrawer({
            side: 'left', // the side of the drawer since you can have two, 'left' / 'right'
            animated: true, // does the toggle have transition animation or does it happen immediately (optional)
            to: 'open' // optional, 'open' = open the drawer, 'closed' = close it, missing = the opposite of current state
        })
    }

    viewNotification() {
        this.props.navigator.push({
            screen: SCREEN_IDS.notification
        })
    }

    addWallet() {
    }

    viewDetail() {
        this.props.navigator.push({
            screen: SCREEN_IDS.walletDetail,
            navigatorStyle: {
                ...SCREEN_OPTIONS.navBarHidden
            }
        })
    }

    //
    onScroll() {
        this.recenterSwipeItem()
    }
    recenterSwipeItem() {
        if (this.state.currentSwipeItemRef) {
            this.state.currentSwipeItemRef.recenter()
            this.setState({
                currentSwipeItemRef: null
            })
        }
    }
    onSwipeStart(item = {}) {
        this.recenterSwipeItem()
        this.setState({
            currentSwipeItemRef: this.state.mapWalletRef[item.id]
        })
    }
    //wallet actions
    componentDidMount() {
        console.log('componentDidMount')
        console.log(this.props)
        getListWallets()
        // this.getWallets()
    }
    getWallets() {
        getListWallets()
    }
    send() {
        this.props.navigator.showModal({
            screen: SCREEN_IDS.walletSend
        })
    }
    receive() {
        this.props.navigator.showModal({
            screen: SCREEN_IDS.walletReceive
        })
    }
    updateWallet() {
        this.props.navigator.showModal({
            screen: SCREEN_IDS.updateWallet
        })
    }
}

export default connect(state => state)(HomeScreen)