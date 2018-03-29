import 'react-native'
import { Navigation } from 'react-native-navigation'
import { registerScreens, registerComponents } from './screen'
import { SCREEN_IDS, SCREEN_OPTIONS } from './screen/const'
import { StatusBar } from 'react-native'

export default function startApp() {
    registerScreens()
    registerComponents()
    StatusBar.setBarStyle('light-content')
    //Start app with main Screen
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