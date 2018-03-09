import React, { Component } from 'react'
import {
    TouchableOpacity,
} from 'react-native'

export class Touchable extends Component {
    render() {
        return (
            <TouchableOpacity {...this.props} style={this.props.style}>
                {this.props.children}
            </TouchableOpacity>
        )
    }
}

export default Touchable