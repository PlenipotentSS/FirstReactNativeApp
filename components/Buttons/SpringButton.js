'use strict';

import React from 'react';
import {
  AppRegistry,
  Animated,
  TouchableWithoutFeedback,
  StyleSheet,
  Text,
  View
} from 'react-native';

class SpringButton extends React.Component {

  constructor(props) {
    super(props)
    this.state = { 
      scale: new Animated.Value(0) 
    };
    this._onPressIn = this._onPressIn.bind(this);
    this._onPressOut = this._onPressOut.bind(this);;
    this._finishedPress = this._finishedPress.bind(this);
    this.runAnimation = this.runAnimation.bind(this);
  }

  componentDidMount() {
    this.state.scale.setValue(1.3); 
  }

  runAnimation(toValue) {
    Animated.spring(                          
      this.state.scale,                       
      {
        toValue: toValue,                  
        friction: 7,
        tension: 100       
      }
    ).start();
  }

  _onPressIn() {
    // Animate the update
    this.runAnimation(1);
  }

  _finishedPress() {
    this.props.action();
  }

  _onPressOut() {
    // Animate the update
    this.state.scale.setValue(1);
    this.runAnimation(1.3);
  }

  render() {
    let buttonStyle = [
      styles.button,
      this.props.style,
      {
        transform: [
          {scale: this.state.scale}
        ]
      }
    ];

    return (
      <View style={{zIndex: 100}}>
        <TouchableWithoutFeedback 
          onPress={this._finishedPress}
          onPressIn={this._onPressIn}
          onPressOut={this._onPressOut}
        >
          <View>
            <Animated.Text style={buttonStyle}>
              {this.props.title}
            </Animated.Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  button: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    backgroundColor: "#909090",
    padding: 10,
  }
});

module.exports = SpringButton;