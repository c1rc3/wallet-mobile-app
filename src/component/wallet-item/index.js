import React, { Component } from 'react'
import { View, Image } from 'react-native'
import { Text, Touchable } from '../commons'
import styles from './styles'

export default class WalletItem extends Component {
    render() {
        return (
            <Touchable onPress={this.props.onPress}>
                <View style={styles.container}>
                    <View style={styles.icon_container}>
                        <Image style={styles.icon} />
                    </View>
                    <View style={styles.infos}>
                        <View style={styles.row}>
                            <Text style={styles.name}>Bitcoin</Text>
                            <Text style={styles.est_price}>$1233.45</Text>
                        </View>
                        <View style={[styles.row, styles.row2]}>
                            <Text style={styles.amount}>0.000041</Text>
                            <Text style={styles.ratio}>12.41%</Text>
                        </View>
                    </View>
                </View>
            </Touchable>
        )
    }
}