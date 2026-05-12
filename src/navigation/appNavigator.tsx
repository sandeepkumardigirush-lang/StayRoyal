import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/auth/welcome';
import { RootStackParamList } from './types';
import TabNavigator from './tabNavigator';
import BookingReview from '../screens/dash/booking';
import MessageToHost from '../screens/dash/booking/MessageToHost';
import PaymentReview from '../screens/dash/booking/PaymentReview';
import VillaDetail from '../screens/dash/home/VillaDetail';
import SearchResults from '../screens/dash/search/SearchResults';
import ViewProfile from '../screens/dash/profile/ViewProfile';
import WishlistDetails from '../screens/dash/saved/WishlistDetails';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      <Stack.Screen
        name="Search"
        component={require('../screens/dash/search').default}
        options={{ animation: 'fade_from_bottom' }}
      />
      <Stack.Screen
        name="SearchResults"
        component={SearchResults}
      />
      <Stack.Screen
        name="VillaDetail"
        component={VillaDetail}
      />
      <Stack.Screen
        name="BookingReview"
        component={BookingReview}
      />
      <Stack.Screen
        name="MessageToHost"
        component={MessageToHost}
      />
      <Stack.Screen
        name="PaymentReview"
        component={PaymentReview}
      />
      <Stack.Screen
        name="ViewProfile"
        component={ViewProfile}
      />
      <Stack.Screen
        name="WishlistDetails"
        component={WishlistDetails}
      />
    </Stack.Navigator>
  );
};


export default AppNavigator;
