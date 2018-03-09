import React, { Component } from 'react'
import {
    Text,
    Animated,
    TouchableWithoutFeedback,
} from 'react-native'
import styles from './styles'

export default class Switch extends Component {
    static defaultProps = {
        value: false,
        onValueChange: () => null,
        disabled: false,
        activeText: '',
        inActiveText: '',
        backgroundActive: '#8ebff8',
        backgroundInactive: '#e3e3e3',
        circleActiveColor: '#4a90e2',
        circleInActiveColor: '#fff',
        circleBorderColor: '#4a90e2',
        circleBorderWidth: 0,
        circleSize: 26.4,
        barHeight: 15,
        barWidth: 45,
    };

    constructor(props, context) {
        super(props, context)

        this.state = {
            value: props.value,
            transformSwitch: new Animated.Value(props.value ? props.circleSize / 2 : -props.circleSize),
            backgroundColor: new Animated.Value(props.value ? 75 : -75),
            circleColor: new Animated.Value(props.value ? 75 : -75)
        }

        this.handleSwitch = this.handleSwitch.bind(this)
        this.animateSwitch = this.animateSwitch.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        const { disabled } = this.props
        if (nextProps.value === this.props.value) {
            return
        }
        if (disabled) {
            return
        }

        this.animateSwitch(nextProps.value, () => {
            this.setState({ value: nextProps.value })
        })
    }

    handleSwitch() {
        const { value } = this.state
        const { onValueChange, disabled } = this.props
        if (disabled) {
            return
        }

        this.animateSwitch(!value, () => {
            this.setState({ value: !value }, () => onValueChange(this.state.value))
        })
    }

    animateSwitch(value, cb = () => { }) {
        let newVal = (this.props.barWidth - this.props.circleSize + 4) / 2
        Animated.parallel([
            Animated.spring(this.state.transformSwitch, {
                toValue: value ? newVal : -newVal
                // toValue: value ?  this.props.circleSize / 2 : -this.props.circleSize / 2
            }),
            Animated.timing(this.state.backgroundColor, {
                toValue: value ? 75 : -75,
                duration: 200
            }),
            Animated.timing(this.state.circleColor, {
                toValue: value ? 75 : -75,
                duration: 200
            })
        ]).start(cb)
    }

    render() {
        const {
            transformSwitch,
            backgroundColor,
            circleColor,
        } = this.state

        const {
            backgroundActive,
            backgroundInactive,
            circleActiveColor,
            circleInActiveColor,
            activeText,
            inActiveText,
            circleSize,
            containerStyle,
            activeTextStyle,
            inactiveTextStyle,
            barHeight,
            barWidth,
            circleBorderColor,
            circleBorderWidth
        } = this.props

        const interpolatedColorAnimation = backgroundColor.interpolate({
            inputRange: [-75, 75],
            outputRange: [backgroundInactive, backgroundActive]
        })

        const interpolatedCircleColor = circleColor.interpolate({
            inputRange: [-75, 75],
            outputRange: [circleInActiveColor, circleActiveColor]
        })

        return (
            <TouchableWithoutFeedback onPress={this.handleSwitch}>
                <Animated.View style={[
                    styles.container,
                    containerStyle,
                    { backgroundColor: interpolatedColorAnimation, width: barWidth, height: barHeight, borderRadius: circleSize }
                ]}>
                    <Animated.View style={[
                        styles.animatedContainer,
                        { left: transformSwitch, width: barWidth },
                    ]}>
                        <Text style={[styles.text, styles.paddingRight, activeTextStyle]}>
                            {activeText}
                        </Text>
                        <Animated.View style={[styles.circle, { borderWidth: circleBorderWidth, borderColor: circleBorderColor, backgroundColor: interpolatedCircleColor, width: circleSize, height: circleSize, borderRadius: circleSize / 2 }]} />
                        <Text style={[styles.text, styles.paddingLeft, inactiveTextStyle]}>
                            {inActiveText}
                        </Text>
                    </Animated.View>
                </Animated.View>
            </TouchableWithoutFeedback>
        )
    }
}
