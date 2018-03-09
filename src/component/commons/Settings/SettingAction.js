import styles from './styles'
import React, { Component } from 'react'
import {
    View,
} from 'react-native'
import icons from '../../../config/icons'
import Touchable from '../Touchable'
import Icon from '../Icon'
import Text from '../Text'

export class SettingAction extends Component {
    render() {
        return (
            <View style={styles.input_box_container}>
                {
                    this.props.label ? <Text style={styles.input_box_label}>{this.props.label}</Text> : null
                }
                <Touchable>
                    <View style={styles.action_box} >
                        <View style={styles.action_box_content}>
                            <Text style={styles.action_box_text}>
                                {this.props.text}
                            </Text>
                        </View>
                        <View style={styles.select_box_caret}>
                            <Icon source={icons.backspace} style={styles.select_box_caret_icon} />
                        </View>
                    </View>
                </Touchable>
            </View>
        )
    }
}

export default SettingAction