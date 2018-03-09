import React from 'react'
import { ScrollView, View } from 'react-native'
import { Container, SettingInput, RoundedStrokeButton, Button, SettingTitle, SettingAction, SettingSwitch } from '../../component/commons'
import ModalNavBar from '../../component/navbar/modal'
import { SCREEN_OPTIONS } from '../const'
import styles from './styles'

export default class UpdateWallet extends React.Component {
    static navigatorStyle = {
        ...SCREEN_OPTIONS.navBarHidden
    }
    _renderRightNavBar() {
        return (
            <Button text={'SAVE'} style={styles.button_navbar} textStyle={styles.button_navbar_text} />
        )
    }
    render() {
        return (
            <Container>
                <ModalNavBar
                    onClose={() => this.close()}
                    title={'EDIT WALLET'}
                    renderRight={this._renderRightNavBar()}
                />
                <ScrollView>
                    <View style={styles.cnw_block}>
                        <View style={styles.cnw_block_content}>
                            <SettingTitle text={'SECURITY SETTINGS'} />
                            <SettingInput
                                label={'Wallet Name'}
                                placeholder={'Enter wallet name'}
                            />
                            <SettingAction text={'Backup Private Key'} />
                            <SettingSwitch text={'Push to mobile'} />
                        </View>
                    </View>
                    <View style={[styles.cnw_block, { marginTop: 50 }]}>
                        <View style={styles.cnw_block_content}>
                            <RoundedStrokeButton
                                onPress={() => this.addWallet()}
                                style={styles.fixed_bottom_button}
                                containerStyle={styles.done_button_container}
                                text={'Delete Wallet'} />
                        </View>
                    </View>
                </ScrollView>
            </Container>
        )
    }
    scanQRCode() {

    }
    close() {
        this.props.navigator.dismissModal({
            animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
        })
    }
}