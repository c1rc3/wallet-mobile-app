import React, { Component } from 'react'
import { View, Image } from 'react-native'
import { Text, Touchable } from '../commons'
import styles from './styles'

export default class TransactionItem extends Component {
    render() {
        return (
            <Touchable onPress={this.props.onPress}>
                <View style={styles.container}>
                    <View style={styles.infos}>
                        <Text style={styles.time}>Sep 25, 2017</Text>
                        <Text>
                            <Text style={styles.name}>Trade Successful</Text>
                            <Text style={styles.desc}> - $5000 was deposited into your account.</Text>
                        </Text>
                    </View>
                </View>
            </Touchable>
        )
    }
}