// src/config/supabase.js
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const api = {
  getCharacters: async (page = 0, limit = 10, search = '') => {
    try {
      const from = page * limit;
      const to = from + limit - 1;

      let query = supabase
        .from('characters')
        .select(`
          *,
          tier:tiers(tier_code, tier_name, tier_description, tier_order)
        `, { count: 'exact' }); 

      if (search) {
        query = query.ilike('name', `%${search}%`); 
      }

      // Lanjut urutkan dan pagination
      const { data, count, error } = await query
        .order('tier_code', { ascending: true })
        .range(from, to);
      
      if (error) throw error;
      return { data, count, error: null };
    } catch (error) {
      return { data: null, count: 0, error };
    }
  },

  getCharacterById: async (id) => {
    try {
      const { data, error } = await supabase
        .from('characters')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error in getCharacterById:', error);
      return { data: null, error };
    }
  },

  getTiers: async () => {
    try {
      const { data, error } = await supabase
        .from('tiers')
        .select('*')
        .order('tier_order', { ascending: true });
      
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  getCharactersByTier: async (tierCode, page = 0, limit = 10) => {
    try {
      const from = page * limit;
      const to = from + limit - 1;

      const { data, error, count } = await supabase
        .from('characters')
        .select(`
          *,
          tier:tiers(tier_code, tier_name, tier_description, tier_order)
        `, { count: 'exact' }) 
        .eq('tier_code', tierCode)
        .range(from, to); 
      
      if (error) throw error;
      return { data, count, error: null };
    } catch (error) {
      return { data: null, count: 0, error };
    }
  },

  getTierDetails: async (tierCode) => {
    try {
      const { data, error } = await supabase
        .from('tiers')
        .select('*')
        .eq('tier_code', tierCode)
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('getTierDetails error:', error);
      return { data: null, error };
    }
  },
  
  addCharacter: async (character) => {
    try {
      const { power_level, ...dataToInsert } = character;
      
      const { data, error } = await supabase
        .from('characters')
        .insert([dataToInsert])
        .select();
      
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('addCharacter error:', error);
      return { data: null, error };
    }
  },

  updateCharacter: async (id, character) => {
    try {
      const { power_level, ...dataToUpdate } = character;
      
      const { data, error } = await supabase
        .from('characters')
        .update(dataToUpdate)
        .eq('id', id)
        .select();
      
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('updateCharacter error:', error);
      return { data: null, error };
    }
  },

  deleteCharacter: async (id) => {
    try {
      const { data, error } = await supabase
        .from('characters')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return { data: true, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },
};