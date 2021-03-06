import React, { Component } from 'react'

import { View } from 'react-native'
import { Text, ButtonIcon } from '../commons'
import styles from './styles'
import icons from '../../config/icons'

export default class WalletDetailNavBar extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.left_button}>
                    <ButtonIcon onPress={this.props.onBack} icon={icons.back} />
                </View>
                <View style={styles.title_container}>
                    <Text style={styles.title}>{this.props.title}</Text>
                </View>
                <View style={styles.right_button}>
                    <ButtonIcon onPress={this.props.onEdit} icon={icons.edit} />
                    <ButtonIcon onPress={this.props.onQr} icon={icons.qr} />
                </View>
            </View>
        )
    }
}