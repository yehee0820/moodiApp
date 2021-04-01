import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const StatScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Stat Screen</Text>
      <Button
        title="Go to stat screen...again"
        onPress={() => navigation.push('Stat')}
      />
      <Button title="Go to home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default StatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
