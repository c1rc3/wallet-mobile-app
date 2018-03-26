import React, { Component } from 'react'
import { View, Image } from 'react-native'
import { Text, Touchable } from '../commons'
import styles from './styles'
import Formatter from '../../util/Formater'

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
                            <Text style={styles.est_price}>${Formatter.decimal(model.toUsd)}</Text>
                        </View>
                        <View style={[styles.row, styles.row2]}>
                            <Text style={styles.amount}>{Formatter.ccvalue(model.amount)}</Text>
                            <Text style={styles.ratio}>{Formatter.decimal(model.ratio)}%</Text>
                        </View>
                    </View>
                </View>
            </Touchable>
        )
    }
}