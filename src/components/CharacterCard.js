// src/components/CharacterCard.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { getTierColor, getTierName } from '../utils/tierColors';

export default function CharacterCard({ character, onPress }) {
  const { theme } = useTheme();
  const tierData = character.tier || {};
  const tierCode = character.tier_code || tierData.tier_code || 'Unknown';
  const tierName = tierData.tier_name || getTierName(tierCode);

  return (
    <TouchableOpacity style={[styles.card, { backgroundColor: theme.colors.surface, shadowColor: theme.colors.text }]} onPress={onPress}>
      <Image 
        source={{ uri: character.image_url }} 
        style={styles.image}
      />
      <View style={styles.info}>
        <Text style={[styles.name, { color: theme.colors.text }]}>{character.name}</Text>
        <Text style={[styles.anime, { color: theme.colors.textSecondary }]}>{character.anime}</Text>
        <View style={styles.statsContainer}>
          <View style={[styles.tierBadge, { backgroundColor: getTierColor(tierCode) }]}>
            <Text style={styles.tierCode}>{tierCode}</Text>
          </View>
        </View>
        <Text style={[styles.tierName, { color: theme.colors.textSecondary }]} numberOfLines={1}>{tierName}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#e0e0e0',
  },
  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  anime: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tierBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 4,
  },
  tierCode: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
  tierName: {
    fontSize: 11,
    color: '#7f8c8d',
    fontStyle: 'italic',
  },
});
