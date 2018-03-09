import styles from './styles'
import React, { Component } from 'react'
import _ from 'lodash'
import {
    View,
} from 'react-native'
import Touchable from '../Touchable'
import Icon from '../Icon'
import Text from '../Text'
import Input from '../Input'

export class SettingInput extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: ''
        }
    }
    render() {
        if (this.props.rightAction && this.props.rightActionIcon) {
            return (
                <View style={styles.input_box_container}>
                    <View style={styles.input_box_content_row}>
                        <View style={styles.input_box_content_icon}>
                            {this._renderActionPlaceholder()}
                            <Text style={styles.input_box_label}>{this.props.label}</Text>
                            <Input onChangeText={value => this.onChangeText(value)} placeholder={''} style={styles.input_box_input}></Input>
                        </View>
                        <View style={styles.input_box_icon_container}>
                            <Touchable onPress={this.props.rightAction}>
                                <Icon source={this.props.rightActionIcon} style={styles.input_box_icon} />
                            </Touchable>
                        </View>
                    </View>
                </View>
            )
        }
        return (
            <View style={styles.input_box_container}>
                {this.props.label ? <Text style={styles.input_box_label}>{this.props.label}</Text> : null}
                {this._renderPlaceholder()}
                <Input {...this.props} onChangeText={value => this.onChangeText(value)} placeholder={''} style={styles.input_box_input}></Input>
            </View>
        )
    }
    onChangeText(value) {
        this.setState({ value })
        if (_.isFunction(this.props.onChangeText)) {
            this.props.onChangeText(value)
        }
    }
    _renderPlaceholder() {
        if (this.state.value) {
            return null
        }
        return (
            <Text style={styles.input_box_input_placeholder}>{this.props.placeholder}</Text>
        )
    }
    _renderActionPlaceholder() {
        if (this.state.value) {
            return null
        }
        return (
            <Text style={[styles.input_box_input_placeholder, styles.input_box_input_action_placeholder]}>{this.props.placeholder}</Text>
        )
    }
}

export default SettingInput