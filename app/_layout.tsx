import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import "../global.css";
import CustomSplashScreen from "./splash";
import * as Sentry from '@sentry/react-native';
import { useAuthStore } from "@/store/auth.store";

Sentry.init({
  dsn: 'https://0762b7dddd9782bc8dad101d11672bf6@o4509620982775808.ingest.de.sentry.io/4510804431994960',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Enable Logs
  enableLogs: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration(), Sentry.feedbackIntegration()],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

SplashScreen.preventAutoHideAsync();

export default Sentry.wrap(function RootLayout() {
  const { isLoading, fetchAuthentictaed } = useAuthStore();

  const [fontsLoaded, fontsError] = useFonts({
    "Quicksand-Regular": require("../assets/fonts/Quicksand-Regular.ttf"),
    "Quicksand-Bold": require("../assets/fonts/Quicksand-Bold.ttf"),
    "Quicksand-SemiBold": require("../assets/fonts/Quicksand-SemiBold.ttf"),
    "Quicksand-Light": require("../assets/fonts/Quicksand-Light.ttf"),
    "Quicksand-Medium": require("../assets/fonts/Quicksand-Medium.ttf"),
  });

  useEffect(() => {
    fetchAuthentictaed();
  }, []);

  useEffect(() => {
    if (fontsError) throw fontsError;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, fontsError]);
 
  if (!fontsLoaded) {
    return <CustomSplashScreen />;
  }

  if (isLoading) {
    return null;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
});