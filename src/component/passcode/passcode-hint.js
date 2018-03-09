import React, { Component } from 'react'
import { View, Image } from 'react-native'
import { Text, NavButton, Touchable, Container, Input, NavButtonContainer } from '../commons'
import LinearGradient from 'react-native-linear-gradient'
import styles from './styles'
import icons from '../../config/icons'
import _ from 'lodash'

export default class PasscodeHint extends Component {
    constructor(props) {
        super(props)
        this.state = {
            model: ''
        }
    }
    render() {
        let { title = '' } = this.props
        return (
            <Container>
                <Text style={[styles.title, styles.title_hint]}>{title}</Text>
                <View style={styles.hint_input_container}>
                    <Input onChangeText={value => this.setState({ model: value })}
                        autoFocus={true}
                        onSubmitEditing={() => this.onSubmit()}
                        style={styles.hint_input} />
                </View>
                <NavButtonContainer>
                    <NavButton onPress={() => this.onSkip()} text={'SKIP'} position={'left'} />
                    <NavButton onPress={() => this.onSubmit()} text={'DONE'} />
                </NavButtonContainer>
            </Container>
        )
    }
    onSubmit() {
        if (_.isFunction(this.props.onSubmit)) {
            this.props.onSubmit(this.state.model)
        }
    }
    onSkip() {
        if (_.isFunction(this.props.onSkip)) {
            this.props.onSkip()
        }
    }
}