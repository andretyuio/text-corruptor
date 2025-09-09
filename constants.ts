import { CorruptionMethod } from './types';

export const ALL_METHODS: CorruptionMethod[] = [
  CorruptionMethod.BLOCK,
  CorruptionMethod.LEET,
  CorruptionMethod.GLITCH,
  CorruptionMethod.SCRAMBLE,
  CorruptionMethod.REVERSE,
  CorruptionMethod.VOWEL_EATER,
  CorruptionMethod.CONSONANT_EATER,
  CorruptionMethod.UNICODE_ABUSE,
  CorruptionMethod.CHARACTER_SWAP,
  CorruptionMethod.EMOJI,
];

export const LEET_MAP: { [key: string]: string } = {
  'a': '4', 'b': '8', 'e': '3', 'f': 'ph', 'g': '6', 'i': '1', 'l': '!',
  'o': '0', 's': '5', 't': '7', 'z': '2', 'A': '4', 'B': '8', 'E': '3',
  'G': '6', 'I': '1', 'L': '!', 'O': '0', 'S': '5', 'T': '7', 'Z': '2'
};

export const UNICODE_MAP: { [key: string]: string } = {
    'a': 'α', 'b': 'ɓ', 'c': 'ͼ', 'd': 'Ꮷ', 'e': 'ϵ', 'f': 'ƒ', 'g': 'ϱ', 'h': 'h', 'i': 'ί',
    'j': 'ϳ', 'k': 'k', 'l': 'l', 'm': 'ʍ', 'n': 'η', 'o': 'σ', 'p': 'ρ', 'q': 'q', 'r': 'г',
    's': 's', 't': 't', 'u': 'μ', 'v': 'ν', 'w': 'w', 'x': 'χ', 'y': 'γ', 'z': 'z',
    'A': 'Δ', 'B': 'Β', 'C': 'Ͻ', 'D': 'D', 'E': 'Σ', 'F': 'F', 'G': 'G', 'H': 'H', 'I': 'Ι',
    'J': 'J', 'K': 'Κ', 'L': 'L', 'M': 'Μ', 'N': 'Ν', 'O': 'Ο', 'P': 'Ρ', 'Q': 'Q', 'R': 'R',
    'S': 'S', 'T': 'Τ', 'U': 'U', 'V': 'V', 'W': 'W', 'X': 'Χ', 'Y': 'Υ', 'Z': 'Ζ'
};

