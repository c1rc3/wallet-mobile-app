import styles from './styles'
import React, { Component } from 'react'
import _ from 'lodash'
import {
    Text as RNText,
    TouchableOpacity,
    View,
    ScrollView as RNScrollView,
    Image as RNImage,
    TextInput as RNTextInput,
    Alert as RNAlert
} from 'react-native'
import icons from '../../config/icons'
import QRCode from 'react-native-qrcode'
import Switch from './switch'
// import { Switch } from 'react-native-switch'

export class Text extends Component {
    render() {
        return (
            <RNText {...this.props} style={[styles.text, this.props.style]}>
                {this.props.children}
            </RNText>
        )
    }
}

export class Touchable extends Component {
    render() {
        return (
            <TouchableOpacity {...this.props} style={this.props.style}>
                {this.props.children}
            </TouchableOpacity>
        )
    }
}

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

export class Container extends Component {
    render() {
        let style = {}
        if (_.isNumber(this.props.padding)) {
            style = {
                paddingTop: this.props.padding
            }
        }
        return (
            <View style={[styles.container, style, this.props.style]}>
                {this.props.children}
            </View>
        )
    }
}

export class ScrollContainer extends Component {
    render() {
        return (
            <RNScrollView style={[styles.container, this.props.style]}>
                {this.props.children}
            </RNScrollView>
        )
    }
}

export class ScrollView extends Component {
    render() {
        return (
            <RNScrollView {...this.props} style={[styles.scroll_view, this.props.style]}>
                {this.props.children}
            </RNScrollView>
        )
    }
}

export class Image extends Component {
    render() {
        return <RNImage {...this.props} style={[styles.image, this.props.style]} />
    }
}

export class Icon extends Component {
    render() {
        return <RNImage {...this.props} style={[styles.icon, this.props.style]} />
    }
}

export class Input extends Component {
    render() {
        return <RNTextInput {...this.props} style={[styles.input, this.props.style]} underlineColorAndroid={'transparent'} />
    }
}

export class InputBox extends Component {
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

export class ActionBox extends Component {
    render() {
        return (
            <View style={styles.input_box_container}>
                {
                    this.props.label ? <Text style={styles.input_box_label}>{this.props.label}</Text> : null
                }
                <Touchable>
                    <View style={styles.action_box} >
                        <View style={styles.action_box_content}>
                            <Text style={styles.action_box_text}>
                                {this.props.text}
                            </Text>
                        </View>
                        <View style={styles.select_box_caret}>
                            <Icon source={icons.backspace} style={styles.select_box_caret_icon} />
                        </View>
                    </View>
                </Touchable>
            </View>
        )
    }
}

export class SwitchBox extends Component {
    render() {
        return (
            <View style={styles.input_box_container}>
                {this.props.label ? <Text style={styles.input_box_label}>{this.props.label}</Text> : null}
                <View style={styles.action_box} >
                    <View style={styles.action_box_content}>
                        <Text style={styles.action_box_text}>
                            {this.props.text}
                        </Text>
                    </View>
                    <View style={styles.switch_box_switch}>
                        <Switch
                            value={true}
                            onValueChange={(val) => console.log(val)}
                        />
                    </View>
                </View>
            </View>
        )
    }
}

export class SelectBox extends Component {
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

export class TitleBox extends React.Component {
    render() {
        return (
            <View style={styles.input_box_container}>
                <View style={styles.title_box} >
                    <View style={styles.title_box_content}>
                        <Text style={styles.title_box_text}>{this.props.text}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

export class QRCodeViewer extends React.Component {
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

export const Alert = RNAlert