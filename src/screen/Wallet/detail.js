import React from 'react'
import { ScrollView, View } from 'react-native'
import { Container, Icon, Text, RoundedButton } from '../../component/commons'
import WalletDetailNavBar from '../../component/navbar/wallet-detail'
import { AreaSpline, Theme } from '../../component/chart'
import TransactionItem from '../../component/transaction-item'
import LinearGradient from 'react-native-linear-gradient'
import styles from './styles'
import { SCREEN_IDS } from '../const'

let data = [
    { year: 2016, value: 20 },
    { year: 2015, value: 17 },
    { year: 2014, value: 28 },
    { year: 2013, value: 22 },
    { year: 2012, value: 26 },
    { year: 2011, value: 22 },
    { year: 2010, value: 16 },
    { year: 2009, value: 24 },
    { year: 2008, value: 30 },
    { year: 2007, value: 22 },
    { year: 2007, value: 50 }
]

class TransactionInfo {

}

class WalletOverview extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            chartDimension: {
                width: 0,
                height: 0
            }
        }
    }
    render() {
        return (
            <View style={styles.wallet_overview_container}>
                <View style={styles.wallet_overview_content}>
                    <View style={styles.wallet_overview_info}>
                        <Icon style={styles.wallet_overview_icon} />
                        <View style={styles.wallet_overview_info_specs}>
                            <View style={styles.wallet_overview_info_row}>
                                <Text style={styles.wallet_overview_info_type}>BTC - Bitcoin</Text>
                                <Text style={styles.wallet_overview_info_est}>US $8.500</Text>
                            </View>
                            <View style={[styles.wallet_overview_info_row, styles.wallet_overview_info_spacing]}>
                                <Text style={styles.wallet_overview_info_amount}>8.1371516</Text>
                                <Text style={styles.wallet_overview_info_ratio}>
                                    10%
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View onLayout={e => this._onLayoutChart(e)} style={styles.wallet_overview_chart}>
                        <AreaSpline
                            color={Theme.colors[0]}
                            width={this.state.chartDimension.width}
                            height={this.state.chartDimension.height}
                            data={data}
                        />
                    </View>
                </View>
            </View>
        )
    }
    _onLayoutChart(e) {
        if (this.state.chartDimension.width + this.state.chartDimension.height > 0) return
        let { width, height } = e.nativeEvent.layout
        this.setState({ chartDimension: { width, height } })
    }
}


export default class WalletDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            transactions: [
                new TransactionInfo(),
                new TransactionInfo(),
                new TransactionInfo(),
                new TransactionInfo(),
                new TransactionInfo(),
                new TransactionInfo(),
                new TransactionInfo()
            ]
        }
    }
    render() {
        return (
            <Container>
                <WalletDetailNavBar onBack={() => this.back()} title={'Wallet A'} />
                <ScrollView>
                    <WalletOverview />
                    <View style={styles.transaction_container}>
                        <Text style={styles.transaction_title}>TRANSACTIONS HISTORY</Text>
                        {[
                            ...this._renderTransactions(),
                            <View style={styles.scroll_content_offset} key={-1} />
                        ]}
                    </View>
                </ScrollView>
                <View style={styles.fixed_bottom}>
                    <LinearGradient colors={['#242d3b00', '#242d3b']} locations={[0, 0.5]}>
                        <View style={styles.fixed_bottom_button_container}>
                            <RoundedButton onPress={() => this.send()} style={[styles.fixed_bottom_button, styles.send_button]} containerStyle={styles.button_container} text={'SEND'} />
                            <RoundedButton onPress={() => this.receive()} style={[styles.fixed_bottom_button, styles.receive_button]} containerStyle={styles.button_container} text={'RECEIVE'} />
                        </View>
                    </LinearGradient>
                </View>
            </Container>
        )
    }
    _renderTransaction(tran, key) {
        return (
            <TransactionItem key={key} />
        )
    }
    _renderTransactions() {
        return this.state.transactions.map((tran, key) => this._renderTransaction(tran, key))
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
    update() {
        this.props.navigator.showModal({
            screen: SCREEN_IDS.updateWallet
        })
    }
    back() {
        this.props.navigator.pop({
            animated: true, // does the pop have transition animation or does it happen immediately (optional)
            animationType: 'slide-horizontal', // 'fade' (for both) / 'slide-horizontal' (for android) does the pop have different transition animation (optional)
        })
    }
}