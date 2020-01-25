import React, { Component } from 'react';
import CleverPush from 'cleverpush-react-native';
import { View, Text } from 'react-native';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pushEnabled: false
    };

    this.onOpened = this.onOpened.bind(this);
    this.onSubscribed = this.onSubscribed.bind(this);

    CleverPush.init('CLEVERPUSH_CHANNEL_ID');

    CleverPush.isSubscribed((err, res) => {
      this.setState({ pushEnabled: res });
    });

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

  onSubscribed(id) {
    this.setState({ pushEnabled: true });
    console.log('Subscribed:', id);
  }

  render() {
    return (
      <View>
        <Text>CleverPush Example App</Text>
      </View>
    );
  }
}

export default App;
