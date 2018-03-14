import { Navigation } from 'react-native-navigation'
import { Provider } from 'react-redux'
import walletStore from '../store/wallet'

import HomeScreen from './Home'
import WelcomeScreen from './Welcome'
import UnlockScreen from './Unlock'
import Main from './Main'
import SetPasscodeScreen from './SetPasscode/set-passcode'
import ConfirmPasscodeScreen from './SetPasscode/verify-passcode'
import SetPasscodeHintScreen from './SetPasscode/set-hint'
import HomeNavBarScreen from '../component/navbar/home-navbar'
import WalletDetailScreen from './Wallet/detail'
import LeftSideBar from './LeftSideBar'
import NofiticationScreen from './Notification'
import CreateNewWallet from './Wallet/create-new'
import WalletReceiveScreen from './Wallet/receive'
import WalletSendScreen from './Wallet/send'
import UpdateWalletScreen from './Wallet/update'
import SettingsScreen from './Settings'

import { SCREEN_IDS, COMPONENT_IDS } from './const'

export function registerScreens() {
    Navigation.registerComponent(SCREEN_IDS.home, () => HomeScreen, walletStore, Provider)
    Navigation.registerComponent(SCREEN_IDS.welcome, () => WelcomeScreen)
    Navigation.registerComponent(SCREEN_IDS.unlock, () => UnlockScreen)
    Navigation.registerComponent(SCREEN_IDS.setPasscode, () => SetPasscodeScreen)
    Navigation.registerComponent(SCREEN_IDS.confirmPasscode, () => ConfirmPasscodeScreen)
    Navigation.registerComponent(SCREEN_IDS.setPasscodeHint, () => SetPasscodeHintScreen)
    Navigation.registerComponent(SCREEN_IDS.main, () => Main)
    Navigation.registerComponent(SCREEN_IDS.walletDetail, () => WalletDetailScreen)
    Navigation.registerComponent(SCREEN_IDS.notification, () => NofiticationScreen)
    Navigation.registerComponent(SCREEN_IDS.walletReceive, () => WalletReceiveScreen)
    Navigation.registerComponent(SCREEN_IDS.walletSend, () => WalletSendScreen)
    Navigation.registerComponent(SCREEN_IDS.updateWallet, () => UpdateWalletScreen)
    Navigation.registerComponent(SCREEN_IDS.createNewWallet, () => CreateNewWallet)
    Navigation.registerComponent(SCREEN_IDS.settings, () => SettingsScreen)

    Navigation.registerComponent(SCREEN_IDS.leftSideBar, () => LeftSideBar)
}

export function registerComponents() {
    Navigation.registerComponent(COMPONENT_IDS.homeNavBar, () => HomeNavBarScreen)
}