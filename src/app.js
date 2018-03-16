import 'react-native'
import conf from './config'
import Logger from './util/Logger'
import { Navigation } from 'react-native-navigation'
import { registerScreens, registerComponents } from './screen'
import { SCREEN_IDS, SCREEN_OPTIONS } from './screen/const'
import { StatusBar } from 'react-native'
import authStore, { checkRegistered, lockWallet } from './store/auth'
import { AUTH_STATUS } from './store/auth/const'

export default function startApp() {
    registerScreens()
    registerComponents()
    StatusBar.setBarStyle('light-content')
    Navigation.startSingleScreenApp({
        screen: {
            screen: SCREEN_IDS.main,
            title: 'Loading',
            navigatorStyle: {
                ...SCREEN_OPTIONS.navBarHidden
            },
            animationType: 'slide-down'
        },
        drawer: {
            left: {
                screen: SCREEN_IDS.leftSideBar,
                fixedWidth: 500
            },
            style: {
                drawerShadow: true,
                contentOverlayColor: 'rgba(0,0,0,0.25)',
            },
            disableOpenGesture: true
        }
    })
}