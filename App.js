import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CleverPush from 'cleverpush-react-native';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      subscriptionId: null
    };

    this.onSubscribed = this.onSubscribed.bind(this);
    this.onOpened = this.onOpened.bind(this);
  }

  componentWillMount() {
    CleverPush.init('oQGjvibFX9ghtxLqG');

    CleverPush.addEventListener('opened', this.onOpened);
    CleverPush.addEventListener('subscribed', this.onSubscribed);
  }

  componentWillUnmount() {
    CleverPush.removeEventListener('opened', this.onOpened);
    CleverPush.removeEventListener('subscribed', this.onSubscribed);
  }

  onOpened(openResult) {
    console.log('CleverPush: [JS] Notification opened:', openResult);
  }

  onSubscribed(subscribedResult) {
    console.log('CleverPush: [JS] Subscribed with ID:', subscribedResult);
    this.setState({ subscriptionId: subscribedResult.id });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>CleverPush React Native Example App</Text>
        <Text>Subscription ID: {this.state.subscriptionId || '-'}</Text>
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
