/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

LogBox.ignoreAllLogs(true);
global.XMLHttpRequest = global.originalXMLHttpRequest || global.XMLHttpRequest;
AppRegistry.registerComponent(appName, () => App);
