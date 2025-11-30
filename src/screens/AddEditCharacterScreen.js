// src/screens/AddEditCharacterScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { api } from '../config/supabase';
import { getTierColor, getTierName } from '../utils/tierColors';

const AddEditCharacterScreen = ({ route, navigation }) => {
  const { characterId, mode } = route.params || { mode: 'add' };
  const isEditMode = mode === 'edit';

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    anime: '',
    power_level: '',
    tier_code: '5-A',
    image_url: '',
    abilities: '',
    description: '',
    attack_potency: '',
    speed: '',
    lifting_strength: '',
    striking_strength: '',
    durability: '',
    stamina: '',
    range: '',
    intelligence: '',
    notable_techniques: '',
  });

  useEffect(() => {
    if (isEditMode && characterId) {
      loadCharacter();
    }
    navigation.setOptions({
      title: isEditMode ? 'Edit Character' : 'Add Character',
    });
  }, [characterId, isEditMode]);

  const loadCharacter = async () => {
    setLoading(true);
    const { data, error } = await api.getCharacterById(characterId);
    if (data) {
      const powerLevel = data.power || data.power_level || 0;
      setFormData({
        name: data.name || '',
        anime: data.anime || '',
        power_level: powerLevel.toString(),
        tier_code: data.tier_code || '',
        image_url: data.image_url || '',
        abilities: data.abilities || '',
        description: data.description || '',
        attack_potency: data.attack_potency || '',
        speed: data.speed || '',
        lifting_strength: data.lifting_strength || '',
        striking_strength: data.striking_strength || '',
        durability: data.durability || '',
        stamina: data.stamina || '',
        range: data.range || '',
        intelligence: data.intelligence || '',
        notable_techniques: data.notable_techniques || '',
      });
    }
    if (error) {
      console.error('Error loading character:', error);
      Alert.alert('Error', 'Failed to load character');
    }
    setLoading(false);
  };

  const calculateTier = (powerLevel) => {
    const power = parseInt(powerLevel);
    if (power >= 100) return 'Tier 0';
    if (power >= 95) return 'High 1-A';
    if (power >= 90) return '1-A';
    if (power >= 85) return 'Low 1-A';
    if (power >= 80) return 'High 1-B';
    if (power >= 75) return '1-B';
    if (power >= 70) return 'Low 1-B';
    if (power >= 65) return 'High 1-C';
    if (power >= 60) return '1-C';
    if (power >= 55) return 'Low 1-C';
    if (power >= 50) return 'High 2-A';
    if (power >= 48) return '2-A';
    if (power >= 46) return '2-B';
    if (power >= 44) return '2-C';
    if (power >= 42) return 'Low 2-C';
    if (power >= 40) return 'High 3-A';
    if (power >= 38) return '3-A';
    if (power >= 37) return 'High 4-C';
    if (power >= 36) return '4-C';
    if (power >= 35) return 'Low 4-C';
    if (power >= 34) return 'High 5-A';
    if (power >= 33) return '5-A';
    if (power >= 32) return '5-B';
    if (power >= 31) return 'Low 5-B';
    if (power >= 30) return 'High 5-C';
    if (power >= 29) return '5-C';
    if (power >= 28) return 'Low 5-C';
    if (power >= 27) return 'High 6-A';
    if (power >= 26) return '6-A';
    if (power >= 25) return 'High 6-B';
    if (power >= 24) return '6-B';
    if (power >= 23) return 'Low 6-B';
    if (power >= 22) return 'High 6-C';
    if (power >= 21) return '6-C';
    if (power >= 20) return 'Low 6-C';
    if (power >= 19) return 'High 7-A';
    if (power >= 18) return '7-A';
    if (power >= 17) return '7-B';
    if (power >= 16) return 'Low 7-B';
    if (power >= 15) return 'High 7-C';
    if (power >= 14) return '7-C';
    if (power >= 13) return 'Low 7-C';
    if (power >= 12) return '8-A';
    if (power >= 11) return '8-B';
    if (power >= 10) return '8-C';
    if (power >= 9) return '9-A';
    if (power >= 8) return '9-B';
    if (power >= 7) return '9-C';
    if (power >= 6) return '10-A';
    if (power >= 5) return '10-B';
    if (power >= 4) return '10-C';
    if (power >= 3) return '11-A';
    if (power >= 2) return '11-B';
    if (power >= 1) return '11-C';
    return 'Uknown Tier';
  };

  const handlePowerLevelChange = (value) => {
    setFormData({
      ...formData,
      power_level: value,
      tier_code: value ? calculateTier(value) : '-',
    });
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      Alert.alert('Validation Error', 'Character name is required');
      return false;
    }
    if (!formData.anime.trim()) {
      Alert.alert('Validation Error', 'Anime name is required');
      return false;
    }
    const powerLevel = parseInt(formData.power_level);
    if (!formData.power_level || isNaN(powerLevel) || powerLevel < 0 || powerLevel > 100) {
      Alert.alert('Validation Error', 'Power level must be between 0 and 100');
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setSaving(true);

    const characterData = {
      name: formData.name.trim(),
      anime: formData.anime.trim(),
      power_level: parseInt(formData.power_level),
      tier_code: formData.tier_code,
      image_url: formData.image_url?.trim() || 'https://via.placeholder.com/300',
      abilities: formData.abilities?.trim() || '',
      description: formData.description?.trim() || '',
      attack_potency: formData.attack_potency?.trim() || '',
      speed: formData.speed?.trim() || '',
      lifting_strength: formData.lifting_strength?.trim() || '',
      striking_strength: formData.striking_strength?.trim() || '',
      durability: formData.durability?.trim() || '',
      stamina: formData.stamina?.trim() || '',
      range: formData.range?.trim() || '',
      intelligence: formData.intelligence?.trim() || '',
      notable_techniques: formData.notable_techniques?.trim() || '',
    };

    let result;
    if (isEditMode) {
      result = await api.updateCharacter(characterId, characterData);
    } else {
      result = await api.addCharacter(characterData);
    }

    setSaving(false);

    if (result.error) {
      console.error('Save error:', result.error);
      Alert.alert('Error', `Failed to ${isEditMode ? 'update' : 'add'} character: ${result.error?.message || 'Unknown error'}`);
    } else {
      Alert.alert(
        'Success',
        `Character ${isEditMode ? 'updated' : 'added'} successfully`,
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Character Name *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter character name"
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Anime *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter anime name"
            value={formData.anime}
            onChangeText={(text) => setFormData({ ...formData, anime: text })}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Power Level (0-100) *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter power level"
            value={formData.power_level}
            onChangeText={handlePowerLevelChange}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Tier (Auto-calculated)</Text>
          <View style={styles.tierDisplay}>
            <View style={[styles.tierBadge, { backgroundColor: getTierColor(formData.tier_code) }]}>
              <Text style={styles.tierText}>{formData.tier_code}</Text>
            </View>
            <Text style={styles.tierInfo}>{getTierName(formData.tier_code)}</Text>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter image URL (optional)"
            value={formData.image_url}
            onChangeText={(text) => setFormData({ ...formData, image_url: text })}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Abilities</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Enter abilities (comma separated)"
            value={formData.abilities}
            onChangeText={(text) => setFormData({ ...formData, abilities: text })}
            multiline
            numberOfLines={3}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Enter character description"
            value={formData.description}
            onChangeText={(text) => setFormData({ ...formData, description: text })}
            multiline
            numberOfLines={4}
          />
        </View>

        <View style={styles.statisticsSection}>
          <Text style={styles.statisticsTitle}>Statistics</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Attack Potency</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter attack potency"
              value={formData.attack_potency}
              onChangeText={(text) => setFormData({ ...formData, attack_potency: text })}
              multiline
              numberOfLines={2}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Speed</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter speed"
              value={formData.speed}
              onChangeText={(text) => setFormData({ ...formData, speed: text })}
              multiline
              numberOfLines={2}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Lifting Strength</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter lifting strength"
              value={formData.lifting_strength}
              onChangeText={(text) => setFormData({ ...formData, lifting_strength: text })}
              multiline
              numberOfLines={2}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Striking Strength</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter striking strength"
              value={formData.striking_strength}
              onChangeText={(text) => setFormData({ ...formData, striking_strength: text })}
              multiline
              numberOfLines={2}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Durability</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter durability"
              value={formData.durability}
              onChangeText={(text) => setFormData({ ...formData, durability: text })}
              multiline
              numberOfLines={2}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Stamina</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter stamina"
              value={formData.stamina}
              onChangeText={(text) => setFormData({ ...formData, stamina: text })}
              multiline
              numberOfLines={2}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Range</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter range"
              value={formData.range}
              onChangeText={(text) => setFormData({ ...formData, range: text })}
              multiline
              numberOfLines={2}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Intelligence</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter intelligence"
              value={formData.intelligence}
              onChangeText={(text) => setFormData({ ...formData, intelligence: text })}
              multiline
              numberOfLines={2}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Notable Techniques</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Enter notable techniques"
              value={formData.notable_techniques}
              onChangeText={(text) => setFormData({ ...formData, notable_techniques: text })}
              multiline
              numberOfLines={3}
            />
          </View>
        </View>

        <TouchableOpacity
          style={[styles.saveButton, saving && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={saving}
        >
          {saving ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.saveButtonText}>
              {isEditMode ? 'Update Character' : 'Add Character'}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

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
  form: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#2c3e50',
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  tierDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
  },
  tierBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 12,
  },
  tierText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  tierInfo: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  statisticsSection: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  statisticsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#3498db',
    paddingBottom: 8,
  },
  saveButton: {
    backgroundColor: '#3498db',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  saveButtonDisabled: {
    backgroundColor: '#95a5a6',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddEditCharacterScreen;
