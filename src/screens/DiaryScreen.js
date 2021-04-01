import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const DiaryScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Diary Screen</Text>
      <Button title="Click Here" onPress={() => alert('Button Clicked!')} />
    </View>
  );
};

export default DiaryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
