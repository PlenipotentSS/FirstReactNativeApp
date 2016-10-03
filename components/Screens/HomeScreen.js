'use strict';

import React from 'react';
import {
  AppRegistry,
  Animated,
  NavigatorIOS,
  StyleSheet,
  Text,
  View
} from 'react-native';

//queue for loading timer
var LOADING = {};

//timer mixin for ease
var TimerMixin = require('react-timer-mixin');

var SpringButton = require('../Buttons/SpringButton');

var GyroscopeManager = require('../Managers/GyroscopeManager');
var AccelerometerManager = require('../Managers/AccelerometerManager');
var MagnetometerManager = require('../Managers/Magnetometer');

class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      openingScales: [new Animated.Value(0),new Animated.Value(0),new Animated.Value(0)],
      routes: {
        gyroscope: { title: "Gyroscope", component: GyroscopeManager},
        accelerometer: { title: "Accelerometer", component: AccelerometerManager},
        magnetometer: { title: "Magnetometer", component: MagnetometerManager}
      }
    };
    this._handleNavigationPress = this._handleNavigationPress.bind(this);
    this.runOpenAnimation = this.runOpenAnimation.bind(this);
    this.runCloseAnimation = this.runCloseAnimation.bind(this);
  }

  runOpenAnimation(delay) {
    // spring to start and twirl after decay finishes
    Animated.stagger(delay,[            
      Animated.spring(
        this.state.openingScales[1],
        {
          toValue: 1
        }
      ),
      Animated.parallel([          // after decay, in parallel:
        Animated.spring(
          this.state.openingScales[0],
          {
            toValue: 1
          }
        ),
        Animated.spring(
          this.state.openingScales[2],
          {
            toValue: 1
          }
        )
      ]),
    ]).start(); 
  }

  runCloseAnimation() {
    Animated.parallel([
      Animated.spring(
        this.state.openingScales[0],
        {
          toValue: 0
        }
      ),
      Animated.spring(
        this.state.openingScales[1],
        {
          toValue: 0
        }
      ),
      Animated.spring(
        this.state.openingScales[2],
        {
          toValue: 0
        }
      )
    ]).start();
  }

  componentDidMount() {
    // get current route from navigation
    var currentRoute = this.props.navigator.navigationContext.currentRoute;

    //add listener for an viewWillAppear from Navigation stack (only acts for current route)
    this.props.navigator.navigationContext.addListener('didfocus', (event) => {
      if (currentRoute === event.data.route) {
        this.runOpenAnimation(200);
      }
    });
  }

  componenetWillUnmount() {
    console.log('unmounted');
  }

  _handleNavigationPress(route) {
    this.runCloseAnimation();
    this.props.navigator.push(route);
  }

  render() {
    let firstScale = this.state.openingScales[0];
    let secondScale = this.state.openingScales[1];
    let thirdScale = this.state.openingScales[2];
    let buttons = ['gyroscope','accelerometer','magnetometer'];
    return (
      <View style={styles.container}>
        {this.state.openingScales.map(function(scale, index) {
          let key = `scale_key_${index}`;
          let action = buttons[index];
          let thisRoute = this.state.routes[action];


          return (<Animated.View key={key} style={{
              transform: [
                {scale: scale}
              ]
            }}
          >
            <SpringButton action={this._handleNavigationPress.bind(this, thisRoute)} title={thisRoute.title} />
          </Animated.View>
          )
        }.bind(this))}
        <Text />
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

module.exports = HomeScreen;