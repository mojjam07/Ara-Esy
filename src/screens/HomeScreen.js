import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LessonContext } from '../context/LessonContext';

export default function HomeScreen({ navigation }) {
  const { lessons, isCategoryUnlocked, getCategoryProgress } = useContext(LessonContext);
  const numColumns = 1;

  const renderCategory = ({ item }) => {
    const isUnlocked = isCategoryUnlocked(item.name);
    const progress = getCategoryProgress(item.name);

    return (
      <TouchableOpacity
        style={[styles.categoryCard, !isUnlocked && styles.lockedCard]}
        onPress={() => isUnlocked && navigation.navigate('Lesson', { category: item })}
        disabled={!isUnlocked}
      >
        <LinearGradient
          colors={isUnlocked ? ['#4CAF50', '#66BB6A'] : ['#BDBDBD', '#E0E0E0']}
          style={styles.gradient}
        >
          <Text style={[styles.categoryTitle, !isUnlocked && styles.lockedText]}>{item.arabic_name}</Text>
          <Text style={[styles.categoryDescription, !isUnlocked && styles.lockedText]}>{item.name}</Text>
          {isUnlocked && progress.total > 0 && (
            <Text style={styles.progressText}>
              {progress.completed}/{progress.total} completed
            </Text>
          )}
          {!isUnlocked && (
            <Text style={styles.lockText}>🔒 Complete previous category</Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Choose a Category</Text>
      <FlatList
        data={lessons}
        renderItem={renderCategory}
        keyExtractor={(item) => item.name}
        numColumns={numColumns}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  categoryCard: {
    marginVertical: 5,
    borderRadius: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    flex: 1,
    marginHorizontal: 5,
  },
  lockedCard: {
    opacity: 0.6,
  },
  gradient: {
    padding: 20,
    borderRadius: 15,
  },
  categoryTitle: {
    fontSize: 20,
    fontFamily: 'Amiri-Regular',
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  lockedText: {
    color: '#666',
  },
  categoryDescription: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    marginTop: 5,
  },
  progressText: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
    marginTop: 5,
  },
  lockText: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
    marginTop: 5,
  },
});
