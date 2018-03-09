export default {
    wallet_overview_container: {
        flex: 1,
        padding: 16,
    },
    wallet_overview_content: {
        flex: 1,
        height: 213,
        borderRadius: 8,
        backgroundColor: '#172132',
        flexDirection: 'column',
        overflow: 'hidden'
    },
    wallet_overview_info: {
        flexDirection: 'row',
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 10
    },
    wallet_overview_icon: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#efefef'
    },
    wallet_overview_info_specs: {
        flex: 1,
        flexDirection: 'column',
        paddingLeft: 12
    },
    wallet_overview_info_row: {
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    wallet_overview_info_spacing: {
        marginTop: 2
    },
    wallet_overview_info_type: {
        height: 18,
        fontSize: 14,
        color: '#dedede'
    },
    wallet_overview_info_est: {
        height: 18,
        fontSize: 14,
        textAlign: 'right',
        color: '#ffffff'
    },
    wallet_overview_info_amount: {
        height: 37,
        fontSize: 30,
        fontWeight: '500',
        color: '#ffffff'
    },
    wallet_overview_info_ratio: {
        height: 18,
        fontSize: 12,
        fontWeight: '500',
        lineHeight: 18,
        textAlign: 'right',
        color: '#7ed321'
    },
    //chart
    wallet_overview_chart: {
        flex: 1
    },
    //transactions
    transaction_container: {
    },
    transaction_title: {
        height: 16,
        fontSize: 13,
        paddingLeft: 16,
        paddingRight: 16,
        fontWeight: '500',
        fontStyle: 'normal',
        textAlign: 'left',
        color: '#9b9b9b'
    },
    fixed_bottom: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: 70
    },
    fixed_bottom_button_container: {
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        height: '100%',
        paddingBottom: 14,
        flexDirection: 'row',
        paddingLeft: 14,
        paddingRight: 14
    },
    button_container: {
        flex: 1,
        paddingLeft: 12,
        paddingRight: 12
    },
    fixed_bottom_button: {
    },
    send_button: {
        width: 'auto',
        backgroundColor: '#71b62b'
    },
    receive_button: {
        width: 'auto',
        backgroundColor: '#ef455a'
    },
    scroll_content_offset: {
        height: 62,
        opacity: 0
    },
    //create new wallet
    cnw_block: {
        marginTop: 20
    },
    cnw_title_container: {
        height: 24,
        justifyContent: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#36435a',
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowRadius: 0,
        shadowOpacity: 1
    },
    cnw_title: {
        height: 15,
        opacity: 0.5,
        fontSize: 12,
        fontWeight: '500',
        textAlign: 'left',
        color: '#ffffff'
    },
    cnw_block_content: {
        paddingLeft: 20,
        paddingRight: 20
    },
    done_button_container: {
        flex: 1,
        alignItems: 'center'
    },
    button_add_more_container: {
        padding: 20
    },
    button_add_more: {
        height: 48,
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: '#505967',
        justifyContent: 'center'
    },
    button_add_more_text: {
        fontSize: 12,
        fontWeight: 'normal',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'center',
        color: '#ffffff7f'
    },
    qrcode_container: {
        flex: 1,
        paddingTop: '20%',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    button_navbar: {
        paddingRight: 0
    },
    button_navbar_text: {
        fontSize: 17,
        fontWeight: '300',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'right',
        color: '#4fccff',
    }
}