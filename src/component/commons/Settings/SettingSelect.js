import styles from './styles'
import React, { Component } from 'react'
import _ from 'lodash'
import {
    View,
} from 'react-native'
import icons from '../../../config/icons'
import Text from '../Text'
import Touchable from '../Touchable'
import Icon from '../Icon'

export class SettingSelect extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: ''
        }
    }
    render() {
        return (
            <View style={styles.input_box_container}>
                <Text style={styles.input_box_label}>{this.props.label}</Text>
                <Touchable>
                    {this._renderPlaceholder()}
                    <View style={styles.select_box} >
                        <View style={styles.select_box_content}>

                        </View>
                        <View style={styles.select_box_caret}>
                            <Icon source={icons.backspace} style={styles.select_box_caret_icon} />
                        </View>
                    </View>
                </Touchable>
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
            <Text style={styles.select_box_input_placeholder}>{this.props.placeholder}</Text>
        )
    }
}

export default SettingSelect