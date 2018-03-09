import React, { Component } from 'react'
import { View, Image } from 'react-native'
import { Text, Touchable } from '../commons'
import styles from './styles'

export default class TransactionItem extends Component {
    render() {
        return (
            <Touchable onPress={this.props.onPress}>
                <View style={styles.container}>
                    <View style={styles.icon_container}>
                        <Image style={styles.icon} />
                    </View>
                    <View style={styles.infos}>
                        <View style={styles.row}>
                            <Text style={styles.name}>Transaction 1</Text>
                            <Text style={styles.amount}>0.000041 BTC</Text>
                        </View>
                        <View style={[styles.row, styles.row2]}>
                            <Text style={styles.time}>Sep 25, 2017</Text>
                            <Text style={styles.est_price}>$1233.45</Text>
                        </View>
                    </View>
                </View>
            </Touchable>
        )
    }
}