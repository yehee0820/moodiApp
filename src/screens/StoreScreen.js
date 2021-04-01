import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const StoreScreen = () => {
  return (
    <View style={styles.container}>
      <Text>StoreScreen</Text>
      <Button title="Click Here" onPress={() => alert('Button Clicked!')} />
    </View>
  );
};

export default StoreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
