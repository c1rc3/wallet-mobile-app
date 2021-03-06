import React, { Component } from 'react'

import { View } from 'react-native'
import { Text, ButtonIcon, NavButton } from '../commons'
import styles from './styles'
import icons from '../../config/icons'

export default class ModalNavBar extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.left_button}>
                    <ButtonIcon onPress={this.props.onClose} icon={icons.close} iconStyle={styles.close_icon} />
                </View>
                <View style={styles.title_container}>
                    <Text style={styles.title}>{this.props.title}</Text>
                </View>
                <View style={styles.right_button}>
                    {this.props.renderRight ? this.props.renderRight() : this.renderRightButton()}
                </View>
            </View>
        )
    }
    renderRightButton() {
        return (
            this.props.onRight ? <NavButton onPress={this.props.onRight} text={this.props.rightText || 'Done'} /> : null
        )
    }
}