import React from 'react'
import { ScrollView, View, Picker } from 'react-native'
import { Container, Text, SettingInput, SettingSelect, RoundedButton, Button } from '../../component/commons'
import ModalNavBar from '../../component/navbar/modal'
import LinearGradient from 'react-native-linear-gradient'
import { SCREEN_OPTIONS } from '../const'
import styles from './styles'
import { WalletInfo } from '../../store/wallet'

export default class CreateNewWallet extends React.Component {
    static navigatorStyle = {
        ...SCREEN_OPTIONS.navBarHidden
    }
    constructor(props) {
        super(props)
        this.state = {
            model: new WalletInfo()
        }
    }
    render() {
        let model = this.state.model

        return (
            <Container>
                <ModalNavBar onClose={() => this.close()} title={'CREATE NEW WALLET'} />
                <ScrollView>
                    <View style={styles.cnw_block}>
                        <View style={styles.cnw_block_content}>
                            <SettingInput value={model.name} onChange={value => this._changeName(value)} label={'Wallet Name'} placeholder={'Enter your wallet name'} />
                            <SettingSelect onChangeValue={language => {
                                console.log(language)
                                this.setState({ language })
                            }} selectedValue={this.state.language} label={'Type'} placeholder={'Choose wallet type'}>
                                <SettingSelect.Item label={'Bitcoin'} value={'btc'} />
                                <SettingSelect.Item label={'Ethereum'} value={'eth'} />
                                <SettingSelect.Item label={'Ripple'} value={'rxp'} />
                            </SettingSelect>
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
    _changeName(value) {
        let model = this.state.model
        model.name = value || ''
        this.setState({ model })
    }
    _changeType(value) {
        let model = this.state.model
        model.type = value || ''
        this.setState({ model })
    }
    close() {
        this.props.navigator.dismissModal({
            animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
        })
    }
}