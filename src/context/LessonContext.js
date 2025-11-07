import React, { createContext, useState, useEffect } from 'react';
import lessonsData from '../data/lessons.json';
import { getLessons, storeLessons, getProgressData, storeProgressData } from '../utils/storage';

export const LessonContext = createContext();

export const LessonProvider = ({ children }) => {
  const [lessons, setLessons] = useState(lessonsData.categories);
  const [progress, setProgress] = useState({});
  const [categoryProgress, setCategoryProgress] = useState({});

  useEffect(() => {
    loadLessons();
    loadProgress();
  }, []);

  const loadLessons = async () => {
    const storedLessons = await getLessons();
    if (storedLessons) {
      setLessons(storedLessons);
    }
  };

  const loadProgress = async () => {
    const storedProgress = await getProgressData();
    if (storedProgress) {
      setProgress(storedProgress);
      updateCategoryProgress(storedProgress);
    }
  };

  const updateCategoryProgress = (currentProgress) => {
    const newCategoryProgress = {};
    lessons.forEach((category, categoryIndex) => {
      const totalLessons = category.lessons.length;
      const completedLessons = category.lessons.filter(lesson =>
        currentProgress[`${category.name}-${lesson.english}`]
      ).length;
      newCategoryProgress[category.name] = {
        completed: completedLessons,
        total: totalLessons,
        isUnlocked: categoryIndex === 0 || (newCategoryProgress[lessons[categoryIndex - 1]?.name]?.completed === lessons[categoryIndex - 1]?.lessons.length)
      };
    });
    setCategoryProgress(newCategoryProgress);
  };

  const updateProgress = (categoryName, lessonEnglish, completed) => {
    setProgress(prev => {
      const newProgress = {
        ...prev,
        [`${categoryName}-${lessonEnglish}`]: completed,
      };
      updateCategoryProgress(newProgress);
      storeProgressData(newProgress);
      return newProgress;
    });
  };

  const getProgress = (categoryName, lessonEnglish) => {
    return progress[`${categoryName}-${lessonEnglish}`] || false;
  };

  const isCategoryUnlocked = (categoryName) => {
    return categoryProgress[categoryName]?.isUnlocked ?? false;
  };

  const getCategoryProgress = (categoryName) => {
    return categoryProgress[categoryName] || { completed: 0, total: 0, isUnlocked: false };
  };

  const saveLessons = async () => {
    await storeLessons(lessons);
  };

  return (
    <LessonContext.Provider
      value={{
        lessons,
        setLessons,
        progress,
        updateProgress,
        getProgress,
        categoryProgress,
        isCategoryUnlocked,
        getCategoryProgress,
        saveLessons,
      }}
    >
      {children}
    </LessonContext.Provider>
  );
};
