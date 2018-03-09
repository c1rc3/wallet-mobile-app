import styles from './styles'
import React, { Component } from 'react'
import {
    Image as RNImage,
} from 'react-native'

export class Image extends Component {
    render() {
        return <RNImage {...this.props} style={[styles.image, this.props.style]} />
    }
}

export default Image