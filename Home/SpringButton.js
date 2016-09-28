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
    this._onPressOut = this._onPressOut.bind(this);
    this.runAnimation = this.runAnimation.bind(this);
  }

  componentWillMount() {

  }
  
  componentDidMount() {
    this.state.scale.setValue(1.5); 
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
    console.log('pressed');
    // Animate the update
    this.runAnimation(1)
  }

  _onPressOut() {
    console.log('un pressed');
    // Animate the update
    this.state.scale.setValue(1);
    this.runAnimation(1.5);
  }

  render() {
    return (
      <View style={{zIndex: 100}}>
        <TouchableWithoutFeedback 
          onPressIn={this._onPressIn}
          onPressOut={this._onPressOut}
        >
          <View>
            <Animated.Text style={[styles.welcome, {
              backgroundColor: "#909090",
              padding: 10,
              transform: [
                {scale: this.state.scale}
              ]
            }]}>
              Funny
            </Animated.Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});

module.exports = SpringButton;