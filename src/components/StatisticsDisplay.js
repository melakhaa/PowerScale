// src/components/StatisticsDisplay.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function StatisticsDisplay({ character }) {
  const StatItem = ({ label, value }) => {
    if (!value) return null;
    
    return (
      <View style={styles.statItem}>
        <Text style={styles.statLabel}>{label}:</Text>
        <Text style={styles.statValue}>{value}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Statistics</Text>
      
      <StatItem label="Attack Potency" value={character.attack_potency} />
      <StatItem label="Speed" value={character.speed} />
      <StatItem label="Lifting Strength" value={character.lifting_strength} />
      <StatItem label="Striking Strength" value={character.striking_strength} />
      <StatItem label="Durability" value={character.durability} />
      <StatItem label="Stamina" value={character.stamina} />
      <StatItem label="Range" value={character.range} />
      <StatItem label="Intelligence" value={character.intelligence} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginVertical: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#3498db',
    paddingBottom: 8,
  },
  statItem: {
    marginBottom: 12,
  },
  statLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#34495e',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 14,
    color: '#5a6c7d',
    lineHeight: 20,
  },
});
