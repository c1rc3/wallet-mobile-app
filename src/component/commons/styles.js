import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    text: {
        color: '#fff',
        fontFamily: 'Montserrat'
    },
    button: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button_dashed_container: {
        borderWidth: 1,
        borderColor: '#505967',
        borderStyle: 'dashed',
    },
    button_dashed: {
        height: 48,
        lineHeight: 46,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Montserrat',
        fontSize: 12,
        fontWeight: 'normal',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'center',
        color: '#ffffff80',
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
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 10,
        paddingBottom: 10,
        height: 40,
        width: 40,
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
        padding: 10,
        fontSize: 14,
        top: 0,
        fontWeight: '500',
        fontFamily: 'Montserrat',
        fontStyle: 'normal',
        letterSpacing: 0,
        color: '#4fccff'
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
        // paddingTop: 22
    },
    scroll_container: {
        flex: 1,
        backgroundColor: '#253042',
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
    rounded_input: {
        borderWidth: 0,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        fontFamily: 'Montserrat',
        fontSize: 14,
        fontWeight: '500',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'left',
        color: '#ffffff',
        paddingLeft: 16,
        paddingRight: 16,
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