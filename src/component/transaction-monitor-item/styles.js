export default {
    container: {
        height: 88,
        flexDirection: 'row',
        paddingTop: 20,
        paddingBottom: 22,
        paddingLeft: 22,
        paddingRight: 22,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f1f118'
    },
    icon_container: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#9b9b9b',
        marginRight: 10,
        padding: 10
    },
    icon: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    row: {
        flexDirection: 'row',
        height: 20,
        justifyContent: 'space-between'
    },
    row2: {
        marginTop: 6
    },
    infos: {
        flex: 1,
        flexDirection: 'column',
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
        color: '#ffffff',
        height: 20,
        lineHeight: 20
    },
    est_price: {
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'right',
        height: 20,
        lineHeight: 20
    },
    amount: {
        height: 20,
        opacity: 0.5,
        fontSize: 16,
        textAlign: 'left',
        color: '#ffffff',
        fontWeight: '500'
    },
    ratio: {
        height: 20,
        fontSize: 16,
        textAlign: 'right',
        color: '#7ed321'
    },
    action_container: {
        height: '100%',
        flexDirection: 'column'
    },
    action_icon: {
        marginLeft: 25.5,
        width: 24,
        height: 24,
        resizeMode: 'contain',
        marginTop: 18
    },
    action0: {
        backgroundColor: '#8eb4ee'
    },
    action1: {
        backgroundColor: '#5d95ea'
    },
    action2: {
        backgroundColor: '#4d7bf3'
    },
    action_text: {
        width: 75,
        marginTop: 10,
        fontSize: 14,
        height: 18,
        textAlign: 'center',
        color: '#ffffff'
    }
}