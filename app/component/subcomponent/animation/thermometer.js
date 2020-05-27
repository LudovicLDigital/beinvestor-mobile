import React, {Component} from "react";
import {Animated} from "react-native";
import LottieView from 'lottie-react-native';

/**
 * Props
 *  - endFrame : must be between 0 and 12 , 12 will be the max
 */
export default class Thermometer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: new Animated.Value(0),
        }
    }

    componentDidMount() {
        this.animation.play();
        // Or set a specific startFrame and endFrame with:
        const endFrame = this.props.endFrame ? this.props.endFrame : 12;
        this.animation.play(0, endFrame);
    }

    render() {
        return (
                <LottieView
                    ref={animation => {
                        this.animation = animation;
                    }}
                    loop={false}
                    style={{flex: 1, width: 10, height: 10}}
                    source={require('../../../assets/thermometer-animation.json')}
                    progress={this.state.progress} />
        )
    }
}