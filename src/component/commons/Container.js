import styles from './styles'
import React, { Component } from 'react'
import _ from 'lodash'
import {
    View,
    ScrollView as RNScrollView,
} from 'react-native'

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

export default Container