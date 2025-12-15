// src/screens/ProfileScreen.js
import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function ProfileScreen() {
  const { theme } = useTheme();
  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.surface, borderBottomColor: theme.colors.border }]}>
        <View style={[styles.logoContainer, { backgroundColor: theme.colors.primary }]}>
          <Image
            source={require('../../assets/WhatsApp Image 2025-09-26 at 22.34.40_cf4c48df.jpg')}
            style={styles.logoImage}
            resizeMode='contain'
          />
        </View>
        <Text style={[styles.appName, { color: theme.colors.text }]}>PowerScale</Text>
        <Text style={[styles.version, { color: theme.colors.textSecondary }]}>Version 1.0.0</Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.surface }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>About App</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
          PowerScale adalah aplikasi untuk membandingkan dan mengklasifikasikan 
          kekuatan karakter-karakter anime menggunakan sistem tier dari VS Battles Wiki. 
          Aplikasi ini membantu fans anime untuk memahami skala kekuatan karakter favorit mereka 
          dengan mudah dan interaktif.
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.surface }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Features</Text>
        <View style={styles.featureItem}>
          <Text style={[styles.featureBullet, { color: theme.colors.primary }]}>•</Text>
          <Text style={[styles.featureText, { color: theme.colors.textSecondary }]}>Browse karakter anime dengan tier system</Text>
        </View>
        <View style={styles.featureItem}>
          <Text style={[styles.featureBullet, { color: theme.colors.primary }]}>•</Text>
          <Text style={[styles.featureText, { color: theme.colors.textSecondary }]}>56+ Tier categories (Tier 0 hingga 11-C)</Text>
        </View>
        <View style={styles.featureItem}>
          <Text style={[styles.featureBullet, { color: theme.colors.primary }]}>•</Text>
          <Text style={[styles.featureText, { color: theme.colors.textSecondary }]}>Statistics detail (AP, Speed, Durability, dll)</Text>
        </View>
        <View style={styles.featureItem}>
          <Text style={[styles.featureBullet, { color: theme.colors.primary }]}>•</Text>
          <Text style={[styles.featureText, { color: theme.colors.textSecondary }]}>Filter karakter berdasarkan tier</Text>
        </View>
        <View style={styles.featureItem}>
          <Text style={[styles.featureBullet, { color: theme.colors.primary }]}>•</Text>
          <Text style={[styles.featureText, { color: theme.colors.textSecondary }]}>CRUD operations untuk manage karakter</Text>
        </View>
        <View style={styles.featureItem}>
          <Text style={[styles.featureBullet, { color: theme.colors.primary }]}>•</Text>
          <Text style={[styles.featureText, { color: theme.colors.textSecondary }]}>Database lengkap dengan Supabase</Text>
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.surface }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Technology Stack</Text>
        <View style={styles.techContainer}>
          <View style={[styles.techBadge, { backgroundColor: theme.colors.primary }]}>
            <Text style={styles.techText}>React Native</Text>
          </View>
          <View style={[styles.techBadge, { backgroundColor: theme.colors.primary }]}>
            <Text style={styles.techText}>Expo</Text>
          </View>
          <View style={[styles.techBadge, { backgroundColor: theme.colors.primary }]}>
            <Text style={styles.techText}>Supabase</Text>
          </View>
          <View style={[styles.techBadge, { backgroundColor: theme.colors.primary }]}>
            <Text style={styles.techText}>JavaScript</Text>
          </View>
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.surface }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Tier System Examples</Text>
        <View style={styles.tierExplanation}>
          <View style={styles.tierRow}>
            <View style={[styles.tierBadge, { backgroundColor: '#ff00ff' }]}>
              <Text style={styles.tierText}>Tier 0</Text>
            </View>
            <Text style={[styles.tierDesc, { color: theme.colors.textSecondary }]}>Boundless</Text>
          </View>
          <View style={styles.tierRow}>
            <View style={[styles.tierBadge, { backgroundColor: '#ff4757' }]}>
              <Text style={styles.tierText}>2-C</Text>
            </View>
            <Text style={[styles.tierDesc, { color: theme.colors.textSecondary }]}>Low Multiverse level</Text>
          </View>
          <View style={styles.tierRow}>
            <View style={[styles.tierBadge, { backgroundColor: '#ffa502' }]}>
              <Text style={styles.tierText}>3-A</Text>
            </View>
            <Text style={[styles.tierDesc, { color: theme.colors.textSecondary }]}>Universe level</Text>
          </View>
          <View style={styles.tierRow}>
            <View style={[styles.tierBadge, { backgroundColor: '#ffd32a' }]}>
              <Text style={styles.tierText}>5-B</Text>
            </View>
            <Text style={[styles.tierDesc, { color: theme.colors.textSecondary }]}>Planet level</Text>
          </View>
          <View style={styles.tierRow}>
            <View style={[styles.tierBadge, { backgroundColor: '#5f27cd' }]}>
              <Text style={styles.tierText}>7-B</Text>
            </View>
            <Text style={[styles.tierDesc, { color: theme.colors.textSecondary }]}>City level</Text>
          </View>
          <View style={styles.tierRow}>
            <View style={[styles.tierBadge, { backgroundColor: '#54a0ff' }]}>
              <Text style={styles.tierText}>9-B</Text>
            </View>
            <Text style={[styles.tierDesc, { color: theme.colors.textSecondary }]}>Wall level</Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: theme.colors.textSecondary }]}>Made with ❤️ for Anime Fans</Text>
        <Text style={[styles.copyright, { color: theme.colors.textTertiary }]}>© 2025 PowerScale/DARRENSIGMA</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoText: {
    fontSize: 48,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  version: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  section: {
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: '#5a6c7d',
    lineHeight: 22,
  },
  featureItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  featureBullet: {
    fontSize: 20,
    color: '#3498db',
    marginRight: 8,
  },
  featureText: {
    fontSize: 14,
    color: '#5a6c7d',
    flex: 1,
    lineHeight: 22,
  },
  techContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  techBadge: {
    backgroundColor: '#3498db',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  techText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  tierExplanation: {
    gap: 12,
  },
  tierRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tierBadge: {
    width: 60,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  tierText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  tierDesc: {
    fontSize: 14,
    color: '#5a6c7d',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  footerText: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 4,
  },
  copyright: {
    fontSize: 12,
    color: '#95a5a6',
  },
});
