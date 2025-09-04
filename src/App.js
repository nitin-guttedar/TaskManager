import React, { useEffect } from 'react';
import { Appearance, Platform } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import storeObj from './store';
import { dark, light } from './theme/theme';
import {
  initNotifications,
  requestAndroidPostNotificationsPermission,
} from './utils/notifications';

const { store, persistor } = storeObj;

export default function App() {
  useEffect(() => {
    initNotifications();
    if (Platform.OS === 'android') {
      requestAndroidPostNotificationsPermission();
    }
  }, []);

  const colorScheme = Appearance.getColorScheme();

  const theme = colorScheme === 'dark' ? dark : light;

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer theme={theme}>
          <AppNavigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
