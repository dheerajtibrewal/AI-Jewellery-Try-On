import { JewelryItem } from '../types';

const STORE_LOCATOR_URL = 'https://www.indriya.com/jewellery-stores';

export const JEWELRY_COLLECTION: JewelryItem[] = [
  // Necklaces
  {
    id: '1',
    name: 'Oorja Diamond Necklace',
    description: 'A timeless 18k gold chain that adds elegance to any outfit.',
    imageUrl: 'https://s7ap1.scene7.com/is/image/noveljewelsprod/DEARA40-AQNL266%281%29',
    prompt: 'A delicate 18k gold necklace with a central diamond-studded circular pendant and fine gold chain links.',
    category: 'Necklaces',
    price: '₹4,03,912',
    productUrl: STORE_LOCATOR_URL,
  },
  {
    id: '2',
    name: 'Neakita Gold Necklace',
    description: 'Minimalist silver pendant with a modern geometric design.',
    imageUrl: 'https://s7ap1.scene7.com/is/image/noveljewelsprod/JTAYA80-ACNS160%281%29',
    prompt: 'A sophisticated gold necklace featuring a V-shaped pendant with intricate traditional Indian patterns and a heavy gold chain.',
    category: 'Necklaces',
    price: '₹8,07,231',
    productUrl: STORE_LOCATOR_URL,
  },
  {
    id: '3',
    name: 'Kanakavalli Gold Necklace',
    description: 'Classic white freshwater pearls for a sophisticated look.',
    imageUrl: 'https://s7ap1.scene7.com/is/image/noveljewelsprod/ETAYA30-BJNL363%281%29',
    prompt: 'A luxurious gold necklace with a large, ornate floral-inspired pendant and multiple strands of fine gold beads.',
    category: 'Necklaces',
    price: '₹5,73,509',
    productUrl: STORE_LOCATOR_URL,
  },
  
  // Earrings
  {
    id: 'e1',
    name: 'Vedika Gold Drop Earrings',
    description: 'Classic gold hoop earrings.',
    imageUrl: 'https://s7ap1.scene7.com/is/image/noveljewelsprod/JTYYB20-DDEB630%281%29',
    prompt: 'Elegant gold drop earrings with a teardrop shape and intricate filigree work.',
    category: 'Earrings',
    price: '₹1,87,048',
    productUrl: STORE_LOCATOR_URL,
  },
  {
    id: 'e2',
    name: 'Radhika Gold Stud Earrings',
    description: 'Elegant diamond stud earrings.',
    imageUrl: 'https://s7ap1.scene7.com/is/image/noveljewelsprod/JTYYB20-DDEB625%281%29',
    prompt: 'Classic gold stud earrings featuring a central diamond surrounded by a halo of smaller diamonds.',
    category: 'Earrings',
    price: '₹1,33,697',
    productUrl: STORE_LOCATOR_URL,
  },

  // Rings
  {
    id: 'r1',
    name: 'Evania Diamond Ring',
    description: 'Classic solitaire diamond ring.',
    imageUrl: 'https://s7ap1.scene7.com/is/image/noveljewelsprod/DFMRA46-BRFL486%281%29',
    prompt: 'A stunning 18k gold ring with a large central diamond solitaire in a four-prong setting.',
    category: 'Rings',
    price: '₹1,23,414',
    productUrl: STORE_LOCATOR_URL,
  },
  {
    id: 'r2',
    name: 'Aira Diamond Ring',
    description: 'Simple gold wedding band.',
    imageUrl: 'https://s7ap1.scene7.com/is/image/noveljewelsprod/DEMWA50-DDFA353%281%29',
    prompt: 'A sleek gold ring with a modern geometric design and small inset diamonds.',
    category: 'Rings',
    price: '₹48,389',
    productUrl: STORE_LOCATOR_URL,
  },

  // Bangles
  {
    id: 'b1',
    name: 'Virani Gold Bangle',
    description: 'Traditional gold bangles.',
    imageUrl: 'https://s7ap1.scene7.com/is/image/noveljewelsprod/JTLYG20-DDBA297%281%29',
    prompt: 'A thick, ornate gold bangle with traditional Indian carvings and a polished finish.',
    category: 'Bangles',
    price: '₹5,56,940',
    productUrl: STORE_LOCATOR_URL,
  },
  {
    id: 'b2',
    name: 'Priyala Gold Stone Bangles',
    description: 'Modern diamond-studded bangle.',
    imageUrl: 'https://s7ap1.scene7.com/is/image/noveljewelsprod/JTMYA20-DDBR487%281%29',
    prompt: 'A contemporary gold bangle set with a row of brilliant-cut diamonds along the outer edge.',
    category: 'Bangles',
    price: '₹6,83,360',
    productUrl: STORE_LOCATOR_URL,
  },

  // Mangalsutras
  {
    id: 'm1',
    name: 'Nishaani Diamond Mangalsutra',
    description: 'Black bead and gold mangalsutra.',
    imageUrl: 'https://s7ap1.scene7.com/is/image/noveljewelsprod/TEERL50-DDMA042%281%29',
    prompt: 'A traditional mangalsutra with black beads and a central gold pendant featuring a V-shape and a small diamond.',
    category: 'Mangalsutras',
    price: '₹95,656',
    productUrl: STORE_LOCATOR_URL,
  },
  {
    id: 'm2',
    name: 'Aarna Gold Mangalsutra',
    description: 'Contemporary design with diamonds.',
    imageUrl: 'https://s7ap1.scene7.com/is/image/noveljewelsprod/JTHYJ20-ACMT270%281%29',
    prompt: 'A modern gold mangalsutra with a sleek pendant featuring a teardrop diamond and a fine black bead chain.',
    category: 'Mangalsutras',
    price: '₹3,84,874',
    productUrl: STORE_LOCATOR_URL,
  },

  // Pendants
  {
    id: 'p1',
    name: 'Vinayak Gold Pendant',
    description: 'Gold heart pendant.',
    imageUrl: 'https://s7ap1.scene7.com/is/image/noveljewelsprod/JTAYA20-ARPF421%281%29',
    prompt: 'A beautiful gold pendant in the shape of a heart with intricate floral engravings.',
    category: 'Pendants',
    price: '₹47,335',
    productUrl: STORE_LOCATOR_URL,
  },
  {
    id: 'p2',
    name: 'Frosty Mountain Pendant',
    description: 'Intricate floral design with diamonds.',
    imageUrl: 'https://s7ap1.scene7.com/is/image/noveljewelsprod/DEARA40-AAPL634%281%29',
    prompt: 'An elegant gold pendant featuring a cluster of diamonds arranged in a floral pattern.',
    category: 'Pendants',
    price: '₹38,743',
    productUrl: STORE_LOCATOR_URL,
  },

  // Bracelets
  {
    id: 'br1',
    name: 'William Gold Bracelet',
    description: 'Silver charm bracelet.',
    imageUrl: 'https://s7ap1.scene7.com/is/image/noveljewelsprod/GTLYL00-APTG168%281%29',
    prompt: 'A stylish gold bracelet with a series of interlocking links and a secure clasp.',
    category: 'Bracelets',
    price: '₹2,67,830',
    productUrl: STORE_LOCATOR_URL,
  },
  {
    id: 'br2',
    name: 'Adeera Foliage Gold Bracelet',
    description: 'Minimalist gold cuff bracelet.',
    imageUrl: 'https://s7ap1.scene7.com/is/image/noveljewelsprod/GTQYJ00-APTL039%281%29',
    prompt: 'A delicate gold bracelet featuring a leaf-inspired design with small diamonds.',
    category: 'Bracelets',
    price: '₹1,69,436',
    productUrl: STORE_LOCATOR_URL,
  },

  // Chains
  {
    id: 'c1',
    name: 'Trishana Dream Gold Chain',
    description: 'Statement gold chain.',
    imageUrl: 'https://s7ap1.scene7.com/is/image/noveljewelsprod/GTLYL00-APCX564%281%29',
    prompt: 'A classic 22k gold chain with a rope-like texture and a polished finish.',
    category: 'Chains',
    price: '₹4,07,997',
    productUrl: STORE_LOCATOR_URL,
  },
  {
    id: 'c2',
    name: 'Nexus Link Gold Chain',
    description: 'Sleek platinum chain.',
    imageUrl: 'https://s7ap1.scene7.com/is/image/noveljewelsprod/GTKYL00-APCG437%281%29',
    prompt: 'A modern gold chain with flat, rectangular links and a minimalist aesthetic.',
    category: 'Chains',
    price: '₹2,27,211',
    productUrl: STORE_LOCATOR_URL,
  }
];
