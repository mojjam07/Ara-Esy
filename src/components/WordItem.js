import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import { LessonContext } from '../context/LessonContext';

export default function WordItem({ word, categoryId }) {
  const [sound, setSound] = useState();
  const { getProgress, updateProgress } = useContext(LessonContext);
  const isCompleted = getProgress(categoryId, word.english);

  async function playSound() {
    try {
      if (sound) {
        await sound.unloadAsync();
      }
      // For demo purposes, we'll use a placeholder. In a real app, load from assets or Firebase
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav' } // Placeholder audio
      );
      setSound(newSound);
      await newSound.playAsync();

      // Mark as completed when audio is played
      if (!isCompleted) {
        updateProgress(categoryId, word.english, true);
      }
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  }

  React.useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={isCompleted ? ['#C8E6C9', '#A5D6A7'] : ['#E3F2FD', '#BBDEFB']}
        style={styles.gradient}
      >
        <View style={styles.textContainer}>
          <Text style={styles.arabicText}>{word.arabic}</Text>
          <Text style={styles.transliteration}>{word.transliteration}</Text>
          <Text style={styles.meaning}>{word.english}</Text>
          {isCompleted && <Text style={styles.completedText}>✓ Completed</Text>}
        </View>
        <TouchableOpacity style={styles.playButton} onPress={playSound}>
          <LinearGradient
            colors={['#4CAF50', '#66BB6A']}
            style={styles.buttonGradient}
          >
            <Text style={styles.playText}>▶</Text>
          </LinearGradient>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  gradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 15,
  },
  textContainer: {
    flex: 1,
  },
  arabicText: {
    fontSize: 32,
    fontFamily: 'Amiri-Regular',
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'right',
    marginBottom: 5,
  },
  transliteration: {
    fontSize: 16,
    color: '#666',
    marginBottom: 2,
  },
  meaning: {
    fontSize: 14,
    color: '#888',
  },
  completedText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: 'bold',
    marginTop: 2,
  },
  playButton: {
    marginLeft: 15,
    borderRadius: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonGradient: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
