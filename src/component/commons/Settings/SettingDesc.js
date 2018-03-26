import styles from './styles'
import React, { Component } from 'react'
import {
    View,
} from 'react-native'
import Text from '../Text'

export class SettingDesc extends Component {
    render() {
        return (
            <View style={styles.desc_box_container}>
                <View style={styles.desc_box} >
                    <View style={styles.desc_box_content}>
                        <Text style={styles.desc_box_text}>{this.props.text}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

export default SettingDesc