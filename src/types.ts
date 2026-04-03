export type JewelryCategory = 
  | 'Earrings'
  | 'Rings'
  | 'Necklaces'
  | 'Bangles'
  | 'Mangalsutras'
  | 'Pendants'
  | 'Bracelets'
  | 'Chains';

export interface JewelryItem {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  prompt: string;
  category: JewelryCategory;
  price: string;
  productUrl: string;
}
