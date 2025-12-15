// src/components/TierCard.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { getTierColor } from '../utils/tierColors';

export default function TierCard({ tier, onPress }) {
  const { theme } = useTheme();
  return (
    <TouchableOpacity 
      style={[styles.card, { borderLeftColor: getTierColor(tier.tier_code), backgroundColor: theme.colors.surface, shadowColor: theme.colors.text }]} 
      onPress={onPress}
    >
      <View style={[styles.tierCircle, { backgroundColor: getTierColor(tier.tier_code) }]}>
        <Text style={styles.tierCode} numberOfLines={1} adjustsFontSizeToFit>
          {tier.tier_code}
        </Text>
      </View>
      <View style={styles.info}>
        <Text style={[styles.tierName, { color: theme.colors.text }]}>{tier.tier_name}</Text>
        <Text style={[styles.tierDescription, { color: theme.colors.textSecondary }]} numberOfLines={2}>
          {tier.tier_description}
        </Text>
      </View>
      <Text style={[styles.arrow, { color: theme.colors.textTertiary }]}>›</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tierCircle: {
    width: 60,
    height: 60,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  tierCode: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    paddingHorizontal: 4,
  },
  info: {
    flex: 1,
  },
  tierName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  tierDescription: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  arrow: {
    fontSize: 24,
    color: '#bdc3c7',
    marginLeft: 8,
  },
});
