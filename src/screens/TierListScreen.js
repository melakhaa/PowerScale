// src/screens/TierListScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { api } from '../config/supabase';
import TierCard from '../components/TierCard';

const TierListScreen = ({ navigation }) => {
  const [tiers, setTiers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadTiers();
  }, []);

  // Add navigation focus listener
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadTiers();
    });
    return unsubscribe;
  }, [navigation]);

  const loadTiers = async () => {
    setLoading(true);
    const { data, error } = await api.getTiers();
    if (data) {
      setTiers(data);
    }
    if (error) {
      console.error('Error loading tiers:', error);
    }
    setLoading(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadTiers();
    setRefreshing(false);
  };

  const renderItem = ({ item }) => (
    <TierCard
      tier={item}
      onPress={() => navigation.navigate('TierDetailScreen', { tierCode: item.tier_code })}
    />
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.title}>Tier Rankings</Text>
      <Text style={styles.subtitle}>Character classification by power level</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={styles.loadingText}>Loading tiers...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList 
        data={tiers}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={renderHeader}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.listContent}
      />
    </View>
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
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#7f8c8d',
  },
  header: {
    padding: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default TierListScreen;
