import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import WordItem from '../components/WordItem';
import { LessonContext } from '../context/LessonContext';

export default function LessonScreen({ route }) {
  const { category } = route.params;
  const { getCategoryProgress } = useContext(LessonContext);
  const progress = getCategoryProgress(category.name);

  const screenWidth = Dimensions.get('window').width;
  const numColumns = screenWidth > 600 ? 3 : screenWidth > 400 ? 2 : 1;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>{category.arabic_name}</Text>
      <Text style={styles.progressHeader}>
        Progress: {progress.completed}/{progress.total} lessons completed
      </Text>
      <FlatList
        data={category.lessons}
        renderItem={({ item }) => <WordItem word={item} categoryId={category.name} />}
        keyExtractor={(item) => item.english}
        contentContainerStyle={styles.listContainer}
        numColumns={numColumns}
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
    fontFamily: 'Amiri-Regular',
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  progressHeader: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
    color: '#666',
  },
  listContainer: {
    paddingHorizontal: 20,
  },
});
