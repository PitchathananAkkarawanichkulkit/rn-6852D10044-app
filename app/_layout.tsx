import { Stack } from "expo-router";
import { useFonts, Prompt_400Regular, Prompt_700Bold } from '@expo-google-fonts/prompt';
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();


export default function RootLayout() {

  let [fontsLoaded] = useFonts({
    Prompt_400Regular,
    Prompt_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; 
  }


  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="taxi_fare" options={{ headerShown: false }} />
    </Stack>
  );
}
