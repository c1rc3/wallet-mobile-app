import styles from './styles'
import React, { Component } from 'react'
import {
    View,
} from 'react-native'
import Text from '../Text'

export class SettingTitle extends Component {
    render() {
        return (
            <View style={styles.input_box_container}>
                <View style={styles.title_box} >
                    <View style={styles.title_box_content}>
                        <Text style={styles.title_box_text}>{this.props.text}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

export default SettingTitle