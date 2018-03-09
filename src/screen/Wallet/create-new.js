import React from 'react'
import { ScrollView, View } from 'react-native'
import { Container, Text, InputBox, SelectBox, RoundedButton, Button } from '../../component/commons'
import ModalNavBar from '../../component/navbar/modal'
import { AreaSpline, Theme } from '../../component/chart'
import TransactionItem from '../../component/transaction-item'
import LinearGradient from 'react-native-linear-gradient'
import { SCREEN_OPTIONS } from '../const'
import styles from './styles'

export default class CreateNewWallet extends React.Component {
    static navigatorStyle = {
        ...SCREEN_OPTIONS.navBarHidden
    }
    render() {
        return (
            <Container>
                <ModalNavBar onClose={() => this.close()} title={'CREATE NEW WALLET'} />
                <ScrollView>
                    <View style={styles.cnw_block}>
                        <View style={styles.cnw_title_container}>
                            <Text style={styles.cnw_title}>WALLET 1</Text>
                        </View>
                        <View style={styles.cnw_block_content}>
                            <InputBox label={'Wallet Name'} placeholder={'Enter your wallet name'} />
                            <SelectBox label={'Type'} placeholder={'Choose wallet type'} />
                        </View>
                    </View>
                    <View style={styles.cnw_block}>
                        <View style={styles.cnw_title_container}>
                            <Text style={styles.cnw_title}>WALLET 1</Text>
                        </View>
                        <View style={styles.cnw_block_content}>
                            <InputBox label={'Wallet Name'} placeholder={'Enter your wallet name'} />
                            <SelectBox label={'Type'} placeholder={'Choose wallet type'} />
                        </View>
                    </View>
                    <View style={styles.cnw_block}>
                        <View style={styles.button_add_more_container}>
                            <Button style={styles.button_add_more} textStyle={styles.button_add_more_text} text={'+ Add more'} />
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.fixed_bottom}>
                    <LinearGradient colors={['#242d3b00', '#242d3b']} locations={[0, 0.5]}>
                        <View style={styles.fixed_bottom_button_container}>
                            <RoundedButton style={[styles.fixed_bottom_button, styles.done_button]} containerStyle={styles.done_button_container} text={'DONE'} />
                        </View>
                    </LinearGradient>
                </View>
            </Container>
        )
    }
    close() {
        this.props.navigator.dismissModal({
            animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
        })
    }
}