// src/screens/CharacterDetailScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { api } from '../config/supabase';
import { useTheme } from '../context/ThemeContext';
import StatisticsDisplay from '../components/StatisticsDisplay';
import { getTierColor, getTierName } from '../utils/tierColors';

export default function CharacterDetailScreen({ route, navigation }) {
  const { characterId } = route.params;
  const { theme } = useTheme();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCharacter();
    // Add Edit button to header
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: 'row', marginRight: 10 }}>
          <TouchableOpacity
            onPress={handleEdit}
            style={{ marginRight: 15 }}
          >
            <Text style={{ color: '#fff', fontSize: 16 }}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete}>
            <Text style={{ color: '#ff4757', fontSize: 16 }}>Delete</Text>
          </TouchableOpacity>
        </View>
      ),
    });
  }, [characterId]);

  const loadCharacter = async () => {
    setLoading(true);
    const { data, error } = await api.getCharacterById(characterId);
    if (data) {
      setCharacter(data);
    }
    if (error) {
      console.error('Error loading character:', error);
    }
    setLoading(false);
  };

  const handleEdit = () => {
    navigation.navigate('AddEditCharacter', {
      characterId: characterId,
      mode: 'edit',
    });
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Character',
      `Are you sure you want to delete ${character?.name}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const { error } = await api.deleteCharacter(characterId);
            if (error) {
              Alert.alert('Error', 'Failed to delete character');
            } else {
              Alert.alert('Success', 'Character deleted successfully', [
                {
                  text: 'OK',
                  onPress: () => navigation.goBack(),
                },
              ]);
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (!character) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.colors.background }]}>
        <Text style={{ color: theme.colors.text }}>Character not found</Text>
      </View>
    );
  }

  const tierData = character.tier || {};
  const tierCode = character.tier_code || tierData.tier_code || 'Unknown';
  const tierName = getTierName(tierCode);
  const tierDescription = tierData.tier_description || '';

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Image
        source={{ uri: character.image_url }}
        style={styles.image}
        defaultSource={require('../../assets/icon.png')}
      />
      <View style={[styles.content, { backgroundColor: theme.colors.background }]}>
        <Text style={[styles.name, { color: theme.colors.text }]}>{character.name}</Text>
        <Text style={[styles.anime, { color: theme.colors.textSecondary }]}>From: {character.anime}</Text>

        <View style={[styles.tierContainer, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
          <View style={[styles.tierBadge, { backgroundColor: getTierColor(tierCode) }]}>
            <Text style={styles.tierCode}>{tierCode}</Text>
          </View>
          <View style={styles.tierInfo}>
            <Text style={[styles.tierName, { color: theme.colors.text }]}>{tierName}</Text>
            {tierDescription ? (
              <Text style={[styles.tierDescription, { color: theme.colors.textSecondary }]} numberOfLines={2}>
                {tierDescription}
              </Text>
            ) : null}
          </View>
        </View>

        {/* Statistics Section */}
        <StatisticsDisplay character={character} />

        {/* Description */}
        {character.description ? (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Description</Text>
            <Text style={[styles.description, { color: theme.colors.textSecondary }]}>{character.description}</Text>
          </View>
        ) : null}

        {/* Abilities */}
        {character.abilities ? (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Powers and Abilities</Text>
            <Text style={[styles.abilities, { color: theme.colors.textSecondary }]}>{character.abilities}</Text>
          </View>
        ) : null}

        {/* Notable Techniques */}
        {character.notable_techniques ? (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Notable Techniques</Text>
            <Text style={[styles.abilities, { color: theme.colors.textSecondary }]}>{character.notable_techniques}</Text>
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f6fa',
  },
  image: {
    width: '100%',
    height: 300,
    backgroundColor: '#e0e0e0',
  },
  content: {
    padding: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  anime: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 16,
  },
  tierContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  tierBadge: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginRight: 12,
  },
  tierCode: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  tierInfo: {
    flex: 1,
  },
  tierName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 4,
  },
  tierDescription: {
    fontSize: 12,
    color: '#7f8c8d',
    fontStyle: 'italic',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#5a6c7d',
    lineHeight: 22,
  },
  abilities: {
    fontSize: 14,
    color: '#5a6c7d',
    lineHeight: 22,
  },
});
