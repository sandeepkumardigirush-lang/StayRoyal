/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import { NavigationContainer } from '@react-navigation/native';
import {
  StatusBar,
  StyleSheet,
  Text,
  TextBase,
  useColorScheme,
  View,
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/appNavigator';

import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { PortalProvider } from '@gorhom/portal';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import WishlistFlow from './src/components/wishlist/wishListFlow';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <PortalProvider>
          <Provider store={store}>
            <BottomSheetModalProvider>
              <WishlistFlow />
              <NavigationContainer>
                <AppNavigator />
              </NavigationContainer>
            </BottomSheetModalProvider>
          </Provider>
        </PortalProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
