// src/screens/TierDetailScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  RefreshControl
} from 'react-native';
import { api } from '../config/supabase';
import CharacterCard from '../components/CharacterCard';
import { getTierColor, getTierName } from '../utils/tierColors';
import { Ionicons } from '@expo/vector-icons'; 

const ITEMS_PER_PAGE = 5; // Samakan dengan Home biar konsisten

export default function TierDetailScreen({ route, navigation }) {
  const { tierCode } = route.params;

  // --- STATE ---
  const [characters, setCharacters] = useState([]);
  const [tierDetails, setTierDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Pagination State
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  // --- EFFECT ---
  useEffect(() => {
    navigation.setOptions({ title: `Tier ${tierCode}` });
    loadTierInfo();
    loadCharacters(0); // Load halaman pertama
  }, [tierCode]);

  // 🔵 Load characters by tier (With Page)
  const loadCharacters = async (pageNum) => {
    setLoading(true);
    const { data, count, error } = await api.getCharactersByTier(tierCode, pageNum, ITEMS_PER_PAGE);
    
    if (data) {
      setCharacters(data);
      setTotalCount(count || 0);
    }
    if (error) console.error('Error loading characters:', error);
    setLoading(false);
    setRefreshing(false);
  };

  // 🔵 Load tier details
  const loadTierInfo = async () => {
    const { data, error } = await api.getTierDetails(tierCode);
    if (data) setTierDetails(data);
  };

  // 🔵 Ganti Halaman
  const changePage = (newPage) => {
    setPage(newPage);
    loadCharacters(newPage);
  };

  // 🔵 Pull to Refresh
  const onRefresh = () => {
    setRefreshing(true);
    setPage(0);
    loadCharacters(0);
  };

  const renderItem = ({ item }) => (
    <CharacterCard
      character={item}
      onPress={() =>
        navigation.navigate('TierCharacterDetail', { characterId: item.id })
      }
    />
  );

  // 🔵 Header Info
  const renderHeader = () => (
    <View style={[styles.header, { backgroundColor: getTierColor(tierCode) }]}>
      <View style={styles.tierCircle}>
        <Text style={styles.tierLetter}>{tierCode}</Text>
      </View>

      <Text style={styles.tierTitle}>
        {tierDetails?.tier_name || getTierName(tierCode)}
      </Text>

      {tierDetails?.tier_description && (
        <Text style={styles.tierDescription}>
          {tierDetails.tier_description}
        </Text>
      )}

      {/* Tampilkan Total Count dari Database, bukan length array */}
      <Text style={styles.characterCount}>
        Total: {totalCount} Characters
      </Text>
    </View>
  );

  // 🔵 Pagination Controls (Sama seperti Home)
  const renderPagination = () => {
    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
    
    // Jangan tampilkan jika loading, data kosong, atau cuma 1 halaman
    if (loading || characters.length === 0 || totalPages <= 1) return null;

    const pages = [...Array(totalPages).keys()];

    return (
      <View style={styles.paginationContainer}>
        {/* Tombol Prev */}
        <TouchableOpacity 
          style={[styles.pageButton, page === 0 && styles.disabledButton]}
          disabled={page === 0}
          onPress={() => changePage(Math.max(0, page - 1))}
        >
          <Ionicons name="chevron-back" size={20} color={page === 0 ? "#bdc3c7" : "#3498db"} />
        </TouchableOpacity>

        {/* Angka Halaman */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pageScroll}>
          {pages.map((p) => (
            <TouchableOpacity
              key={p}
              style={[styles.pageNumberButton, page === p && styles.activePageButton]}
              onPress={() => changePage(p)}
            >
              <Text style={[styles.pageNumberText, page === p && styles.activePageText]}>
                {p + 1}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Tombol Next */}
        <TouchableOpacity 
          style={[styles.pageButton, page === totalPages - 1 && styles.disabledButton]}
          disabled={page === totalPages - 1}
          onPress={() => changePage(Math.min(totalPages - 1, page + 1))}
        >
          <Ionicons name="chevron-forward" size={20} color={page === totalPages - 1 ? "#bdc3c7" : "#3498db"} />
        </TouchableOpacity>
      </View>
    );
  };

  const renderEmpty = () => (
    !loading && (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No characters in this tier yet</Text>
      </View>
    )
  );

  return (
    <View style={styles.container}>
      {loading && !refreshing && page === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3498db" />
        </View>
      ) : (
        <FlatList
          data={characters}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={renderHeader}
          ListFooterComponent={renderPagination} // Pagination ditaruh di bawah list
          ListEmptyComponent={renderEmpty}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
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
  header: {
    padding: 30,
    alignItems: 'center',
    marginBottom: 10,
  },
  tierCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  tierLetter: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  tierTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
    textAlign: 'center',
  },
  tierDescription: {
    marginTop: 8,
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  characterCount: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 5,
    fontWeight: 'bold'
  },
  listContent: {
    paddingBottom: 40,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#7f8c8d',
  },

  // --- Pagination Styles  ---
  paginationContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 20, paddingHorizontal: 10 },
  pageScroll: { flexGrow: 0, marginHorizontal: 10 },
  pageButton: { padding: 10, backgroundColor: '#fff', borderRadius: 8, borderWidth: 1, borderColor: '#ecf0f1' },
  disabledButton: { backgroundColor: '#f5f6fa', borderColor: '#f5f6fa' },
  pageNumberButton: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', marginHorizontal: 4, borderRadius: 20, borderWidth: 1, borderColor: '#bdc3c7' },
  activePageButton: { backgroundColor: '#3498db', borderColor: '#3498db' },
  pageNumberText: { color: '#7f8c8d', fontWeight: 'bold' },
  activePageText: { color: '#fff' },
});