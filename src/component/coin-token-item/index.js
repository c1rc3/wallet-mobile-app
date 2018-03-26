import React, { Component } from 'react'
import { View, Image } from 'react-native'
import { Text, Touchable, Icon } from '../commons'
import styles from './styles'
import icons from '../../config/icons'

export default class TransactionItem extends Component {
    render() {
        return (
            <Touchable onPress={this.props.onPress}>
                <View style={styles.container}>
                    <View style={styles.icon_container}>
                        <Image style={styles.icon} />
                    </View>
                    <View style={styles.infos}>
                        <View style={styles.row}>
                            <Text style={styles.name}>{this.props.name || '<noname>'}</Text>
                        </View>
                    </View>
                    {
                        !this.props.checked ? null : (
                            <View style={styles.status}>
                                <Icon source={icons.widget} />
                            </View>
                        )
                    }
                </View>
            </Touchable>
        )
    }
}