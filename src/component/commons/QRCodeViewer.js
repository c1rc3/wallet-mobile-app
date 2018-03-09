import styles from './styles'
import React, { Component } from 'react'
import {
    View,
} from 'react-native'
import QRCode from 'react-native-qrcode'
import Text from './Text'

export class QRCodeViewer extends Component {
    render() {
        return (
            <View style={styles.qrcode_container}>
                <QRCode
                    value={this.props.value || 'empty'}
                    size={this.props.size || 180}
                    bgColor={this.props.bgColor || '#253042'}
                    fgColor={this.props.fgColor || '#fff'} />
                <Text style={styles.qrcode_title}>{this.props.title}</Text>
                <Text style={styles.qrcode_value}>{this.props.value}</Text>
            </View>
        )
    }
}

export default QRCodeViewer