import styles from './styles'
import React, { Component } from 'react'
import { Dimensions } from 'react-native'
import _ from 'lodash'
import {
    View,
    ScrollView as RNScrollView,
} from 'react-native'

let w = Dimensions.get('window')

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
    static defaultProps = {
        stickyHeaderIndices: [0],
        horizontal: false,
        scrollEventThrottle: 400,
        onSwipeDown: () => null,
        swipeDownHeight: w.height / 5
    }
    _processOnScroll(event) {
        if (_.isFunction(this.props.onSwipeDown) && event.nativeEvent.contentOffset.y < -this.props.swipeDownHeight) {
            this.props.onSwipeDown(event)
        }
    }
    render() {
        let processOnScroll = _.isFunction(this.props.onSwipeDown) ? e => this._processOnScroll(e) : this.props.onScroll
        return (
            <RNScrollView {...this.props} onScroll={processOnScroll} style={[styles.scroll_container, this.props.style]}>
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