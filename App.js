import React, {Component} from 'react';
import {WebView} from 'react-native-webview';
import {BackHandler, Platform, View} from 'react-native';
import {PERMISSIONS, requestMultiple} from 'react-native-permissions';
export default class App extends Component {
  constructor(props) {
    super(props);
  }
  webView = {
    canGoBack: false,
    ref: null,
  };
  /** For Loading And Back Button Press**/
  onAndroidBackPress = () => {
    if (this.webView.canGoBack && this.webView.ref) {
      this.webView.ref.goBack();
      return true;
    }
    return false;
  };
  componentDidMount() {
    //back button event
    if (Platform.OS === 'android' || Platform.OS === 'ios') {
      BackHandler.addEventListener(
        'hardwareBackPress',
        this.onAndroidBackPress,
      );
    }
    //permission
    requestMultiple([
      PERMISSIONS.ANDROID.CAMERA,
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    ])
      .then((result) => console.log(result))
      .catch((result) => console.log(result));
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <WebView
          // userAgent={
          //   InputDeviceInfo.getUserAgent() + '- TASKMOBILEAPP -android '
          // }
          ref={(webView) => {
            this.webView.ref = webView;
          }}
          onNavigationStateChange={(navState) => {
            this.webView.canGoBack = navState.canGoBack;
          }}
          // originWhitelist={['*']}
          source={{
            uri: 'http://localhost:3000',
          }}
          javaScriptEnabled={true}
          // domStorageEnabled={true}
          // thirdPartyCookiesEnabled={true}
          style={{flex: 1}}
        />
      </View>
    );
  }
}
