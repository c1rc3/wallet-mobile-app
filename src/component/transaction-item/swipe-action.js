
import React, { Component } from 'react'
import { View, Image } from 'react-native'
import { Text, Touchable } from '../commons'
import styles from './styles'

export default class WalletRightAction extends Component {
    render() {
        return (
            <Touchable>
                <View style={[styles.action_container, styles[`action${this.props.index}`], this.props.style]}>
                    <Image source={this.props.icon} style={styles.action_icon} />
                    <Text style={styles.action_text}>{this.props.text}</Text>
                </View>
            </Touchable>
        )
    }
}