export const EMOJI_MAP: { [key: string]: string } = {
    'dog': '🐶', 'cat': '🐱', 'fox': '🦊', 'sun': '☀️', 'moon': '🌙',
    'love': '❤️', 'heart': '❤️', 'happy': '😊', 'sad': '😢', 'laugh': '😂', 'laughing': '😂',
    'quick': '💨', 'brown': '🟫', 'jumps': '🤸', 'over': '⬆️', 'lazy': '😴',
    'fire': '🔥', 'star': '⭐', 'money': '💰', 'time': '⏰', 'clock': '⏰', 'watch': '⌚',
    'world': '🌍', 'computer': '💻', 'coffee': '☕', 'pizza': '🍕',
    'taco': '🌮', 'rocket': '🚀', 'lion': '🦁', 'tiger': '🐯', 'bear': '🐻',
    'mouse': '🐭', 'hamster': '🐹', 'rabbit': '🐰', 'frog': '🐸', 'koala': '🐨',
    'panda': '🐼', 'apple': '🍎', 'banana': '🍌', 'orange': '🍊',
    'strawberry': '🍓', 'grape': '🍇', 'watermelon': '🍉', 'cake': '🍰',
    'cookie': '🍪', 'tree': '🌳', 'flower': '🌸', 'cloud': '☁️', 'rain': '🌧️',
    'snow': '❄️', 'water': '💧', 'wave': '🌊', 'car': '🚗', 'house': '🏠',
    'book': '📖', 'phone': '📱', 'key': '🔑', 'lock': '🔒', 'light': '💡',
    'bulb': '💡', 'smile': '😄', 'cry': '😭', 'crying': '😭', 'sleep': '😴', 'think': '🤔',
    'win': '🏆', 'fail': '👎', 'run': '🏃', 'running': '🏃', 'walk': '🚶', 'walking': '🚶', 'stop': '🛑',
    'go': '✅', 'music': '🎵', 'video': '📹', 'game': '🎮', 'gift': '🎁',
    'party': '🎉', 'warning': '⚠️', 'bee': '🐝', 'raccoon': '🦝', 'horse': '🐴',
    'biohazard': '☣️', 'ghost': '👻', 'skull': '💀', 'robot': '🤖', 'alien': '👽',
    'angry': '😠', 'monkey': '🐵', 'pig': '🐷', 'cow': '🐮', 'sheep': '🐑', 'chicken': '🐔', 'bird': '🐦', 'penguin': '🐧',
    'fish': '🐟', 'whale': '🐳', 'dolphin': '🐬', 'shark': '🦈', 'octopus': '🐙', 'snail': '🐌', 'butterfly': '🦋',
    'leaf': '🍃', 'cactus': '🌵', 'palm': '🌴', 'mushroom': '🍄', 'lemon': '🍋', 'cherry': '🍒', 'pineapple': '🍍', 'peach': '🍑',
    'bread': '🍞', 'rice': '🍚', 'noodles': '🍜', 'burger': '🍔', 'fries': '🍟', 'hotdog': '🌭', 'burrito': '🌯', 'sandwich': '🥪',
    'egg': '🥚', 'cheese': '🧀', 'milk': '🥛', 'tea': '🍵', 'beer': '🍺', 'wine': '🍷', 'sake': '🍶', 'cocktail': '🍸', 'candy': '🍬',
    'chocolate': '🍫', 'lollipop': '🍭', 'icecream': '🍦', 'donut': '🍩', 'popcorn': '🍿', 'balloon': '🎈', 'kiss': '💋', 'clap': '👏',
    'thumbsup': '👍', 'thumbsdown': '👎', 'ok': '👌', 'pray': '🙏', 'hug': '🤗', 'eyes': '👀', 'nose': '👃', 'mouth': '👄', 'ear': '👂',
    'hand': '✋', 'foot': '🦶', 'leg': '🦵', 'arm': '💪', 'baby': '👶', 'boy': '👦', 'girl': '👧', 'man': '👨', 'woman': '👩', 'family': '👨‍👩‍👧‍👦',
    'couple': '👫', 'friend': '🧑‍🤝‍🧑', 'lightning': '⚡', 'rainbow': '🌈', 'mountain': '⛰️', 'ocean': '🌊', 'bus': '🚌', 'train': '🚆',
    'plane': '✈️', 'boat': '⛵', 'bike': '🚲', 'pencil': '✏️', 'pen': '🖊️', 'paper': '📄', 'scissors': '✂️', 'soccer': '⚽',
    'basketball': '🏀', 'baseball': '⚾', 'tennis': '🎾', 'football': '🏈', 'golf': '⛳', 'dancing': '💃', 'singing': '🎤',
    'guitar': '🎸', 'drum': '🥁', 'violin': '🎻', 'trumpet': '🎺', 'camera': '📷', 'film': '🎬', 'tv': '📺', 'crown': '👑', 'hat': '🎩',
    'shirt': '👕', 'pants': '👖', 'shoe': '👟', 'bag': '👜', 'creditcard': '💳', 'chart': '📊', 'globe': '🌐', 'map': '🗺️',
    'building': '🏢', 'hospital': '🏥', 'school': '🏫', 'church': '⛪', 'anchor': '⚓', 'hammer': '🔨', 'wrench': '🔧', 'tool': '🛠️',
    'battery': '🔋', 'magnet': '🧲', 'dna': '🧬', 'pill': '💊', 'syringe': '💉', 'wheelchair': '♿', 'police': '👮', 'ambulance': '🚑',
    'firetruck': '🚒', 'tractor': '🚜', 'satellite': '🛰️', 'poop': '💩', 'angel': '👼', 'devil': '😈', 'ninja': '🥷', 'pirate': '🏴‍☠️',
    'clown': '🤡', 'princess': '👸', 'prince': '🤴', 'santa': '🎅'
};