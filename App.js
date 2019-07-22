import React from 'react';
import { StyleSheet, Text, View, Alert, TextInput, Button } from 'react-native';
import CleverPush from 'cleverpush-react-native';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      subscriptionId: null,
      country: 'DE'
    };

    this.onSubscribed = this.onSubscribed.bind(this);
    this.onOpened = this.onOpened.bind(this);
  }

  componentWillMount() {
    CleverPush.init('oQGjvibFX9ghtxLqG');

    CleverPush.addEventListener('opened', this.onOpened);
    CleverPush.addEventListener('subscribed', this.onSubscribed);

    console.log('setSubscriptionCountry DE');
    CleverPush.setSubscriptionCountry('DE');
    // CleverPush.setSubscriptionLanguage('fr');

    // requires AppGroups + NotificationServiceExtension (read docs)
    CleverPush.getNotifications((err, notifications) => {
      console.log('CleverPush: getNotifications', err, notifications);
    });
  }

  componentWillUnmount() {
    CleverPush.removeEventListener('opened', this.onOpened);
    CleverPush.removeEventListener('subscribed', this.onSubscribed);
  }

  onOpened(openResult) {
    console.log('CleverPush: [JS] Notification opened:', openResult);

    Alert.alert(
      'Notification Opened: ' + (openResult.notification || {})._id,
      (openResult.notification || {}).title
    );
  }

  onSubscribed(subscribedResult) {
    console.log('CleverPush: [JS] Subscribed with ID:', subscribedResult);
    this.setState({ subscriptionId: subscribedResult.id });
  }

  setCountry() {
    CleverPush.setSubscriptionCountry(this.state.country);
    console.log('setSubscriptionCountry ', this.state.country);
  }

  subscribe() {
    CleverPush.subscribe();
  }

  unsubscribe() {
    this.setState({ subscriptionId: null });
    CleverPush.unsubscribe();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>CleverPush React Native Example App</Text>
        <Text>Subscription ID: {this.state.subscriptionId || '-'}</Text>

        <TextInput
          onChangeText={(country) => this.setState({ country })}
          value={this.state.country}
          style={{padding: 10, marginTop: 20, borderColor: 'gray', borderWidth: 1}}
        />
        <Button onPress={() => this.setCountry()} title="Set Country" />

        {this.state.subscriptionId ? (
          <Button onPress={() => this.unsubscribe()} title="Unsubscribe" />
        ) : (
          <Button onPress={() => this.subscribe()} title="Subscribe" />
        )}
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
