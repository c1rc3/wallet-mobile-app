import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    text: {
        color: '#fff',
        fontFamily: 'Montserrat'
    },
    button: {
        padding: 10
    },
    button_rounded: {
        height: 34,
        width: 179,
        lineHeight: 34,
        fontSize: 13,
        color: '#fff',
        backgroundColor: '#5d95ea',
        borderRadius: 17,
        textAlign: 'center',
        fontWeight: '500',
        overflow: 'hidden'
    },
    button_rounded_stroke: {
        backgroundColor: 'transparent',
        borderWidth: 0.5,
        borderColor: '#fff'
    },
    button_icon: {
        padding: 10,
        height: 44,
        width: 44,
        justifyContent: 'center'
    },
    button_icon_image: {
        width: 22,
        height: 22,
        resizeMode: 'contain'
    },
    nav_button_container: {
        position: 'absolute',
        top: 4,
        left: 0,
        paddingLeft: 12,
        paddingRight: 12,
        width: '100%'
    },
    nav_button: {
        position: 'absolute',
        padding: 10,
        height: 40,
        fontSize: 17,
        top: 0,
        fontWeight: '400',
        color: '#fff'
    },
    nav_button_left: {
        left: 0
    },
    nav_button_right: {
        right: 0
    },
    container: {
        flex: 1,
        backgroundColor: '#253042',
        paddingTop: 22
    },
    scroll_view: {
        flex: 1,
    },
    image: {
        width: 600,
        height: 400
    },
    icon: {
        resizeMode: 'contain'
    },
    input: {
        borderWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderBottomWidth: 1,
        borderColor: '#ffffff51',
        fontFamily: 'Montserrat',
        fontSize: 16,
        fontWeight: '600',
        color: '#ffffff',
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 10,
        paddingBottom: 10
    },
    qrcode_container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    qrcode_title: {
        marginTop: 36,
        height: 18,
        fontSize: 14,
        fontWeight: '500',
        letterSpacing: 0,
        textAlign: 'center',
        color: '#ffffff'
    },
    qrcode_value: {
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 13,
        lineHeight: 20,
        // height: 18,
        opacity: 0.5,
        fontSize: 14,
        fontWeight: 'normal',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'center',
        color: '#ffffff'
    }
})