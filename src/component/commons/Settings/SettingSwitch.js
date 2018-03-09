import styles from './styles'
import React, { Component } from 'react'
import {
    View,
} from 'react-native'
import Switch from '../Switch'
import Text from '../Text'

export class SettingSwitch extends Component {
    render() {
        return (
            <View style={styles.input_box_container}>
                {this.props.label ? <Text style={styles.input_box_label}>{this.props.label}</Text> : null}
                <View style={styles.action_box} >
                    <View style={styles.action_box_content}>
                        <Text style={styles.action_box_text}>
                            {this.props.text}
                        </Text>
                    </View>
                    <View style={styles.switch_box_switch}>
                        <Switch
                            value={true}
                            onValueChange={(val) => console.log(val)}
                        />
                    </View>
                </View>
            </View>
        )
    }
}

export default SettingSwitch