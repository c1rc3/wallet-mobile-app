import React, { Component } from 'react'
import { View, Image } from 'react-native'
import { Text, Button, Touchable, Container } from '../commons'
import LinearGradient from 'react-native-linear-gradient'
import styles from './styles'
import icons from '../../config/icons'
import conf from '../../config'
import _ from 'lodash'

class PasscodeButton extends Component {
    render() {
        return (
            <View style={styles.button_item_container}>
                <Touchable onPress={this.props.onPress}>
                    <View style={[styles.button_item, this.props.style]} >
                        <Text style={styles.button_item_text}>{this.props.text || ''}</Text>
                    </View>
                </Touchable>
            </View>
        )
    }
}

class BackspaceButton extends Component {
    render() {
        return (
            <View style={styles.button_item_container}>
                <Touchable onPress={this.props.onPress}>
                    <View style={[styles.button_item, { backgroundColor: 'transparent' }]} >
                        <Image source={icons.backspace} />
                    </View>
                </Touchable>
            </View>
        )
    }
}

class BulletItem extends Component {
    render() {
        return (
            <View style={[styles.bullet_item, this.props.active ? styles.bullet_item_active : null]}>
                {
                    this.props.active ? <LinearGradient colors={['#0dc5d1', '#52eeff']} style={{ flex: 1 }} /> : null
                }
            </View>
        )
    }
}

class PasscodeItem {
    active = false
    value = null
}

export default class Passcode extends Component {
    constructor(props) {
        super(props)
        let model = []
        for (let i = 0; i < conf.app.passcode_length; i++) {
            model.push(new PasscodeItem())
        }
        this.state = {
            model: model,
            hint: null
        }
    }
    render() {
        let { title = '' } = this.props
        return (
            <Container>
                <Text style={styles.title}>{title}</Text>
                {this._renderBullets()}
                {this._renderHint()}
                <View style={styles.button_container}>
                    <View style={styles.button_row}>
                        <PasscodeButton onPress={() => this.onSelectNumber(1)} text={'1'} />
                        <PasscodeButton onPress={() => this.onSelectNumber(2)} text={'2'} />
                        <PasscodeButton onPress={() => this.onSelectNumber(3)} text={'3'} />
                    </View>
                    <View style={styles.button_row}>
                        <PasscodeButton onPress={() => this.onSelectNumber(4)} text={'4'} />
                        <PasscodeButton onPress={() => this.onSelectNumber(5)} text={'5'} />
                        <PasscodeButton onPress={() => this.onSelectNumber(6)} text={'6'} />
                    </View>
                    <View style={styles.button_row}>
                        <PasscodeButton onPress={() => this.onSelectNumber(7)} text={'7'} />
                        <PasscodeButton onPress={() => this.onSelectNumber(8)} text={'8'} />
                        <PasscodeButton onPress={() => this.onSelectNumber(9)} text={'9'} />
                    </View>
                    <View style={styles.button_row}>
                        <View style={styles.button_item_container} />
                        <PasscodeButton onPress={() => this.onSelectNumber(0)} text={'0'} />
                        <BackspaceButton onPress={() => this.onRemoveNumber()} />
                    </View>
                </View>
            </Container>
        )
    }
    _renderBullets() {
        return (
            <View style={styles.bullet_container}>
                {
                    this.state.model.map((item, key) => (
                        <BulletItem key={key} active={item.value !== null} />
                    ))
                }
            </View>
        )
    }
    _renderHint() {
        if (!this.state.hint) {
            return null
        }
        return (
            <Touchable onPress={() => this.onPressHint()}>
                <View style={styles.hint_container}>
                    <View style={styles.hint_caret} />
                    <View style={styles.hint_content}>
                        <Text style={styles.hint_title}>HINT</Text>
                        <Text style={styles.hint_msg}>{this.state.hint}</Text>
                    </View>
                </View>
            </Touchable>
        )
    }
    verifySubmitPasscode() {
        if (!this.state.model.find(i => i.value === null) && _.isFunction(this.props.onSubmit)) {
            this.props.onSubmit(this.getValue())
            // setTimeout(() => this.props.onSubmit(this.getValue()), 100)
        }
    }
    onSelectNumber(value) {
        let item = this.state.model.find(i => i.value === null)
        let isSubmited = false
        if (_.isNumber(value) && item) {
            item.value = value
            this.setState({
                model: this.state.model
            }, () => {
                this.verifySubmitPasscode()
            })
        }
        // if (!this.state.model.find(i => i.value === null) && _.isFunction(this.props.onSubmit)) {
        //     this.props.onSubmit(this.getValue())
        //     // setTimeout(() => this.props.onSubmit(this.getValue()), 100)
        // }
    }
    onPressHint() {
        this.setState({
            hint: ''
        })
    }
    onRemoveNumber() {
        let idx = _.findLastIndex(this.state.model, i => i.value !== null)
        if (this.state.model[idx]) {
            this.state.model[idx].value = null
            this.setState({
                model: this.state.model
            })
        }
    }
    getValue() {
        return this.state.model.map(i => i.value).join('')
    }
    setHint(hint) {
        this.setState({
            hint: hint
        })
    }
    resetPasscode() {
        this.state.model.forEach(item => {
            item.value = null
        })
        this.setState({
            model: this.state.model
        })
    }
}