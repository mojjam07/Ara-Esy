# Arabic-Easy App Development TODO

## 1. Install Dependencies
- [x] Update package.json with Firebase SDK, AsyncStorage, Expo AV, React Navigation, expo-linear-gradient, etc.
- [x] Run npm install to install new dependencies

## 2. Set Up Firebase
- [x] Create firebaseConfig.js with Firestore and Storage setup
- [x] Initialize Firebase in App.js

## 3. Data Structure
- [x] Create src/data/lessons.json with sample lessons data (alphabets, numbers, greetings, etc.)

## 4. Navigation
- [x] Create src/navigation/AppNavigator.js with stack navigator for screens

## 5. Screens and Components
- [x] Create src/screens/HomeScreen.js: Display categories as cards
- [x] Create src/screens/LessonScreen.js: List words with Arabic, transliteration, meaning, audio button
- [x] Create src/screens/SettingsScreen.js: Language toggle, offline mode
- [x] Create src/components/WordItem.js: Component for displaying a word in lessons
- [x] Create src/components/AudioPlayer.js: Component for audio playback

## 6. Audio Playback
- [x] Implement Expo AV in AudioPlayer to play local/Firebase MP3s
- [x] Add audio caching logic

## 7. Offline Access
- [x] Create src/utils/storage.js for AsyncStorage helpers
- [x] Implement caching of lessons and audio in AsyncStorage

## 8. State Management
- [x] Create src/context/LessonContext.js for global state (lessons, progress)

## 9. UI/UX
- [x] Update App.js as main entry with navigation and Firebase init
- [x] Style screens with simple design, large Arabic fonts, icons

## 10. Optional Features
- [ ] Create src/screens/QuizScreen.js: Multiple-choice quiz
- [ ] Add progress tracking in context and screens

## Followup Steps
- [ ] Set up Firebase project and add config keys
- [ ] Test on Expo Go/simulator: lessons display, audio, offline
- [ ] Run `expo start` to launch the app
