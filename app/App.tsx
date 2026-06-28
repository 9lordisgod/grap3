import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { OnboardingScreen } from './src/screens/OnboardingScreen';
import { AppShell } from './src/navigation/AppShell';

export default function App() {
  const [pubkey, setPubkey] = useState<string | null>(null);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar barStyle="light-content" />
        {pubkey ? <AppShell /> : <OnboardingScreen onAuthed={setPubkey} />}
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
