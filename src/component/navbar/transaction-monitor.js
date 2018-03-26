import React, { Component } from 'react'

import { View } from 'react-native'
import { Text, ButtonIcon } from '../commons'
import styles from './styles'
import icons from '../../config/icons'

export default class HomeNavBar extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.left_button}>
                    <ButtonIcon onPress={this.props.onNavLeft} icon={icons.menu} />
                </View>
                <View style={styles.title_container}>
                    <Text style={styles.title}>{`${this.props.title || ''}`.toUpperCase()}</Text>
                </View>
                <View style={styles.right_button}>
                    <ButtonIcon style={styles.btn_icon} iconStyle={styles.create_icon} onPress={this.props.onCreate} icon={icons.new_chat} />
                    <ButtonIcon style={styles.btn_icon} iconStyle={styles.icon} onPress={this.props.onNotification} icon={icons.notification} />
                </View>
            </View>
        )
    }
}