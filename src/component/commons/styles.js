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
        width: 44
    },
    button_icon_image: {
        width: 24,
        height: 24,
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
    input_box_container: {
        marginTop: 0,
        borderBottomWidth: 1,
        borderColor: '#ffffff33',
        paddingTop: 8,
        paddingBottom: 6
    },
    input_box_content_row: {
        flexDirection: 'row'
    },
    input_box_content_icon: {
        flex: 1
    },
    input_box_icon_container: {
        width: 30,
        paddingBottom: 10,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    input_box_icon: {
        width: 20,
        height: 20
    },
    input_box_label: {
        height: 15,
        opacity: 0.5,
        fontSize: 12,
        fontWeight: 'normal',
        fontStyle: 'normal',
        textAlign: 'left',
        color: '#ffffff'
    },
    input_box_input: {
        borderWidth: 0,
        borderBottomWidth: 0,
        fontSize: 16,
        height: 38,
        paddingTop: 10,
        paddingBottom: 10,
        fontWeight: '600',
        color: '#ffffff',
    },
    input_box_input_placeholder: {
        position: 'absolute',
        top: 34.5,
        left: 0,
        width: '100%',
        height: 15,
        fontSize: 12,
        fontWeight: 'normal',
        fontStyle: 'normal',
        letterSpacing: 0.26,
        textAlign: 'left',
        color: '#a1a1a1'
    },
    input_box_input_action_placeholder: {
        top: 26,
    },
    select_box_input_placeholder: {
        position: 'absolute',
        top: 13,
        left: 0,
        width: '100%',
        height: 15,
        fontSize: 12,
        fontWeight: 'normal',
        fontStyle: 'normal',
        letterSpacing: 0.26,
        textAlign: 'left',
        color: '#a1a1a1'
    },
    select_box: {
        borderWidth: 0,
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 10,
        paddingBottom: 10,
        height: 41,
        flexDirection: 'row'
    },
    select_box_content: {
        flex: 1,
    },
    select_box_caret: {
        width: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    select_box_caret_icon: {
        width: 14,
        height: 14
    },
    switch_box_switch: {
        width: 60,
        justifyContent: 'flex-start',
        alignItems: 'flex-end'
    },
    action_box: {
        borderWidth: 0,
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 10,
        paddingBottom: 6,
        height: 40,
        flexDirection: 'row'
    },
    action_box_content: {
        flex: 1,
    },
    action_box_text: {
        fontSize: 14,
        fontWeight: '500',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'left',
        color: '#ffffff'
    },
    title_box: {
        borderWidth: 0,
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 10,
        paddingBottom: 6,
        height: 40,
        flexDirection: 'row'
    },
    title_box_content: {
        borderWidth: 0,
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 10,
        paddingBottom: 6,
        height: 40,
        flexDirection: 'row'
    },
    title_box_text: {
        height: 15,
        opacity: 0.5,
        fontSize: 12,
        fontWeight: '500',
        textAlign: 'left',
        color: '#ffffff'
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