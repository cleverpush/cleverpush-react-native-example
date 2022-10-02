import React, { Component } from 'react';
import CleverPush from 'cleverpush-react-native';
import { View, Text } from 'react-native';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pushEnabled: false,
      pushId: null,
    };

    this.onOpened = this.onOpened.bind(this);
    this.onSubscribed = this.onSubscribed.bind(this);

    CleverPush.enableDevelopmentMode();
    CleverPush.setIncrementBadge(true);
    CleverPush.setAutoClearBadge(false);

    CleverPush.init('mpE96RmzLQRyT9iRq'), {
      autoRegister: false,
    };

    CleverPush.addEventListener('opened', this.onOpened);
    CleverPush.addEventListener('subscribed', this.onSubscribed);

    CleverPush.isSubscribed((err, isSubscribed) => {
      if (err || !isSubscribed) {
        console.warn('Was not subscribed, subscribing now!');
        CleverPush.subscribe();
      }
      CleverPush.trackPageView('https://google.com/asd', { test: 'test' })
      this.setState({ pushEnabled: isSubscribed });
    });

  }

  componentWillUnmount() {
    CleverPush.removeEventListener('opened', this.onOpened);
    CleverPush.removeEventListener('subscribed', this.onSubscribed);
  }

  onOpened(openResult) {
    console.log('Notification opened:', openResult);
  }

  onSubscribed(res) {
    this.setState({ pushEnabled: true, pushId: res ? res.id : null });
    console.log('Subscribed:', res.id);
  }

  render() {
    return (
      <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 100 }}>
        <Text style={{ fontSize: 18, marginBottom: 20 }}>CleverPush Example App</Text>
        <Text style={{ fontSize: 16, marginBottom: 5 }}>CleverPush Status: {this.state.pushEnabled ? 'enabled' : 'disabled'}</Text>
        <Text style={{ fontSize: 16 }}>CleverPush ID: {this.state.pushId}</Text>
      </View>
    );
  }
}

export default App;
