import styles from './styles'
import React, { Component } from 'react'
import { Modal } from 'react-native'
import _ from 'lodash'
import {
    View,
} from 'react-native'
import icons from '../../../config/icons'
import Text from '../Text'
import Touchable from '../Touchable'
import Icon from '../Icon'
import Button from '../Button'

class SettingSelectItem extends Component {
    render() {
        if (this.props.render) {
            return this.props.render(this.props)
        }
        return (
            <Touchable onPress={this.props.onPress} style={styles.select_box_item}>
                <Text style={styles.select_box_item_text}>{this.props.label}</Text>
            </Touchable>
        )
    }
}

class SettingItemsModal extends Component {
    render() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.props.visible}
                onRequestClose={this.props.onClose}>
                <View style={styles.select_box_modal_container}>
                    {this.renderItems(this.props.items)}
                    {this.renderButtons()}
                </View>
            </Modal>
        )
    }
    renderItems(items = []) {
        if (!items.length) {
            return this.renderEmptyMsg()
        }
        return items.map(item => {
            return <SettingSelectItem {...item.props} onPress={() => this._onPressItem(item)} key={item.props.value} />
        })
    }
    _onPressItem(item) {
        if (_.isFunction(this.props.onSelect)) {
            this.props.onSelect(item.props.value)
            _.isFunction(this.props.onClose) ? this.props.onClose() : null
        }
    }
    renderEmptyMsg() {
        return (
            <Text>Empty</Text>
        )
    }
    renderButtons() {
        return (
            <Button onPress={this.props.onClose} style={styles.select_box_modal_close_btn} text={'Close'} />
        )
    }
}

export class SettingSelect extends Component {
    static Item = SettingSelectItem
    constructor(props) {
        super(props)
        this.state = {
            value: '',
            showModal: false
        }
    }
    render() {
        return (
            <View style={styles.input_box_container}>
                <Text style={styles.input_box_label}>{this.props.label}</Text>
                <Touchable onPress={() => this._showModal()}>
                    {this._renderPlaceholder()}
                    <View style={styles.select_box} >
                        <View style={styles.select_box_content}>
                            {this._renderSelectedItem()}
                        </View>
                        <View style={styles.select_box_caret}>
                            <Icon source={icons.dropdown} style={styles.select_box_caret_icon} />
                        </View>
                    </View>
                    <SettingItemsModal
                        onClose={() => this._showModal(false)}
                        onSelect={this.props.onChangeValue}
                        visible={this.state.showModal} items={this._getItems()} />
                </Touchable>
            </View>
        )
    }
    _showModal(flag = true) {
        this.setState({
            showModal: flag
        })
    }
    _renderSelectedItem() {
        let item = this._getItemByValue(this.props.selectedValue)
        if (item && item.props.label) {
            return (
                <Text style={styles.select_box_text}>{item.props.label}</Text>
            )
        }
        return null
    }
    _getItemByValue(value) {
        return this._getItems().find(item => (item.props && item.props.value === value))
    }
    _getItems() {
        let childs = this.props.children
        if (!_.isArray(this.props.children)) {
            childs = [this.props.children]
        }
        return childs
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

export default SettingSelect