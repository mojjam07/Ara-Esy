import AsyncStorage from '@react-native-async-storage/async-storage';

const LESSONS_KEY = 'lessons';
const PROGRESS_KEY = 'progress';
const AUDIO_CACHE_KEY = 'audio_cache';

export const storeLessons = async (lessons) => {
  try {
    const jsonValue = JSON.stringify(lessons);
    await AsyncStorage.setItem(LESSONS_KEY, jsonValue);
  } catch (e) {
    console.error('Error storing lessons:', e);
  }
};

export const getLessons = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(LESSONS_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Error retrieving lessons:', e);
    return null;
  }
};

export const storeProgressData = async (progress) => {
  try {
    const jsonValue = JSON.stringify(progress);
    await AsyncStorage.setItem(PROGRESS_KEY, jsonValue);
  } catch (e) {
    console.error('Error storing progress:', e);
  }
};

export const getProgressData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(PROGRESS_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : {};
  } catch (e) {
    console.error('Error retrieving progress:', e);
    return {};
  }
};

export const storeAudioCache = async (audioUri, localUri) => {
  try {
    const cache = await getAudioCache();
    cache[audioUri] = localUri;
    const jsonValue = JSON.stringify(cache);
    await AsyncStorage.setItem(AUDIO_CACHE_KEY, jsonValue);
  } catch (e) {
    console.error('Error storing audio cache:', e);
  }
};

export const getAudioCache = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(AUDIO_CACHE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : {};
  } catch (e) {
    console.error('Error retrieving audio cache:', e);
    return {};
  }
};

export const clearAllData = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.error('Error clearing data:', e);
  }
};
