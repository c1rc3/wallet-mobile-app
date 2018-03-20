import React from 'react'
import { ScrollView, View } from 'react-native'
import { ScrollContainer, Icon, Text, RoundedButton, RoundedStrokeButton } from '../../component/commons'
import ModalNavBar from '../../component/navbar/modal'
import { AreaSpline, Theme } from '../../component/chart'
import TransactionItem from '../../component/transaction-item'
import LinearGradient from 'react-native-linear-gradient'
import styles from './styles'
import icons from '../../config/icons'
import { SCREEN_OPTIONS } from '../const'

export default class AddWalletSuccess extends React.Component {
    static navigatorStyle = SCREEN_OPTIONS.navBarHidden
    render() {
        return (
            <ScrollContainer onSwipeDown={this.props.navigator.dismissModal}>
                <ModalNavBar onClose={this.props.navigator.dismissModal} />
                <View style={styles.add_success_container}>
                    <Icon source={icons.order_placed} style={styles.add_success_icon} />
                    <Text style={styles.add_success_title}>You have created 2 new wallets successfully!</Text>
                    <Text style={styles.add_success_msg}>Consider to backup your wallets.</Text>
                    <View style={styles.add_success_btns}>
                        <RoundedStrokeButton text={'Later'} containerStyle={styles.add_success_btn_container} style={styles.add_success_btn} />
                        <RoundedButton text={'Backup'} containerStyle={styles.add_success_btn_container} style={styles.add_success_btn} />
                    </View>
                </View>
            </ScrollContainer>
        )
    }
}