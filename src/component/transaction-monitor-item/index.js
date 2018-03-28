import React, { Component } from 'react'
import { View, Image } from 'react-native'
import { Text, Touchable, Icon } from '../commons'
import styles from './styles'
import Formatter from '../../util/Formater'
import icons from '../../config/icons'

export default class TransactionMonitorItem extends Component {
    render() {
        let model = this.props.model || {}
        return (
            <Touchable onPress={this.props.onPress}>
                <View style={styles.container}>
                    <View style={styles.icon_container}>
                        <Image style={styles.icon} />
                    </View>
                    <View style={styles.infos}>
                        <View style={styles.row}>
                            <Text style={styles.name}>{model.name || '<no name>'}</Text>
                            <Text style={styles.amount}>{Formatter.decimal(model.amount)}{model.symbol}</Text>
                        </View>
                        <View style={[styles.row, styles.row2]}>
                            <Text style={styles.address}>{model.publicKey || '<empty>'}</Text>
                            <Icon style={styles.notify_icon} source={icons.notification} />
                        </View>
                    </View>
                </View>
            </Touchable>
        )
    }
}