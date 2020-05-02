/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  NativeModules,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  Modal
} from 'react-native';

const { TaskManager } = NativeModules

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animating: false
    }
  }

  onCalculate = async () => {
    this.setState({ animating: true })
    try {
      let tasks = await TaskManager.cpuFunctions() //await = "wait till this line is finished"
      this.setState({ animating: false })
      setTimeout(() => {
        alert(`Result of CPU-intensive task is = ${Platform.OS == 'android' ? tasks : tasks[0].value}`)
      }, 300);
    } catch (error) {
      this.setState({ animating: false })
      setTimeout(() => {
        alert(`Error's: ${error}`)
      }, 300);
    }
  }

  render() {
    const { animating } = this.state
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.safeAreaView}>
          <TouchableOpacity onPress={this.onCalculate} style={styles.buttonStyle}>
            <Text style={styles.buttonText}>Calculate</Text>
          </TouchableOpacity>
          <Modal
            transparent={true}
            animationType="slide"
            visible={animating}
            onRequestClose={() => { }}>
            <View style={styles.container}>
              <ActivityIndicator size="large" color="red" />
            </View>
          </Modal>
        </SafeAreaView>
      </>
    );
  };
};

const styles = StyleSheet.create({
  safeAreaView: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  buttonStyle: { height: 50, width: 100, backgroundColor: "#3399cc", borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  buttonText: { color: "#fff", fontWeight: '700', fontSize: 15 },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.2)', },
});

export default App;
