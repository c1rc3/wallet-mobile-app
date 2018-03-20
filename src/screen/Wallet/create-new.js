import React from 'react'
import { View } from 'react-native'
import { ScrollContainer, SettingInput, SettingSelect, RoundedButton, Alert } from '../../component/commons'
import ModalNavBar from '../../component/navbar/modal'
import { SCREEN_OPTIONS } from '../const'
import styles from './styles'
import WalletService, { WalletInfo } from '../../service/Wallet'
import { addWallet } from '../../store/wallet'

export default class CreateNewWallet extends React.Component {
    static navigatorStyle = {
        ...SCREEN_OPTIONS.navBarHidden
    }
    constructor(props) {
        super(props)
        this.state = {
            model: new WalletInfo(),
            types: WalletService.getTypes()
        }
        this.model = new WalletInfo()
    }
    render() {
        let model = this.state.model

        return (
            <ScrollContainer onSwipeDown={this.close.bind(this)}>
                <ModalNavBar onClose={() => this.close()} title={'CREATE NEW WALLET'} />
                <View style={styles.cnw_block}>
                    <View style={styles.cnw_block_content}>
                        <SettingInput value={model.name} onChangeText={value => this.changeName(value)} label={'Wallet Name'} placeholder={'Enter your wallet name'} />
                        <SettingSelect selectedValue={model.type} onChangeValue={value => this.changeType(value)} label={'Type'} placeholder={'Choose wallet type'}>
                            {this.state.types.map(type => <SettingSelect.Item key={type.id} label={type.name} value={type.id} />)}
                        </SettingSelect>
                    </View>
                </View>
                <View style={styles.cnw_block}>
                    <RoundedButton onPress={this.confirm.bind(this)} style={[styles.fixed_bottom_button, styles.done_button]} containerStyle={styles.done_button_container} text={'DONE'} />
                </View>
            </ScrollContainer>
        )
    }
    changeName(value) {
        let model = this.state.model
        model.name = value || ''
        this.setState({ model })
        console.log(model)
    }
    changeType(value) {
        let model = this.state.model
        model.type = value || ''
        this.setState({ model })
        console.log(model)
    }
    confirm() {
        let model = this.state.model
        if (!model) {
            Alert.alert('Can not create wallet', 'Wallet model is not valid')
        } else if (!model.name) {
            Alert.alert('Can not create wallet', 'Please enter wallet name')
        } else if (!model.type) {
            Alert.alert('Can not create wallet', 'Please select wallet type')
        } else {
            addWallet(model).then(resp => {
                if (resp.error) {
                    Alert.alert('Create Wallet fail', resp.errorMsg || '')
                } else {
                    Alert.alert('Create Wallet Success', 'Do you want to create another wallet?', [{
                        text: 'Create new one',
                        onPress: () => this.resetModel()
                    }, {
                        text: 'Skip',
                        onPress: () => this.close(),
                        style: 'cancel'
                    }])
                }
            })
        }
    }
    close() {
        this.props.navigator.dismissModal()
    }
}