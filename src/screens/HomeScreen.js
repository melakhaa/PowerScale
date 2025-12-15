import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  ActivityIndicator, 
  RefreshControl,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Keyboard
} from 'react-native';
import { api } from '../config/supabase';
import { useTheme } from '../context/ThemeContext';
import CharacterCard from '../components/CharacterCard';
import { Ionicons } from '@expo/vector-icons'; 

const ITEMS_PER_PAGE = 5; 

const HomeScreen = ({ navigation }) => {
  const { theme } = useTheme();
  // --- STATE ---
  const [characters, setCharacters] = useState([]);
  const [inputText, setInputText] = useState(''); 
  const [savedSearch, setSavedSearch] = useState(''); // Menyimpan query terakhir yang sukses
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false); // Loading kecil khusus search
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  // Ref untuk cek apakah ini render pertama kali
  const isFirstRender = useRef(true);

  // --- 1. LIVE SEARCH EFFECT (AUTO SEARCH) ---
  useEffect(() => {
    // Jangan jalankan saat aplikasi baru dibuka (biarkan Initial Load yg handle)
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Set Loading Kecil (Indikator bahwa kita akan mencari)
    setSearchLoading(true);

    // Buat Timer (Delay 800ms)
    const delaySearch = setTimeout(() => {
      handleAutoSearch(inputText);
    }, 800);

    // Bersihkan Timer jika user mengetik lagi sebelum 800ms habis
    return () => clearTimeout(delaySearch);
  }, [inputText]); // Efek ini jalan tiap kali inputText berubah

  // --- 2. INITIAL LOAD ---
  useEffect(() => {
    callApi(0, '');
  }, []);

  // --- API CALLER ---
  const callApi = async (pageNum, searchTerm) => {
    // Loading besar hanya muncul jika ganti halaman atau load awal
    // Kalau search live, kita pakai loading kecil (searchLoading)
    if (pageNum > 0) setLoading(true); 

    const { data, count } = await api.getCharacters(pageNum, ITEMS_PER_PAGE, searchTerm);
    
    if (data) {
      setCharacters(data);
      setTotalCount(count || 0);
    }
    
    setLoading(false);
    setSearchLoading(false); // Matikan loading search
    setRefreshing(false);
  };

  // --- ACTIONS ---

  // Fungsi yang dipanggil otomatis oleh Timer
  const handleAutoSearch = (text) => {
    setPage(0);
    setSavedSearch(text);
    callApi(0, text);
  };

  const changePage = (newPage) => {
    setPage(newPage);
    callApi(newPage, savedSearch);
  };

  // Tombol X (Clear)
  const handleClear = () => {
    setInputText('');
    // State inputText berubah -> mentrigger useEffect -> otomatis search kosong
  };

  const onRefresh = () => {
    setRefreshing(true);
    setPage(0);
    callApi(0, savedSearch); 
  };

  // --- UI ---

  const renderItem = ({ item }) => (
    <CharacterCard
      character={item}
      onPress={() => navigation.navigate('CharacterDetail', { characterId: item.id })}
    />
  );

  const renderPagination = () => {
    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
    if (loading || characters.length === 0 || totalPages <= 1) return null;

    const pages = [...Array(totalPages).keys()];

    return (
      <View style={styles.paginationContainer}>
        <TouchableOpacity 
          style={[styles.pageButton, page === 0 && styles.disabledButton]}
          disabled={page === 0}
          onPress={() => changePage(Math.max(0, page - 1))}
        >
          <Ionicons name="chevron-back" size={20} color={page === 0 ? "#bdc3c7" : "#3498db"} />
        </TouchableOpacity>

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

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* HEADER DI LUAR FLATLIST (Kunci Kestabilan Keyboard) */}
      <View style={[styles.fixedHeader, { backgroundColor: theme.colors.background, borderBottomColor: theme.colors.border }]}>
        <View style={styles.headerTop}>
          <View>
            <Text style={[styles.title, { color: theme.colors.text }]}>Power Scaling</Text>
            <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>Found: {totalCount} Characters</Text>
          </View>
          <TouchableOpacity
            style={[styles.addButton, { backgroundColor: theme.colors.primary }]}
            onPress={() => navigation.navigate('AddEditCharacter', { mode: 'add' })}
          >
            <Text style={styles.addButtonText}>+ Add</Text>
          </TouchableOpacity>
        </View>

        {/* SEARCH BAR */}
        <View style={[styles.searchContainer, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
          <Ionicons name="search" size={20} color={theme.colors.textSecondary} style={styles.searchIcon} />

          <TextInput
            style={[styles.searchInput, { color: theme.colors.text }]}
            placeholder="Type name..."
            placeholderTextColor={theme.colors.textTertiary}
            value={inputText}
            onChangeText={setInputText}
            autoCapitalize="none"
          />
          
          {/* INDIKATOR LOADING / CLEAR */}
          {searchLoading ? (
            <ActivityIndicator size="small" color={theme.colors.primary} />
          ) : inputText.length > 0 ? (
            <TouchableOpacity onPress={handleClear}>
              <Ionicons name="close-circle" size={20} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      {/* LIST DATA */}
      {loading && !refreshing && page === 0 ? (
        <View style={[styles.loadingContainer, { backgroundColor: theme.colors.background }]}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={[styles.loadingText, { color: theme.colors.textSecondary }]}>Loading Data...</Text>
        </View>
      ) : (
        <FlatList
          data={characters}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          ListFooterComponent={renderPagination}
          refreshControl={
            <RefreshControl 
              refreshing={refreshing} 
              onRefresh={onRefresh}
              tintColor={theme.colors.primary}
            />
          }
          contentContainerStyle={styles.listContent}
          keyboardShouldPersistTaps="handled"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f6fa' },
  fixedHeader: {
    backgroundColor: '#f5f6fa',
    padding: 20,
    paddingBottom: 10,
    zIndex: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1'
  },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#2c3e50', marginBottom: 4 },
  subtitle: { fontSize: 16, color: '#7f8c8d' },
  addButton: { backgroundColor: '#3498db', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20 },
  addButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  searchContainer: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff',
    borderRadius: 12, paddingHorizontal: 15, paddingVertical: 10,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05, shadowRadius: 3, elevation: 2,
  },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, fontSize: 16, color: '#2c3e50', height: '100%' },
  listContent: { paddingBottom: 40, paddingTop: 10 },
  paginationContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 20, paddingHorizontal: 10 },
  pageScroll: { flexGrow: 0, marginHorizontal: 10 },
  pageButton: { padding: 10, backgroundColor: '#fff', borderRadius: 8, borderWidth: 1, borderColor: '#ecf0f1' },
  disabledButton: { backgroundColor: '#f5f6fa', borderColor: '#f5f6fa' },
  pageNumberButton: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', marginHorizontal: 4, borderRadius: 20, borderWidth: 1, borderColor: '#bdc3c7' },
  activePageButton: { backgroundColor: '#3498db', borderColor: '#3498db' },
  pageNumberText: { color: '#7f8c8d', fontWeight: 'bold' },
  activePageText: { color: '#fff' },
});

export default HomeScreen;