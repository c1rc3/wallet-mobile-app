import styles from './styles'
import React, { Component } from 'react'
import {
    View,
    Image as RNImage,
} from 'react-native'
import Touchable from './Touchable'
import Text from './Text'

export class Button extends Component {
    render() {
        return (
            <Touchable onPress={this.props.onPress} style={[styles.button, this.props.style]}>
                <Text style={[this.props.textStyle]}>{this.props.text}</Text>
            </Touchable>
        )
    }
}

export class ButtonIcon extends Component {
    render() {
        return (
            <Touchable onPress={this.props.onPress} style={[styles.button_icon, this.props.style]}>
                <RNImage style={[styles.button_icon_image, this.props.iconStyle]} source={this.props.icon} />
            </Touchable>
        )
    }
}

export class RoundedButton extends Component {
    render() {
        return (
            <Touchable style={this.props.containerStyle} onPress={this.props.onPress}>
                <Text style={[styles.button_rounded, this.props.style]}>{this.props.text}</Text>
            </Touchable>
        )
    }
}

export class DashedButton extends Component {
    render() {
        return (
            <Touchable style={[styles.button_dashed_container, this.props.containerStyle]} onPress={this.props.onPress}>
                <Text style={[styles.button_dashed, this.props.style]}>{this.props.text}</Text>
            </Touchable>
        )
    }
}

export class RoundedStrokeButton extends Component {
    render() {
        return (
            <Touchable style={this.props.containerStyle} onPress={this.props.onPress}>
                <Text style={[styles.button_rounded, styles.button_rounded_stroke, this.props.style]}>{this.props.text}</Text>
            </Touchable>
        )
    }
}

export class NavButton extends Component {
    render() {
        let positionStyle = this.props.position === 'left' ? styles.nav_button_left : styles.nav_button_right
        return (
            <View>
                <Touchable onPress={this.props.onPress} >
                    <Text style={[styles.nav_button, positionStyle, this.props.style]}>{this.props.text}</Text>
                </Touchable>
            </View>
        )
    }
}

export class NavButtonContainer extends Component {
    render() {
        return (
            <View style={[styles.nav_button_container, this.props.style]}>
                {this.props.children}
            </View>
        )
    }
}

export default Button