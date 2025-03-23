import React, { useContext, useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "../contexts/AuthContext";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import SplashScreen from "../screens/SplashScreen";
import EventScreen from "../screens/EventScreen";
//import EventDetailsScreen from "../screens/EventDetailsScreen";
//import EventFormScreen from "../screens/EventFormScreen";

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Events: undefined;
  EventDetails: { eventId: string };
  EventForm: { event?: any } | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Routes = () => {
  const auth = useContext(AuthContext);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (auth === null || showSplash) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {auth.user ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Events" component={EventScreen} />
   
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default Routes;
//       <Stack.Screen name="EventDetails" component={EventDetailsScreen} />
//<Stack.Screen name="EventForm" component={EventFormScreen} />