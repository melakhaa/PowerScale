// src/utils/tierColors.js

export const getTierColor = (tierCode) => {
  if (!tierCode) return '#95a5a6';
  
  const tierStr = tierCode.toString().toUpperCase();
  
  // Tier 0 - Boundless (Black/Dark Purple)
  if (tierStr === 'TIER 0') return '#1a0033';
  
  // Tier 1 - All variations (Magenta/Purple gradient)
  if (tierStr.includes('1-A') || tierStr.includes('1-B') || tierStr.includes('1-C')) {
    return '#9b59b6'; // Purple for all Tier 1
  }
  
  // Tier 2 - All variations (Red)
  if (tierStr.includes('2-A') || tierStr.includes('2-B') || tierStr.includes('2-C')) {
    return '#e74c3c'; // Red for all Tier 2
  }
  
  // Tier 3 - All variations (Orange)
  if (tierStr.includes('3-A') || tierStr.includes('3-B') || tierStr.includes('3-C')) {
    return '#e67e22'; // Orange for all Tier 3
  }
  
  // Tier 4 - All variations (Gold/Yellow)
  if (tierStr.includes('4-A') || tierStr.includes('4-B') || tierStr.includes('4-C')) {
    return '#f39c12'; // Gold for all Tier 4
  }
  
  // Tier 5 - All variations (Yellow/Lime)
  if (tierStr.includes('5-A') || tierStr.includes('5-B') || tierStr.includes('5-C')) {
    return '#f1c40f'; // Yellow for all Tier 5
  }
  
  // Tier 6 - All variations (Green)
  if (tierStr.includes('6-A') || tierStr.includes('6-B') || tierStr.includes('6-C')) {
    return '#2ecc71'; // Green for all Tier 6
  }
  
  // Tier 7 - All variations (Teal)
  if (tierStr.includes('7-A') || tierStr.includes('7-B') || tierStr.includes('7-C')) {
    return '#1abc9c'; // Teal for all Tier 7
  }
  
  // Tier 8 - All variations (Cyan)
  if (tierStr.includes('8-A') || tierStr.includes('8-B') || tierStr.includes('8-C')) {
    return '#3498db'; // Cyan for all Tier 8
  }
  
  // Tier 9 - All variations (Blue)
  if (tierStr.includes('9-A') || tierStr.includes('9-B') || tierStr.includes('9-C')) {
    return '#2980b9'; // Blue for all Tier 9
  }
  
  // Tier 10 - All variations (Indigo)
  if (tierStr.includes('10-A') || tierStr.includes('10-B') || tierStr.includes('10-C')) {
    return '#34495e'; // Indigo for all Tier 10
  }
  
  // Tier 11+ - All variations (Brown/Gray)
  if (tierStr.includes('11-') || tierStr.match(/\d{2,}-/)) {
    return '#7f8c8d'; // Gray for Tier 11+
  }
  
  return '#95a5a6'; // Default gray
};

/**
 * Get tier name/description
 */
export const getTierName = (tierCode) => {
  if (!tierCode) return 'Unknown';
  
  const tierNames = {
    'Tier 0': 'Boundless',
    'High 1-A': 'High Outerverse level',
    '1-A': 'Outerverse level',
    'Low 1-A': 'Low Outerverse level',
    'High 1-B': 'High Hyperverse level',
    '1-B': 'Hyperverse level',
    'Low 1-B': 'Low Hyperverse level',
    'High 1-C': 'High Complex Multiverse level',
    '1-C': 'Complex Multiverse level',
    'Low 1-C': 'Low Complex Multiverse level',
    'High 2-A': 'High Multiverse level+',
    '2-A': 'Multiverse level+',
    '2-B': 'Multiverse level',
    '2-C': 'Low Multiverse level',
    'Low 2-C': 'Universe level+',
    'High 3-A': 'High Universe level',
    '3-A': 'Universe level',
    '3-B': 'Multi-Galaxy level',
    '3-C': 'Galaxy level',
    'High 4-C': 'Large Star level+',
    '4-C': 'Star level',
    'Low 4-C': 'Small Star level',
    'High 5-A': 'Dwarf Star level+',
    '5-A': 'Large Planet level',
    '5-B': 'Planet level',
    'Low 5-B': 'Small Planet level',
    'High 5-C': 'Moon level+',
    '5-C': 'Moon level',
  };
  
  return tierNames[tierCode] || tierCode;
};
