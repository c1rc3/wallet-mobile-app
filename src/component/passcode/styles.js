export default {
    title: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 17,
        marginTop: 60,
    },
    title_hint: {
        marginTop: 110,
    },
    bullet_container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 27,
        // marginBottom: 138,
        height: 15,
        width: 180
    },
    bullet_item: {
        width: 15,
        height: 15,
        borderWidth: 2,
        borderColor: '#fff',
        borderRadius: 12.5,
        overflow: 'hidden'
    },
    bullet_item_active: {
        borderColor: '#52eeff',
        backgroundColor: '#0dc5d1'
    },
    hint_container: {
        marginTop: 20,
        paddingLeft: 40,
        paddingRight: 40
    },
    hint_caret: {
        alignSelf: 'center',
        backgroundColor: '#f64056',
        width: 20,
        height: 20,
        transform: [{ rotate: '45deg' }],
        marginBottom: -10
    },
    hint_content: {
        backgroundColor: '#f64056',
        paddingTop: 11,
        paddingBottom: 13,
        borderRadius: 8
    },
    hint_title: {
        fontSize: 12,
        color: '#e6e6e6',
        textAlign: 'center',
        fontWeight: '600'
    },
    hint_msg: {
        fontSize: 20,
        color: '#fff',
        textAlign: 'center'
    },
    button_container: {
        position: 'absolute',
        bottom: 46,
        left: 0,
        width: '100%'
    },
    button_row: {
        marginLeft: 'auto',
        marginRight: 'auto',
        flexDirection: 'row',
        height: 68,
        width: 280,
        marginBottom: 15
    },
    button_item_container: {
        flex: 1,
        marginLeft: 'auto',
        alignItems: 'center'
    },
    button_item: {
        width: 68,
        height: 68,
        borderRadius: 34,
        backgroundColor: '#ffffff19',
        alignItems: 'center',
        justifyContent: 'center'
    },
    button_item_text: {
        // height: 20,
        fontSize: 34,
        color: '#fff',
        fontWeight: '300',
        textAlign: 'center'
    },
    hint_input_container: {
        flex: 1,
        paddingLeft: 40,
        paddingRight: 40,

    },
    hint_input: {
        borderColor: '#ffffff30',
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderBottomWidth: 2,
        marginTop: 20,
        fontSize: 22,
        paddingBottom: 5,
        color: '#fff',
        textAlign: 'center',
        fontWeight: '600'
    }
}