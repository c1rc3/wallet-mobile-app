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
import CreateNewWalletScreen from './Wallet/create-new'
import AddWalletSuccessScreen from './Wallet/add-success'
import WalletReceiveScreen from './Wallet/receive'
import WalletSendScreen from './Wallet/send'
import UpdateWalletScreen from './Wallet/update'
import SettingsScreen from './Settings'
import TransactionMonitorScreen from './Transaction/monitor'
import ATMConfirmScreen from './Transaction/add/confirm'
import ATMInputAddressScreen from './Transaction/add/input-address'
import ATMSelectCoinScreen from './Transaction/add/select-coin'
import ATMSelectTokenScreen from './Transaction/add/select-token'
import EditTransactionMonitorScreen from './Transaction/edit-address'

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
    Navigation.registerComponent(SCREEN_IDS.createNewWallet, () => CreateNewWalletScreen)
    Navigation.registerComponent(SCREEN_IDS.addWalletSuccess, () => AddWalletSuccessScreen)
    Navigation.registerComponent(SCREEN_IDS.settings, () => SettingsScreen)

    //Transactions
    Navigation.registerComponent(SCREEN_IDS.transactionMonitor, () => TransactionMonitorScreen, walletStore, Provider)
    Navigation.registerComponent(SCREEN_IDS.addTransactionMonitor, () => ATMSelectCoinScreen)
    Navigation.registerComponent(SCREEN_IDS.addTransactionMonitorSelectCoin, () => ATMSelectCoinScreen)
    Navigation.registerComponent(SCREEN_IDS.addTransactionMonitorInputAddress, () => ATMInputAddressScreen)
    Navigation.registerComponent(SCREEN_IDS.addTransactionMonitorSelectToken, () => ATMSelectTokenScreen)
    Navigation.registerComponent(SCREEN_IDS.addTransactionMonitorConfirm, () => ATMConfirmScreen)
    Navigation.registerComponent(SCREEN_IDS.editTransactionMonitor, () => EditTransactionMonitorScreen)

    Navigation.registerComponent(SCREEN_IDS.leftSideBar, () => LeftSideBar)
}

export function registerComponents() {
    Navigation.registerComponent(COMPONENT_IDS.homeNavBar, () => HomeNavBarScreen)
}