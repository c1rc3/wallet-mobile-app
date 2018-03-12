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
    static defaultProps = {
        caret: true
    }
    render() {
        return (
            <View style={styles.input_box_container}>
                {
                    this.props.label ? <Text style={styles.input_box_label}>{this.props.label}</Text> : null
                }
                <Touchable>
                    <View style={styles.action_box} >
                        {this.props.icon ? <View style={styles.action_box_icon_container}>
                            <Icon source={this.props.icon} style={styles.action_box_icon} />
                        </View> : null}
                        <View style={styles.action_box_content}>
                            <Text style={styles.action_box_text}>
                                {this.props.text}
                            </Text>
                        </View>
                        {this.props.caret ? <View style={styles.select_box_caret}>
                            <Icon source={icons.backspace} style={styles.select_box_caret_icon} />
                        </View> : null}
                    </View>
                </Touchable>
            </View>
        )
    }
}

export default SettingAction