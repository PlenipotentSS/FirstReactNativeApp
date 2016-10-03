/**
 * MagnetometerManager
 *
 * Created by Patrick Williams in beautiful Seattle, WA.
 */
'use strict';

import React from 'react';
import {
  Text,
  View,
  DeviceEventEmitter
} from 'react-native';

var SpringButton = require('../Buttons/SpringButton');

var {
  Magnetometer
} = require('NativeModules');

var magnetometerListener;

Magnetometer.setMagnetometerUpdateInterval(0.1);

var MagnetometerManager = React.createClass({
  getInitialState: function () {
    return {
      x: 0,
      y: 0,
      z: 0,
      gyro: false
    }
  },
  componentDidMount: function () {
    magnetometerListener = DeviceEventEmitter.addListener('MagnetometerData', function (data) {
      this.setState({
        x: data.magneticField.x.toFixed(5),
        y: data.magneticField.y.toFixed(5),
        z: data.magneticField.z.toFixed(5)
      });
    }.bind(this));
  },
  componentWillUnmount: function () {
    magnetometerListener.remove();
    Magnetometer.stopMagnetometerUpdates();
  },
  handleStart: function () {
    Magnetometer.startMagnetometerUpdates();
    this.setState({
      gyro: true
    });
  },
  handleStop: function () {
    Magnetometer.stopMagnetometerUpdates();
    this.setState({
      x: 0,
      y: 0,
      z: 0,
      gyro: false
    });
  },
  render: function() {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Text>x: {this.state.x}</Text>
        <Text>y: {this.state.y}</Text>
        <Text>z: {this.state.z}</Text>
        <Text />
        {
          (this.state.gyro) ?
          <SpringButton action={this.handleStop} style={{backgroundColor: 'red'}} title="Stop" /> :
          <SpringButton action={this.handleStart} style={{backgroundColor: 'green'}} title="Start" />
        }
      </View>
    );
  }
});

module.exports = MagnetometerManager;