import React from 'react'
import { Container, ScrollView } from '../../component/commons'
import CommonNavBar from '../../component/navbar/common'
import { SCREEN_OPTIONS } from '../const'
import NotificationItem from '../../component/notification-item'
import SwipeAction from '../../component/notification-item/swipe-action'
import Swipeable from 'react-native-swipeable'

class NotificationInfo { }

export default class NotificationScreen extends React.Component {
    static navigatorStyle = {
        ...SCREEN_OPTIONS.navBarHidden
    }
    constructor(props) {
        super(props)
        this.state = {
            items: [
                new NotificationInfo(),
                new NotificationInfo(),
                new NotificationInfo(),
                new NotificationInfo(),
                new NotificationInfo(),
                new NotificationInfo(),
                new NotificationInfo(),
                new NotificationInfo()
            ]
        }
    }
    render() {
        return (
            <Container>
                <CommonNavBar onBack={() => this.props.navigator.pop()} title={'NOTIFICATIONS'} />
                <ScrollView onScrollBeginDrag={() => this.onScroll()}>
                    {this._renderNotifications()}
                </ScrollView>
            </Container>
        )
    }
    _renderRightButtons() {
        return [
            <SwipeAction key={0} text={'Clear'} />
        ]
    }
    _renderNotification(item, key) {
        return (
            <Swipeable
                onSwipeStart={() => this.onSwipeStart(item)}
                rightButtons={this._renderRightButtons()} key={key}
                onRef={ref => {
                    item.ref = ref
                    this.setState({ items: this.state.items })
                }}>
                <NotificationItem key={key} />
            </Swipeable>
        )
    }
    onScroll() {
        this.state.items.forEach(item => {
            item.ref.recenter()
        })
    }
    onSwipeStart(item) {
        this.state.items.forEach(i => {
            if (item != i) {
                i.ref.recenter()
            }
        })
    }
    _renderNotifications() {
        return this.state.items.map((item, key) => this._renderNotification(item, key))
    }
}