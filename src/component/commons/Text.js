import styles from './styles'
import React, { Component } from 'react'
import {
    Text as RNText,
} from 'react-native'

export class Text extends Component {
    render() {
        return (
            <RNText {...this.props} style={[styles.text, this.props.style]}>
                {this.props.children}
            </RNText>
        )
    }
}

export default Text