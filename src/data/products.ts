export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  images: string[];
  category: string;
  inStock: boolean;
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isFeatured?: boolean;
  tags: string[];
}

export const products: Product[] = [
  {
    id: 'labubu_mystery_box_series_8',
    name: 'Labubu Mystery Box Series 8',
    price: 24.99,
    description: 'Surprise collectible Labubu figure from the latest Series 8 collection. Each mystery box contains one random Labubu character with unique design and accessories.',
    images: [
      '/api/placeholder/400/400',
      '/api/placeholder/400/400',
      '/api/placeholder/400/400'
    ],
    category: 'Collectibles',
    inStock: true,
    rating: 4.8,
    reviewCount: 127,
    isNew: true,
    isFeatured: true,
    tags: ['mystery box', 'collectible', 'labubu', 'series 8']
  },
  {
    id: 'labubu_plush_pink',
    name: 'Pink Labubu Plush Toy',
    price: 18.99,
    originalPrice: 22.99,
    description: 'Adorable pink Labubu plush toy perfect for cuddling. Made with ultra-soft materials and featuring the iconic Labubu design.',
    images: [
      '/api/placeholder/400/400',
      '/api/placeholder/400/400'
    ],
    category: 'Plush',
    inStock: true,
    rating: 4.9,
    reviewCount: 89,
    isFeatured: true,
    tags: ['plush', 'labubu', 'pink', 'soft toy']
  },
  {
    id: 'labubu_keychain_set',
    name: 'Labubu Keychain Collection Set',
    price: 12.99,
    description: 'Set of 3 mini Labubu keychains featuring different expressions and colors. Perfect for decorating bags, keys, or as gifts.',
    images: [
      '/api/placeholder/400/400',
      '/api/placeholder/400/400'
    ],
    category: 'Accessories',
    inStock: true,
    rating: 4.7,
    reviewCount: 203,
    tags: ['keychain', 'labubu', 'set', 'accessories']
  },
  {
    id: 'labubu_figure_limited',
    name: 'Limited Edition Golden Labubu',
    price: 49.99,
    description: 'Rare golden Labubu figure with special metallic finish. Limited production run of only 1000 pieces worldwide.',
    images: [
      '/api/placeholder/400/400',
      '/api/placeholder/400/400',
      '/api/placeholder/400/400'
    ],
    category: 'Collectibles',
    inStock: false,
    rating: 5.0,
    reviewCount: 45,
    isNew: true,
    isFeatured: true,
    tags: ['limited edition', 'golden', 'labubu', 'rare', 'collectible']
  },
  {
    id: 'labubu_sticker_pack',
    name: 'Labubu Sticker Pack',
    price: 8.99,
    description: 'Pack of 20 holographic Labubu stickers featuring various poses and expressions. Perfect for decorating laptops, phones, and notebooks.',
    images: [
      '/api/placeholder/400/400'
    ],
    category: 'Stickers',
    inStock: true,
    rating: 4.6,
    reviewCount: 156,
    tags: ['stickers', 'labubu', 'holographic', 'pack']
  }
];

export const categories = [
  'All',
  'Collectibles',
  'Plush',
  'Accessories',
  'Stickers'
];

export const getFeaturedProducts = () => products.filter(p => p.isFeatured);
export const getNewProducts = () => products.filter(p => p.isNew);
export const getProductsByCategory = (category: string) =>
  category === 'All' ? products : products.filter(p => p.category === category);