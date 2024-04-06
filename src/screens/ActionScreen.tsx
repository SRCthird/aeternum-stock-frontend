import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Header from '@components/Header';
import { styles } from '@styles';

const ActionScreen = () => {
  return (
    <View style={styles.container}>
      <Header title="" />
      <View style={styles.body}>
        <TouchableOpacity style={styles.action} onPress={() => { }}>
          <Text style={styles.optionText}>Create Item</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.action} onPress={() => { }}>
          <Text style={styles.optionText}>Inventory Transfer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.action} onPress={() => { }}>
          <Text style={styles.optionText}>Release Item</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.action} onPress={() => { }}>
          <Text style={styles.optionText}>Scrap Items</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ActionScreen;
