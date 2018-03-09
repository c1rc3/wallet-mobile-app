
import React, { Component } from 'react'
import { View, Image } from 'react-native'
import { Text, Touchable } from '../commons'
import styles from './styles'

export default class NotificationRightAction extends Component {
    render() {
        return (
            <Touchable>
                <View style={[styles.action_container, this.props.style]}>
                    <Text style={styles.action_text}>{this.props.text}</Text>
                </View>
            </Touchable>
        )
    }
}