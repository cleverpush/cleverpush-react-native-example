import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CleverPush from 'cleverpush-react-native';

export default class App extends React.Component {
  componentWillMount() {
    CleverPush.init('HX5h5pAyCMix2hBZx');

    CleverPush.addEventListener('opened', this.onOpened);
    CleverPush.addEventListener('subscribed', this.onSubscribed);
  }

  componentWillUnmount() {
    CleverPush.removeEventListener('opened', this.onOpened);
    CleverPush.removeEventListener('subscribed', this.onSubscribed);
  }

  onOpened(openResult) {
    console.log('Notification opened:', openResult);
  }

  onSubscribed(subscriptionId) {
    console.log('Subscribed with ID:', subscriptionId);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
