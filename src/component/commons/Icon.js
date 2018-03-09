import styles from './styles'
import React, { Component } from 'react'
import {
    Image as RNImage,
} from 'react-native'

export class Icon extends Component {
    render() {
        return <RNImage {...this.props} style={[styles.icon, this.props.style]} />
    }
}

export default Icon