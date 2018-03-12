import React from 'react'
import { Container, Text, Button } from '../../component/commons'
import { SCREEN_IDS } from '../const'
import { Navigation } from 'react-native-navigation'

export default class LeftSideBar extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <Container>
                <Button onPress={() => this.navToSettings()} text={'Settings'} />
            </Container>
        )
    }
    navToSettings() {
        this.navigationTo(SCREEN_IDS.settings)
    }
    navigationTo(link) {
        this.props.navigator.toggleDrawer({
            side: 'left',
            animated: true,
            to: 'closed'
        })
        Navigation.handleDeepLink({
            link: link
        })
    }
}