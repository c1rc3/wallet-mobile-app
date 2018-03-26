import styles from './styles'
import React, { Component } from 'react'
import {
    TextInput as RNTextInput,
} from 'react-native'

export class Input extends Component {
    render() {
        return <RNTextInput {...this.props} style={[styles.input, this.props.style]} underlineColorAndroid={'transparent'} />
    }
}

export class RoundedInput extends Component {
    render() {
        return <RNTextInput {...this.props} style={[styles.rounded_input, this.props.style]} clearButtonMode={'always'} underlineColorAndroid={'transparent'} />
    }
}

export default Input