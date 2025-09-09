import { CorruptionMethod } from '../types';
import { LEET_MAP, UNICODE_MAP, EMOJI_MAP } from '../constants';

// --- Individual Corruption Functions ---

const applyBlock = (char: string): string => '█';

const applyLeet = (char: string): string => LEET_MAP[char] || char;

export const applyGlitch = (char: string): string => {
  if (char.trim() === '') return char;
  let glitched = char;
  const glitchCount = Math.floor(Math.random() * 4) + 1;
  for (let i = 0; i < glitchCount; i++) {
    const diacriticCode = 0x0300 + Math.floor(Math.random() * 0x6f);
    glitched += String.fromCharCode(diacriticCode);
  }
  return glitched;
};

const applyScramble = (word: string): string => {
  if (word.length < 2) return word;

  const chars = word.split('');
  // For longer words, keep first and last char for some readability
  if (word.length >= 4) {
    const middle = chars.slice(1, -1);
    for (let i = middle.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [middle[i], middle[j]] = [middle[j], middle[i]];
    }
    return chars[0] + middle.join('') + chars[chars.length - 1];
  }
  
  // For short words (2 or 3 chars), scramble the whole thing
  for (let i = chars.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  return chars.join('');
};

const applyReverse = (word: string): string => word.split('').reverse().join('');

const applyVowelEater = (word: string): string => word.replace(/[aeiouAEIOU]/g, '');

const applyConsonantEater = (word: string): string => word.replace(/[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]/g, '');

const applyEmoji = (word: string): string => {
    const cleanWord = word.toLowerCase().replace(/[.,!?;:]/g, '');
    return EMOJI_MAP[cleanWord] || word;
}

const applyUnicodeAbuse = (char: string): string => UNICODE_MAP[char] || char;

const CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const applyCharacterSwap = (char: string): string => {
    if (char.trim() === '') return char;
    return CHARS.charAt(Math.floor(Math.random() * CHARS.length));
};


// --- Word-level vs Character-level methods ---
const WORD_LEVEL_METHODS = new Set([
    CorruptionMethod.SCRAMBLE,
    CorruptionMethod.REVERSE,
    CorruptionMethod.VOWEL_EATER,
    CorruptionMethod.CONSONANT_EATER,
    CorruptionMethod.EMOJI,
]);

// --- Main Corruption Engine ---

export const corruptText = (
  text: string,
  level: number, // Master corruption level (0-100)
  weights: { [key in CorruptionMethod]?: number }
): string => {
  const activeMethods = Object.entries(weights)
    .filter(([, weight]) => weight !== undefined && weight > 0)
    .map(([method, weight]) => ({ method: method as CorruptionMethod, weight: weight! }));

  if (activeMethods.length === 0 || level === 0) {
    return text;
  }

  const totalWeight = activeMethods.reduce((sum, { weight }) => sum + weight, 0);
  if (totalWeight <= 0) {
      return text;
  }

  let cumulative = 0;
  const methodDistribution = activeMethods.map(({ method, weight }) => {
    cumulative += weight;
    return { method, cumulative };
  });

  const pickRandomMethod = (): CorruptionMethod => {
    const random = Math.random() * totalWeight;
    const found = methodDistribution.find(m => random < m.cumulative);
    return found ? found.method : activeMethods[0].method;
  };

  const corruptionChance = level / 100;
  const words = text.split(/(\s+)/);

  const corruptedWords = words.map(word => {
    if (/\s+/.test(word) || word.length === 0) return word;

    // A word will either be corrupted at the word-level OR the character-level, but not both.
    if (Math.random() < corruptionChance) {
        const randomMethod = pickRandomMethod();
        // Handle word-level methods first. If one is chosen, apply it and we're done with this word.
        if (WORD_LEVEL_METHODS.has(randomMethod)) {
            switch (randomMethod) {
                case CorruptionMethod.SCRAMBLE: return applyScramble(word);
                case CorruptionMethod.REVERSE: return applyReverse(word);
                case CorruptionMethod.VOWEL_EATER: return applyVowelEater(word);
                case CorruptionMethod.CONSONANT_EATER: return applyConsonantEater(word);
                case CorruptionMethod.EMOJI: return applyEmoji(word);
            }
        }
    }
    
    // If a word-level corruption didn't happen, the word falls through to character-level processing.
    // Each character has its own chance to be corrupted.
    return word.split('').map(char => {
      if (Math.random() < corruptionChance) {
        const charRandomMethod = pickRandomMethod();
        switch (charRandomMethod) {
          case CorruptionMethod.BLOCK: return applyBlock(char);
          case CorruptionMethod.LEET: return applyLeet(char);
          case CorruptionMethod.GLITCH: return applyGlitch(char);
          case CorruptionMethod.UNICODE_ABUSE: return applyUnicodeAbuse(char);
          case CorruptionMethod.CHARACTER_SWAP: return applyCharacterSwap(char);
          // If a word-level method is picked here by chance, we just return the original character.
          default: return char;
        }
      }
      return char;
    }).join('');
  });

  return corruptedWords.join('');
};