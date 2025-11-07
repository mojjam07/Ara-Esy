import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { LessonProvider } from './src/context/LessonContext';
import AppNavigator from './src/navigation/AppNavigator';
import { db } from './firebaseConfig'; // Initialize Firebase
import * as Font from 'expo-font';

export default function App() {
  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Amiri-Regular': require('./assets/Amiri-Regular.ttf'),
      });
    }
    loadFonts();
  }, []);

  return (
    <LessonProvider>
      <NavigationContainer>
        <AppNavigator />
        <StatusBar style="light" backgroundColor="#4CAF50" />
      </NavigationContainer>
    </LessonProvider>
  );
}
