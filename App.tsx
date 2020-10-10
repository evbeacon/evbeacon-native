import React from "react";
import { Provider, useSelector } from "react-redux";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import * as SplashScreen from "expo-splash-screen";
import MainNavigator from "./src/Navigators/MainNavigator";
import AuthNavigator from "./src/Navigators/AuthNavigator";
import store, { RootState } from "./src/redux";
import { setToken } from "./src/redux/auth/authSlice";

const App: React.FC = () => {
  const token = useSelector((state: RootState) => state.auth.token);

  return (
    <NavigationContainer>
      {token == null ? <AuthNavigator /> : <MainNavigator />}
    </NavigationContainer>
  );
};

const WrappedApp: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    SplashScreen.preventAutoHideAsync().then(async () => {
      const storedToken = await SecureStore.getItemAsync("token");

      if (storedToken != null) {
        await store.dispatch(setToken(storedToken));
      }

      await SplashScreen.hideAsync();
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <SafeAreaView style={{ flex: 1 }}>
          <App />
        </SafeAreaView>
      </Provider>
    </SafeAreaProvider>
  );
};

export default WrappedApp;
