const { Response, Headers, Request } = require('whatwg-fetch');

global.Response = Response;
global.Headers = Headers;
global.Request = Request;
global.console = {
  log: () => {},
  warn: () => {},
};
global.fetch = require('jest-fetch-mock');

jest.mock('react-native-fetch-blob', () => {
  return {
    fs: {
      dirs: {
        MainBundleDir: () => {},
        CacheDir: () => {},
        DocumentDir: () => {},
      },
    },
    DocumentDir: () => {},
    fetch: () => {},
    base64: () => {},
    android: () => {},
    ios: () => {},
    config: () => {},
    session: () => {},
    wrap: () => {},
    polyfill: () => {},
    JSONStream: () => {}
  }
});

jest.mock('urbanairship-react-native', () => jest.fn());
jest.mock('secp256k1', () => jest.fn());
jest.mock('bitcore-mnemonic', () => jest.fn());
jest.mock('react-native-vector-icons/Ionicons', () => ({ ToolbarAndroid: 'ToolbarAndroid' }));

jest.mock('Platform', () => {
  const Platform = require.requireActual('Platform');
  Platform.OS = 'android';
  return Platform;
});

jest.mock('react-native-vector-icons', () => {
  const ActualTabBarIOS = require.requireActual('TabBarIOS');
  const React = require('react');

  return {
    createIconSet: () => {
      const Icon = class extends React.Component {
        render() {
          return jest.fn();
        }
      }

      Icon.TabBarItem = ActualTabBarIOS.Item;
      return Icon;
    },

    createIconSetFromFontello: () => {
      return {
        TabBarItem: ActualTabBarIOS.Item
      }
    },

    createIconSetFromIcoMoon: jest.fn(),
  }
});

